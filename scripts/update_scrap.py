#!/usr/bin/env python3
"""
올메탈(AllMetal) 폐초경/폐팁 시세 자동 수집 및 대시보드 동기화 스크립트
GitHub Actions 및 로컬 환경에서 동작하며, 신규 공지 발견 시:
1) data/scrap_prices.json & data/scrap_data.js 갱신
2) index.html 캐시 버스팅(?v=...) 갱신
3) sw.js PWA 캐시 버전 자동 판올림
"""

import json
import os
import re
import ssl
import urllib.request
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
JSON_PATH = BASE_DIR / "data" / "scrap_prices.json"
JS_PATH = BASE_DIR / "data" / "scrap_data.js"
INDEX_PATH = BASE_DIR / "index.html"
SW_PATH = BASE_DIR / "sw.js"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
}


def fetch_html(url: str) -> str:
    req = urllib.request.Request(url, headers=HEADERS)
    ctx = ssl.create_default_context()
    with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
        return resp.read().decode("utf-8", errors="replace")


def parse_lump(val_str: str) -> int:
    clean = val_str.replace(",", "").strip()
    m = re.search(r"(\d+)~(\d+)", clean)
    if m:
        v1 = float(m.group(1))
        v2 = float(m.group(2))
        if v1 < 1000:
            v1 *= 1000
        if v2 < 1000:
            v2 *= 1000
        lump = int((v1 + v2) / 2)
    else:
        digits = re.sub(r"[^0-9]", "", clean)
        lump = int(digits) if digits else 0
        if 0 < lump < 1000:
            lump *= 1000
    if lump > 200000:
        lump = 57500
    return lump


def bump_sw_cache(sw_path: Path) -> str | None:
    if not sw_path.exists():
        return None
    text = sw_path.read_text(encoding="utf-8")
    m = re.search(r"const\s+CACHE_NAME\s*=\s*'snw-pwa-v(\d+)\.(\d+)'\s*;", text)
    if not m:
        return None
    major, minor = int(m.group(1)), int(m.group(2)) + 1
    if minor >= 10:
        major += 1
        minor = 0
    new_ver = f"snw-pwa-v{major}.{minor}"
    new_text = re.sub(
        r"const\s+CACHE_NAME\s*=\s*'snw-pwa-v\d+\.\d+'\s*;",
        f"const CACHE_NAME = '{new_ver}';",
        text,
        count=1,
    )
    sw_path.write_text(new_text, encoding="utf-8")
    return new_ver


def bump_index_cache(index_path: Path, ver_tag: str) -> bool:
    if not index_path.exists():
        return False
    text = index_path.read_text(encoding="utf-8")
    new_text, count = re.subn(
        r'data/scrap_data\.js(?:\?v=[0-9_]+)?',
        f"data/scrap_data.js?v={ver_tag}",
        text,
    )
    if count > 0 and new_text != text:
        index_path.write_text(new_text, encoding="utf-8")
        return True
    return False


def main() -> int:
    existing_data = []
    max_id = 180
    if JSON_PATH.exists():
        raw = JSON_PATH.read_text(encoding="utf-8-sig")
        existing_data = json.loads(raw)
        if existing_data:
            max_id = max(item["id"] for item in existing_data)

    print(f"현재 저장된 최신 공지 번호(wr_id): {max_id}")

    check_id = max_id + 1
    consecutive_fails = 0
    new_entries = []

    while consecutive_fails < 4 and check_id <= max_id + 40:
        url = f"https://allmetal.co.kr/bbs/board.php?bo_table=price&wr_id={check_id}"
        try:
            html = fetch_html(url)
            date_match = re.search(r"작성일.*?(\d{2}-\d{2}-\d{2})", html, re.S)
            if not date_match:
                consecutive_fails += 1
                check_id += 1
                continue

            date_str = "20" + date_match.group(1)

            title = ""
            title_match = re.search(
                r'<h[12]\s+id="bo_v_title">[\s\S]*?<span\s+class="bo_v_tit">([\s\S]*?)</span>',
                html,
            )
            if title_match:
                title = re.sub(r"<[^>]+>", "", title_match.group(1)).strip()
            else:
                t2 = re.search(r"<title>([^<]+)</title>", html)
                if t2:
                    title = re.sub(r"\s*>\s*오늘의 시세.*$", "", t2.group(1)).strip()

            endmill = 0
            m_endmill = re.search(r"폐초경\(엔드밀\)[\s\S]*?<td[^>]*>\s*([0-9,]+)", html)
            if m_endmill:
                endmill = int(m_endmill.group(1).replace(",", ""))

            tip = 0
            m_tip = re.search(r"폐초경\(팁\)[\s\S]*?<td[^>]*>\s*([0-9,]+)", html)
            if m_tip:
                tip = int(m_tip.group(1).replace(",", ""))

            lump = 0
            m_lump = re.search(r"초경\(덩어리\)[\s\S]*?<td[^>]*>\s*([0-9,~]+)", html)
            if m_lump:
                lump = parse_lump(m_lump.group(1))

            hss = 0
            m_hss = re.search(r"HSS\(하이스\)[\s\S]*?<td[^>]*>\s*([0-9,]+)", html)
            if m_hss:
                hss = int(m_hss.group(1).replace(",", ""))

            if tip > 0 or endmill > 0:
                print(
                    f"[발견] wr_id={check_id} ({date_str}): "
                    f"폐팁 {tip:,}원, 엔드밀 {endmill:,}원, 덩어리 {lump:,}원, 하이스 {hss:,}원"
                )
                new_entries.append(
                    {
                        "id": check_id,
                        "date": date_str,
                        "title": title,
                        "tip": tip,
                        "endmill": endmill,
                        "lump": lump,
                        "hss": hss,
                    }
                )
                consecutive_fails = 0
            else:
                consecutive_fails += 1
        except Exception as e:
            print(f"[탐색 건너뜀] wr_id={check_id}: {e}")
            consecutive_fails += 1

        check_id += 1

    if not new_entries:
        print(f"현재 최신 시세(wr_id={max_id}) 상태입니다. 새로운 공지가 없습니다.")
        return 0

    all_list = existing_data + new_entries
    json_str = json.dumps(all_list, ensure_ascii=False, indent=4)

    JSON_PATH.write_text(json_str, encoding="utf-8")
    JS_PATH.write_text(
        "// Scrap Metal Price History from allmetal.co.kr\n"
        f"window.SCRAP_PRICES_DATA = {json_str};\n",
        encoding="utf-8",
    )

    latest_ver = new_entries[-1]["date"].replace("-", "")
    bump_index_cache(INDEX_PATH, latest_ver)
    new_sw = bump_sw_cache(SW_PATH)

    print(f"총 {len(new_entries)}건 신규 시세 반영 완료! (SW 캐시: {new_sw})")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
