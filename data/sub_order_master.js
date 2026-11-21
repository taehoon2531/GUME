// ========================================================================
// (주)에스앤더블류 부재료 발주서 마스터 데이터 & 전용 작성기 엔진
// (Sub-materials Purchase Order Master & Live Generator Engine)
// ========================================================================

function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
window.escapeHTML = escapeHTML;
window.escapeHtml = window.escapeHtml || escapeHTML;

window.SUB_ORDER_SENDER_DEFAULT = {
  company: "(주)에스앤더블류",
  department: "구매부",
  manager: "김태훈 주임",
  phone: "051-209-2229",
  fax: "051-205-7417",
  mobile: "010-6645-9311",
  email: "thkim@snwglobal.com",
  address: "부산광역시 사하구 다대로 1066번길 17 (다대동)"
};

window.SUB_ORDER_VENDORS = [
  {
    vendor: "갑진와셔",
    category: "와셔 / 체결류",
    contactPerson: "정용길 대표님",
    officePhone: "051-325-4943",
    fax: "051-326-4946",
    mobilePhone: "010-3570-7985",
    email: "kj-washer@hanmail.net",
    address: "부산광역시 사상구 장인로 7-22 (감전동 173-23)",
    defaultRemarks: "용융도금 / 검사성적서 동봉",
    frequentItems: [
      { name: "PLAIN WASHER", material: "F436M", spec: "M42", unit: "EA", remark: "용융도금" },
      { name: "PLAIN WASHER", material: "F436M", spec: "M36", unit: "EA", remark: "용융도금" },
      { name: "PLAIN WASHER", material: "F436M", spec: "M30", unit: "EA", remark: "용융도금" },
      { name: "PLAIN WASHER", material: "F436M", spec: "M24", unit: "EA", remark: "용융도금" },
      { name: "PLAIN WASHER", material: "F436M", spec: "M22", unit: "EA", remark: "용융도금" },
      { name: "PLAIN WASHER", material: "F436M", spec: "M20", unit: "EA", remark: "용융도금" },
      { name: "PLAIN WASHER", material: "F436M", spec: "M16", unit: "EA", remark: "용융도금" },
      { name: "PLAIN WASHER", material: "S32750", spec: "1/2\" (3T * 27 * 14.5)", unit: "EA", remark: "소재사급" },
      { name: "PLAIN WASHER", material: "S32750", spec: "5/8\" (4T * 33 * 18)", unit: "EA", remark: "소재사급" },
      { name: "PLAIN WASHER", material: "S32750", spec: "3/4\" (5T * 38 * 21)", unit: "EA", remark: "소재사급" },
      { name: "PLAIN WASHER", material: "S32750", spec: "7/8\" (6T * 44 * 24)", unit: "EA", remark: "소재사급" },
      { name: "PLAIN WASHER", material: "S32750", spec: "1\" (6T * 50 * 27.5)", unit: "EA", remark: "소재사급" },
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M22", unit: "EA", remark: "흑착색" },
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M20", unit: "EA", remark: "흑착색" },
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M16", unit: "EA", remark: "흑착색" },
      { name: "LOCK PLATE", material: "SS400", spec: "도면참조", unit: "EA", remark: "가공품" },
      { name: "SQUARE WASHER", material: "SS400", spec: "도면참조", unit: "EA", remark: "용융도금" }
    ]
  },
  {
    vendor: "세광화스너",
    category: "볼트 / 너트 / 화스너",
    contactPerson: "이동규 과장님",
    officePhone: "051-322-8201",
    fax: "051-322-8205",
    mobilePhone: "010-2827-0977",
    email: "skf8201@hanmail.net",
    address: "부산광역시 강서구 공항로 811번 나길 60 (대저2동 2091)",
    defaultRemarks: "성적서 및 밀시트 동봉",
    frequentItems: [
      { name: "HY HEX NUT", material: "SUS316", spec: "M16", unit: "EA", remark: "밀시트 첨부" },
      { name: "HY HEX NUT", material: "SUS316", spec: "M20", unit: "EA", remark: "밀시트 첨부" },
      { name: "HY HEX NUT", material: "SUS316", spec: "5/8\"", unit: "EA", remark: "밀시트 첨부" },
      { name: "HY HEX NUT", material: "SUS316", spec: "3/4\"", unit: "EA", remark: "밀시트 첨부" },
      { name: "HEX BOLT", material: "SUS316", spec: "M12*40L", unit: "EA", remark: "밀시트 첨부" },
      { name: "HEX BOLT", material: "SUS316", spec: "M16*50L", unit: "EA", remark: "밀시트 첨부" },
      { name: "HEX BOLT", material: "SUS316", spec: "M20*60L", unit: "EA", remark: "밀시트 첨부" },
      { name: "HEX BOLT", material: "10.9", spec: "M16*70L", unit: "EA", remark: "흑착색" },
      { name: "HEX BOLT", material: "10.9", spec: "M20*80L", unit: "EA", remark: "흑착색" },
      { name: "STUD BOLT", material: "A193-B7", spec: "M24*150L", unit: "EA", remark: "+2 NUT 포함" },
      { name: "SPRING WASHER", material: "SUS316", spec: "M16", unit: "EA", remark: "밀시트 첨부" }
    ]
  },
  {
    vendor: "일진금속",
    category: "스프링와셔 / 체결류",
    contactPerson: "양재석 이사님",
    officePhone: "055-328-6251",
    fax: "055-328-6256",
    mobilePhone: "010-4602-1343",
    email: "",
    address: "경남 김해시 안동 삼안로 9",
    defaultRemarks: "포장 단위 표기 요망",
    frequentItems: [
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M10", unit: "EA", remark: "흑착색" },
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M12", unit: "EA", remark: "흑착색" },
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M16", unit: "EA", remark: "흑착색" },
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M20", unit: "EA", remark: "흑착색" },
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M22", unit: "EA", remark: "흑착색" },
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M22", unit: "EA", remark: "용융도금" },
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M30", unit: "EA", remark: "흑착색" },
      { name: "SPRING WASHER", material: "SUS316L", spec: "M16", unit: "EA", remark: "밀시트 첨부" },
      { name: "SPLIT PIN", material: "SUS304", spec: "Ø4*40L", unit: "EA", remark: "" }
    ]
  },
  {
    vendor: "삼봉철강",
    category: "철강소재 / 환봉 / 절단가공",
    contactPerson: "사무실 담당자님",
    officePhone: "051-313-7807",
    fax: "051-313-7808",
    mobilePhone: "010-7668-2635",
    email: "sambong7807@hanmail.net",
    address: "부산광역시 사상구 강변대로 456번길 33-7 (엄궁동 651-24)",
    defaultRemarks: "치수 공차 준수 / 절단면 면취 요망",
    frequentItems: [
      { name: "PLATE", material: "SS400", spec: "50*280*297", unit: "EA", remark: "톱절단" },
      { name: "PLATE", material: "SS400", spec: "20*320*129", unit: "EA", remark: "톱절단" },
      { name: "PLATE", material: "SS400", spec: "38*140*116", unit: "EA", remark: "톱절단" },
      { name: "PLATE", material: "SS400", spec: "12*101*200", unit: "EA", remark: "톱절단" },
      { name: "ROUND BAR(소모품)", material: "S45C", spec: "Ø80*300L", unit: "EA", remark: "환봉절단" },
      { name: "ROUND BAR(소모품)", material: "SS400", spec: "Ø100*250L", unit: "EA", remark: "환봉절단" },
      { name: "END CHOCK", material: "SS400", spec: "도면참조", unit: "EA", remark: "가공품" }
    ]
  },
  {
    vendor: "신진화스너",
    category: "화스너 / 볼트 / 너트",
    contactPerson: "김용성 대표님",
    officePhone: "051-327-9531",
    fax: "051-327-9534",
    mobilePhone: "010-2738-5138",
    email: "",
    address: "부산광역시 강서구 대저2동 528-8",
    defaultRemarks: "수량 정확 확인 요망",
    frequentItems: [
      { name: "HEX BOLT", material: "SUS316 CL2", spec: "M20*80L", unit: "EA", remark: "밀시트 첨부" },
      { name: "HEX BOLT", material: "SUS316 CL2", spec: "M22*70L", unit: "EA", remark: "밀시트 첨부" },
      { name: "HEX BOLT", material: "SUS316 CL2", spec: "M16*65L", unit: "EA", remark: "밀시트 첨부" },
      { name: "HEX NUT", material: "SUS316", spec: "M20", unit: "EA", remark: "밀시트 첨부" },
      { name: "U-BOLT", material: "SUS304", spec: "50A", unit: "SET", remark: "너트/와셔 포함" }
    ]
  },
  {
    vendor: "화진볼트",
    category: "특수볼트 / 렌치볼트 / 핀",
    contactPerson: "정경목 과장님",
    officePhone: "051-265-0093",
    fax: "051-265-0095",
    mobilePhone: "010-3337-7929",
    email: "",
    address: "부산광역시 사하구 하신중앙로 42",
    defaultRemarks: "본사 출하반 직송",
    frequentItems: [
      { name: "HEX BOLT", material: "10.9", spec: "M10*45L", unit: "EA", remark: "흑착색" },
      { name: "유두렌치볼트", material: "SCM435", spec: "M8*30L", unit: "EA", remark: "흑착색" },
      { name: "무두렌치볼트", material: "SCM435", spec: "M6*15L", unit: "EA", remark: "흑착색" },
      { name: "SPLIT PIN", material: "SUS304", spec: "Ø5*50L", unit: "EA", remark: "" },
      { name: "SPRING WASHER", material: "SWRH62B", spec: "M10", unit: "EA", remark: "흑착색" }
    ]
  },
  {
    vendor: "한국종합상사",
    category: "종합소모공구 / MRO / 현장잡자재",
    contactPerson: "강근수 대표님",
    officePhone: "051-323-6965",
    fax: "051-327-1564",
    mobilePhone: "010-4600-6965",
    email: "",
    address: "부산광역시 사상구 감전동 120-7",
    defaultRemarks: "규격별 포장 라벨 부착",
    frequentItems: [
      { name: "PLAIN WASHER", material: "SS400", spec: "M24", unit: "EA", remark: "표준품" },
      { name: "PLAIN WASHER", material: "SS400", spec: "M36", unit: "EA", remark: "표준품" },
      { name: "현장소모용 테이프", material: "-", spec: "50mm*50M", unit: "ROLL", remark: "출하반용" },
      { name: "안전장갑", material: "-", spec: "코팅(L)", unit: "켤레", remark: "현장소모" },
      { name: "와이어 브러쉬", material: "-", spec: "일자형", unit: "EA", remark: "" }
    ]
  },
  {
    vendor: "중산기업",
    category: "가공품 / 특수너트 / 체결부품",
    contactPerson: "엄종삼 부장님",
    officePhone: "052-254-3290",
    fax: "052-254-3294",
    mobilePhone: "010-3562-2186",
    email: "sales@jungsan.com",
    address: "울산광역시 울주군 삼동면 암리 3길 25",
    defaultRemarks: "도면 공차 엄수 / 검사성적서 동봉",
    frequentItems: [
      { name: "HEX NUT", material: "S45C", spec: "M16X1.5P", unit: "EA", remark: "정밀가공" },
      { name: "HEX NUT", material: "S45C", spec: "M12X1.25P", unit: "EA", remark: "정밀가공" },
      { name: "HEX BOLT", material: "10.9", spec: "M16*80L", unit: "EA", remark: "가공품" },
      { name: "가공 브라켓", material: "SS400", spec: "도면참조", unit: "EA", remark: "도면번호 확인" }
    ]
  },
  {
    vendor: "진양산업",
    category: "와셔가공 / 락와셔 / 단조가공",
    contactPerson: "류순열 이사님",
    officePhone: "051-831-1170",
    fax: "051-831-1174",
    mobilePhone: "010-3887-1156",
    email: "",
    address: "부산광역시 강서구 화전산단5로38번길 12",
    defaultRemarks: "열처리 성적서 및 외경검사표 첨부",
    frequentItems: [
      { name: "PLAIN WASHER", material: "F436", spec: "M16", unit: "EA", remark: "열처리품" },
      { name: "PLAIN WASHER", material: "F436", spec: "M20", unit: "EA", remark: "열처리품" },
      { name: "PLAIN WASHER", material: "SUS316L", spec: "3/4\"", unit: "EA", remark: "밀시트 첨부" },
      { name: "TOOTHED LOCK WASHER", material: "SUS304", spec: "M12", unit: "EA", remark: "내치형" }
    ]
  },
  {
    vendor: "진영공업사",
    category: "외주가공 / CHOCK / 라이너",
    contactPerson: "신해송 대표님",
    officePhone: "051-261-9473",
    fax: "051-261-9475",
    mobilePhone: "010-2860-4723",
    email: "",
    address: "부산광역시 사하구 구평동 435-205",
    defaultRemarks: "구평공장 가공반 입고",
    frequentItems: [
      { name: "SIDE CHOCK LINER", material: "SS400", spec: "116X238", unit: "EA", remark: "도면가공" },
      { name: "LINER FOR SIDE CHOCK", material: "SS400", spec: "125X450", unit: "EA", remark: "도면가공" },
      { name: "END CHOCK", material: "SS400", spec: "260X50X85", unit: "EA", remark: "도면가공" },
      { name: "SIDE STOPPER", material: "SS400", spec: "330X50X100", unit: "EA", remark: "도면가공" }
    ]
  },
  {
    vendor: "하경산업",
    category: "오링(O-RING) / 실링자재",
    contactPerson: "박종애 대표님",
    officePhone: "051-321-0905",
    fax: "051-321-0908",
    mobilePhone: "010-9550-8912",
    email: "",
    address: "부산광역시 사상구 학감대로178번길 79",
    defaultRemarks: "재질 1A / 규격 포장지 기재",
    frequentItems: [
      { name: "ORING", material: "1A", spec: "G165", unit: "EA", remark: "내열/내유" },
      { name: "ORING", material: "1A", spec: "G230", unit: "EA", remark: "내열/내유" },
      { name: "ORING", material: "1A", spec: "G240", unit: "EA", remark: "내열/내유" },
      { name: "ORING", material: "NBR", spec: "P145", unit: "EA", remark: "표준품" }
    ]
  },
  {
    vendor: "윤일스틸",
    category: "배관자재 / 파이프 / 형강",
    contactPerson: "이지수 대리님",
    officePhone: "051-831-0652",
    fax: "051-831-0654",
    mobilePhone: "010-7688-3703",
    email: "",
    address: "부산광역시 강서구 미음산단4로 166 2층",
    defaultRemarks: "직진도 검사 및 밀시트 첨부",
    frequentItems: [
      { name: "PIPE", material: "A106-B", spec: "Ø102X3200", unit: "EA", remark: "무계목강관" },
      { name: "PIPE", material: "A106-B", spec: "Ø89X3200", unit: "EA", remark: "무계목강관" },
      { name: "ROUND BAR(소모품)", material: "S45C", spec: "Ø65*3000L", unit: "본", remark: "흑피" },
      { name: "SLEEVE PIPE", material: "SUS304LTP", spec: "76.3*9.5*6000", unit: "본", remark: "" }
    ]
  },
  {
    vendor: "대길통상",
    category: "고장력볼트 / 체결자재",
    contactPerson: "신진욱 대표님",
    officePhone: "051-314-6628",
    fax: "051-314-6630",
    mobilePhone: "010-9375-6479",
    email: "",
    address: "부산광역시 사상구 낙동대로 891 (감전동 505-6)",
    defaultRemarks: "등급 10.9 마킹 확인",
    frequentItems: [
      { name: "HEX BOLT", material: "10.9", spec: "M16*160L", unit: "EA", remark: "흑착색" },
      { name: "HEX BOLT", material: "10.9", spec: "M16*110L", unit: "EA", remark: "흑착색" },
      { name: "HEX BOLT", material: "10.9", spec: "M16*70L", unit: "EA", remark: "흑착색" },
      { name: "HEX BOLT", material: "10.9", spec: "M20*120L", unit: "EA", remark: "흑착색" },
      { name: "HY HEX NUT", material: "10", spec: "M16", unit: "EA", remark: "흑착색" }
    ]
  },
  {
    vendor: "에스비엔",
    category: "특수합금 너트 / 스터드볼트",
    contactPerson: "영업부 담당자님",
    officePhone: "051-315-0811",
    fax: "051-315-0815",
    mobilePhone: "",
    email: "",
    address: "부산광역시 사상구",
    defaultRemarks: "슈퍼듀플렉스(S32760) 밀시트 필수",
    frequentItems: [
      { name: "HY HEX NUT", material: "A194-8M", spec: "2-1/2\"", unit: "EA", remark: "밀시트 첨부" },
      { name: "HY HEX NUT", material: "S32760", spec: "1-1/8\"", unit: "EA", remark: "밀시트 첨부" },
      { name: "HY HEX NUT", material: "A194-8M", spec: "1-1/2\"", unit: "EA", remark: "밀시트 첨부" },
      { name: "HY HEX NUT", material: "A194-8", spec: "M48", unit: "EA", remark: "밀시트 첨부" },
      { name: "STUD BOLT", material: "A193-B8M", spec: "M36*200L", unit: "EA", remark: "" }
    ]
  },
  {
    vendor: "영신통상",
    category: "고장력 너트 / 나일론너트",
    contactPerson: "영업부 담당자님",
    officePhone: "051-314-5581",
    fax: "051-314-5585",
    mobilePhone: "",
    email: "",
    address: "부산광역시 사상구",
    defaultRemarks: "포장 단위 표기 요망",
    frequentItems: [
      { name: "HY HEX NUT", material: "A194-2H", spec: "M12", unit: "EA", remark: "흑착색" },
      { name: "HY HEX NUT", material: "A194-2H", spec: "M16", unit: "EA", remark: "흑착색" },
      { name: "HY HEX NUT", material: "A194-2H", spec: "3/8\"", unit: "EA", remark: "흑착색" },
      { name: "HY HEX NUT", material: "A194-2H", spec: "3/4\"", unit: "EA", remark: "흑착색" },
      { name: "NYLON NUT", material: "SUS304", spec: "M16", unit: "EA", remark: "" }
    ]
  }
];

// ==========================================
// Sub Order Generator Interactive Logic
// ==========================================
// ==========================================
// Korean Chosung & Vendor Search Helper
// ==========================================
const KOREAN_CHOSUNG = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
function getKoreanChosung(str) {
  if (!str) return '';
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i) - 44032;
    if (code >= 0 && code <= 11171) {
      result += KOREAN_CHOSUNG[Math.floor(code / 588)];
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}

function matchSubOrderVendor(v, query) {
  if (!query || !query.trim()) return true;
  const q = query.trim().toLowerCase();
  const vName = (v.vendor || '').toLowerCase();
  const vCat = (v.category || '').toLowerCase();
  if (vName.includes(q) || vCat.includes(q)) return true;
  const chosung = getKoreanChosung(vName);
  if (chosung.includes(q)) return true;
  return false;
}

window.renderSubOrderVendorPills = function(filteredList) {
  const container = document.getElementById('subOrderVendorPillsContainer');
  if (!container) return;
  container.innerHTML = '';

  const list = filteredList || window.SUB_ORDER_VENDORS || [];
  if (list.length === 0) {
    container.innerHTML = '<span style="font-size: 0.74rem; color: #94a3b8; padding: 3px 6px;">일치하는 거래처가 없습니다.</span>';
    return;
  }

  list.forEach(v => {
    const isActive = (v.vendor === window.currentSubOrderVendor);
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = 'btn btn-sm';
    pill.style.cssText = `font-size: 0.74rem; padding: 3px 8px; border-radius: 4px; font-weight: ${isActive ? '800' : '600'}; cursor: pointer; white-space: nowrap; transition: all 0.15s; ${
      isActive
        ? 'background: #2563eb; color: #ffffff; border: 1.5px solid #1d4ed8; box-shadow: 0 1px 3px rgba(37,99,235,0.3);'
        : 'background: var(--input-bg, #ffffff); color: #334155; border: 1px solid var(--input-border, #cbd5e1);'
    }`;
    pill.innerHTML = `${isActive ? '✓ ' : ''}${v.vendor}`;
    pill.title = `${v.vendor} (${v.category || ''})`;
    pill.onclick = () => {
      const select = document.getElementById('subOrderVendorSelect');
      if (select) select.value = v.vendor;
      window.onSubOrderVendorChange(v.vendor);
    };
    container.appendChild(pill);
  });
};

// Render Vendor Search Results Dropdown
window.renderVendorSearchResultsDropdown = function(filteredList, query) {
  const container = document.getElementById('subOrderVendorSearchResults');
  if (!container) return;
  const q = (query || '').trim();
  if (!q) {
    container.style.display = 'none';
    container.innerHTML = '';
    return;
  }

  const list = filteredList || [];
  if (list.length === 0) {
    container.innerHTML = `
      <div style="padding: 12px; text-align: center; color: var(--text-secondary, #94a3b8); font-size: 0.82rem;">
        🔍 <strong>'${escapeHTML(q)}'</strong> 일치하는 부재료 거래처가 없습니다.
      </div>
    `;
    container.style.display = 'block';
    return;
  }

  const isShowAll = (q === '전체' || q === '*');
  let html = `
    <div style="padding: 6px 10px; font-size: 0.74rem; color: #2563eb; font-weight: 700; border-bottom: 1px solid var(--card-border, #cbd5e1); display: flex; justify-content: space-between; align-items: center; background: rgba(59, 130, 246, 0.05); border-radius: 6px 6px 0 0;">
      <span>🏢 ${isShowAll ? '사내 등록 부재료 거래처 전체 (15개)' : `검색 결과 (${list.length}개 업체)`}</span>
      <span style="color: var(--text-secondary, #64748b); font-size: 0.7rem; font-weight: 500;">클릭 또는 Enter 시 즉시 발주서 전환</span>
    </div>
    <div style="display: flex; flex-direction: column; gap: 2px; padding: 4px 2px;">
  `;

  list.forEach(v => {
    const isCurrent = (v.vendor === window.currentSubOrderVendor);
    html += `
      <div class="suborder-search-item" onclick="onSubOrderSelectFromDropdown('${escapeHTML(v.vendor)}')" style="padding: 7px 10px; border-radius: 6px; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 0.15s; ${
        isCurrent
          ? 'background: rgba(37, 99, 235, 0.12); border: 1.5px solid #2563eb;'
          : 'background: var(--input-bg, #ffffff); border: 1px solid transparent;'
      }">
        <div style="display: flex; flex-direction: column; gap: 2px;">
          <div style="display: flex; align-items: center; gap: 6px;">
            <span style="font-weight: 800; font-size: 0.88rem; color: ${isCurrent ? '#2563eb' : 'var(--text-primary, #0f172a)'};">${isCurrent ? '✓ ' : ''}${escapeHTML(v.vendor)}</span>
            <span style="font-size: 0.72rem; padding: 1px 6px; border-radius: 4px; background: rgba(59, 130, 246, 0.12); color: #2563eb; font-weight: 700;">${escapeHTML(v.category || '부재료')}</span>
          </div>
          <div style="font-size: 0.74rem; color: var(--text-secondary, #64748b);">
            <span>담당: ${escapeHTML(v.contactPerson || '-')}</span>
            ${v.officePhone ? `<span style="margin-left: 8px;">☎ ${escapeHTML(v.officePhone)}</span>` : ''}
          </div>
        </div>
        <div>
          ${isCurrent
            ? '<span style="font-size: 0.72rem; font-weight: 700; background: #2563eb; color: #ffffff; padding: 3px 8px; border-radius: 4px; box-shadow: 0 1px 2px rgba(37,99,235,0.3);">현재 발주서</span>'
            : '<span style="font-size: 0.75rem; font-weight: 700; color: #2563eb; padding: 3px 8px; border-radius: 4px; background: rgba(59, 130, 246, 0.08);">선택 →</span>'}
        </div>
      </div>
    `;
  });

  html += `</div>`;
  container.innerHTML = html;
  container.style.display = 'block';

  const items = container.querySelectorAll('.suborder-search-item');
  items.forEach(el => {
    el.addEventListener('mouseenter', () => {
      if (!el.style.borderColor.includes('rgb(37, 99, 235)')) {
        el.style.background = 'rgba(59, 130, 246, 0.08)';
      }
    });
    el.addEventListener('mouseleave', () => {
      if (!el.style.borderColor.includes('rgb(37, 99, 235)')) {
        el.style.background = 'var(--input-bg, #ffffff)';
      }
    });
  });
};

window.onSubOrderSelectFromDropdown = function(vendorName) {
  const input = document.getElementById('subOrderVendorSearchInput');
  if (input) input.value = vendorName;
  const clearBtn = document.getElementById('btnClearVendorSearch');
  if (clearBtn) clearBtn.style.display = 'block';

  const container = document.getElementById('subOrderVendorSearchResults');
  if (container) container.style.display = 'none';

  window.onSubOrderVendorChange(vendorName);
  if (typeof showToast === 'function') showToast(`[${vendorName}] 부재료 발주서로 전환되었습니다.`, 'success');
};

window.onSubOrderVendorSearchFocus = function() {
  const input = document.getElementById('subOrderVendorSearchInput');
  const query = (input ? input.value : '').trim();
  const filtered = (window.SUB_ORDER_VENDORS || []).filter(v => matchSubOrderVendor(v, query));
  renderVendorSearchResultsDropdown(filtered.length > 0 ? filtered : window.SUB_ORDER_VENDORS, query || '전체');
};

window.onSubOrderVendorSearchInput = function(query) {
  const clearBtn = document.getElementById('btnClearVendorSearch');
  if (clearBtn) clearBtn.style.display = query ? 'block' : 'none';

  const trimmed = (query || '').trim();
  const filtered = (window.SUB_ORDER_VENDORS || []).filter(v => matchSubOrderVendor(v, trimmed));
  
  // 1. Render dropdown & pills
  renderVendorSearchResultsDropdown(filtered, trimmed);
  renderSubOrderVendorPills(filtered);

  // 2. Filter select box options
  const select = document.getElementById('subOrderVendorSelect');
  if (select) {
    select.innerHTML = '<option value="">-- 부재료 발주 거래처 선택 --</option>';
    filtered.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.vendor;
      opt.textContent = `${v.vendor} (${v.category})`;
      if (v.vendor === window.currentSubOrderVendor) opt.selected = true;
      select.appendChild(opt);
    });
  }

  // 3. AUTO-SWITCH TO VENDOR:
  // If exact match found:
  const exactMatch = filtered.find(v => v.vendor.toLowerCase() === trimmed.toLowerCase());
  if (exactMatch) {
    if (window.currentSubOrderVendor !== exactMatch.vendor) {
      window.onSubOrderVendorChange(exactMatch.vendor);
    }
    return;
  }

  // If only 1 vendor matches and user typed something:
  if (filtered.length === 1 && trimmed.length >= 1) {
    if (window.currentSubOrderVendor !== filtered[0].vendor) {
      window.onSubOrderVendorChange(filtered[0].vendor);
    }
  }
};

window.onSubOrderVendorSearchKeyDown = function(event) {
  const container = document.getElementById('subOrderVendorSearchResults');
  const input = document.getElementById('subOrderVendorSearchInput');
  const query = (input ? input.value : '').trim();
  const filtered = (window.SUB_ORDER_VENDORS || []).filter(v => matchSubOrderVendor(v, query));

  if (event.key === 'Enter') {
    event.preventDefault();
    if (filtered.length > 0) {
      const topMatch = filtered[0];
      if (input) input.value = topMatch.vendor;
      if (container) container.style.display = 'none';
      window.onSubOrderVendorChange(topMatch.vendor);
      if (input) input.blur();
      if (typeof showToast === 'function') showToast(`[${topMatch.vendor}] 부재료 발주서가 선택되었습니다.`, 'success');
    }
  } else if (event.key === 'Escape') {
    if (container) container.style.display = 'none';
    window.clearSubOrderVendorSearch();
  }
};

window.clearSubOrderVendorSearch = function() {
  const input = document.getElementById('subOrderVendorSearchInput');
  if (input) input.value = '';
  const clearBtn = document.getElementById('btnClearVendorSearch');
  if (clearBtn) clearBtn.style.display = 'none';
  const container = document.getElementById('subOrderVendorSearchResults');
  if (container) container.style.display = 'none';

  renderSubOrderVendorPills(window.SUB_ORDER_VENDORS);

  // Restore select box options
  const select = document.getElementById('subOrderVendorSelect');
  if (select) {
    select.innerHTML = '<option value="">-- 부재료 발주 거래처 선택 --</option>';
    window.SUB_ORDER_VENDORS.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.vendor;
      opt.textContent = `${v.vendor} (${v.category})`;
      if (v.vendor === window.currentSubOrderVendor) opt.selected = true;
      select.appendChild(opt);
    });
    select.value = window.currentSubOrderVendor;
  }
  if (input) input.focus();
};

window.subOrderItems = [];
window.subOrderCurrentVendor = null;
window.subOrderInitialized = false;

window.initSubOrderView = function(force) {
  const select = document.getElementById('subOrderVendorSelect');
  if (!select) return;

  if (window.subOrderInitialized && !force) {
    if (typeof updateSubOrderPreview === 'function') updateSubOrderPreview();
    return;
  }
  window.subOrderInitialized = true;

  // 1. Populate vendor dropdown (사내 부재료 발주서 등록 15개 업체 전용)
  if (select) {
    select.innerHTML = '<option value="">-- 부재료 발주 거래처 선택 --</option>';
    window.SUB_ORDER_VENDORS.forEach((v, idx) => {
      const opt = document.createElement('option');
      opt.value = v.vendor;
      opt.textContent = `${v.vendor} (${v.category})`;
      if (idx === 0) opt.selected = true;
      select.appendChild(opt);
    });
  }

  // 1-1. Render 1-click quick vendor pills
  renderSubOrderVendorPills(window.SUB_ORDER_VENDORS);

  // 2. Set default date and auto PO number
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const dateStr = `${yyyy}-${mm}-${dd}`;

  const dateInput = document.getElementById('subOrderDate');
  if (dateInput && !dateInput.value) dateInput.value = dateStr;

  const dueInput = document.getElementById('subOrderDueDate');
  if (dueInput && !dueInput.value) {
    const dueDate = new Date(today);
    dueDate.setDate(dueDate.getDate() + 7);
    const dY = dueDate.getFullYear();
    const dM = String(dueDate.getMonth() + 1).padStart(2, '0');
    const dD = String(dueDate.getDate()).padStart(2, '0');
    dueInput.value = `${dY}-${dM}-${dD}`;
  }

  const poInput = document.getElementById('subOrderPoNo');
  if (poInput && !poInput.value) {
    const yy = String(yyyy).substring(2);
    poInput.value = `PC${yy}${mm}-${dd}01`;
  }

  // 3. Set sender defaults
  const s = window.SUB_ORDER_SENDER_DEFAULT;
  const sCompany = document.getElementById('subOrderSenderCompany');
  if (sCompany) sCompany.value = s.company;
  const sMgr = document.getElementById('subOrderSenderManager');
  if (sMgr) sMgr.value = s.manager;
  const sPhone = document.getElementById('subOrderSenderPhone');
  if (sPhone) sPhone.value = s.phone;
  const sFax = document.getElementById('subOrderSenderFax');
  if (sFax) sFax.value = s.fax;
  const sMobile = document.getElementById('subOrderSenderMobile');
  if (sMobile) sMobile.value = s.mobile;

  // 4. Select first vendor
  if (window.SUB_ORDER_VENDORS.length > 0) {
    onSubOrderVendorChange(window.SUB_ORDER_VENDORS[0].vendor);
  }
};

// ========================================================================
// (주)에스앤더블류 부재료 발주서 대시보드 직접 작성/편집 & 실시간 자동 저장 엔진
// (Interactive PO Spreadsheet & Real-Time Auto-Save Engine)
// ========================================================================

window.vendorSheetsMap = {};
window.currentSubOrderVendor = "갑진와셔";
window.currentActiveSheetIdx = 0;
window.isSubOrderLayoutExpanded = false;
let subOrderAutoSaveTimer = null;

// Layout Expand / Split Mode Toggle
window.toggleSubOrderLayoutExpand = function() {
  const layout = document.querySelector('.suborder-layout');
  const btn = document.getElementById('btnExpandSubOrderLayout');
  const text = document.getElementById('textExpandSubOrderLayout');
  if (!layout) return;

  window.isSubOrderLayoutExpanded = !window.isSubOrderLayoutExpanded;
  if (window.isSubOrderLayoutExpanded) {
    layout.classList.add('expanded');
    if (text) text.textContent = '분할 보기';
    if (btn) btn.title = '좌측 정보 패널과 분할하여 보기';
  } else {
    layout.classList.remove('expanded');
    if (text) text.textContent = '전면 확대';
    if (btn) btn.title = '발주서 전면 확대하여 넓게 작성';
  }
};

// Trigger Debounced Auto-Save
window.triggerSubOrderAutoSave = function() {
  const badgeDot = document.getElementById('subOrderAutoSaveDot');
  const badgeText = document.getElementById('subOrderAutoSaveText');
  if (badgeDot) badgeDot.textContent = '💾';
  if (badgeText) badgeText.textContent = '저장 중...';

  clearTimeout(subOrderAutoSaveTimer);
  subOrderAutoSaveTimer = setTimeout(() => {
    try {
      const v = window.currentSubOrderVendor;
      const sheets = window.vendorSheetsMap[v] || [];
      localStorage.setItem('SNW_SUBORDER_SHEETS_' + v, JSON.stringify(sheets));
      localStorage.setItem('SNW_SUBORDER_ACTIVE_IDX_' + v, String(window.currentActiveSheetIdx));
      localStorage.setItem('SNW_SUBORDER_LAST_VENDOR', v);

      const now = new Date();
      const timeStr = String(now.getHours()).padStart(2, '0') + ':' +
                      String(now.getMinutes()).padStart(2, '0') + ':' +
                      String(now.getSeconds()).padStart(2, '0');
      if (badgeDot) badgeDot.textContent = '🟢';
      if (badgeText) badgeText.textContent = `자동 저장됨 (${timeStr})`;
    } catch (e) {
      console.warn('Auto-save error:', e);
      if (badgeDot) badgeDot.textContent = '⚠️';
      if (badgeText) badgeText.textContent = '저장 오류';
    }
  }, 250);
};

// Load Sheets for a Vendor (from LocalStorage or Real 2026 Files)
window.loadVendorSheets = function(vendorName) {
  if (window.vendorSheetsMap[vendorName] && window.vendorSheetsMap[vendorName].length > 0) {
    if (window.currentActiveSheetIdx >= window.vendorSheetsMap[vendorName].length) {
      window.currentActiveSheetIdx = 0;
    }
    return window.vendorSheetsMap[vendorName];
  }

  // 1. Check LocalStorage
  try {
    const saved = localStorage.getItem('SNW_SUBORDER_SHEETS_' + vendorName);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        window.vendorSheetsMap[vendorName] = parsed;
        const savedIdx = parseInt(localStorage.getItem('SNW_SUBORDER_ACTIVE_IDX_' + vendorName) || '0', 10);
        window.currentActiveSheetIdx = Math.max(0, Math.min(savedIdx, parsed.length - 1));
        return parsed;
      }
    }
  } catch (e) {}

  // 2. Prepare default today sheet + authentic 2026 sheets from files
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayDateStr = `${yyyy}-${mm}-${dd}`;
  const shortSheetName = `${String(yyyy).substring(2)}.${mm}.${dd}`;

  // Get vendor contact info (사내 부재료 발주서 15개 업체 전용)
  let vMeta = (window.SUB_ORDER_VENDORS || []).find(v => v.vendor === vendorName);
  if (!vMeta) {
    vMeta = {
      vendor: vendorName,
      contactPerson: '대표/담당자님',
      officePhone: '',
      fax: '',
      mobilePhone: '',
      frequentItems: []
    };
  }

  const defaultSender = window.SUB_ORDER_SENDER_DEFAULT || {
    company: "(주)에스앤더블류",
    manager: "김태훈 주임",
    phone: "051-209-2229",
    fax: "051-205-7417",
    mobile: "010-6645-9311"
  };

  // Build Today's active sheet
  const initialItems = [];
  if (vMeta.frequentItems && vMeta.frequentItems.length > 0) {
    vMeta.frequentItems.slice(0, 2).forEach((fi, idx) => {
      initialItems.push({
        no: idx + 1,
        name: fi.name,
        material: fi.material,
        spec: fi.spec,
        unit: fi.unit || 'EA',
        qty: 100,
        remark: fi.remark || ''
      });
    });
  }

  const todaySheet = {
    id: 'sheet_' + Date.now(),
    sheetName: shortSheetName + ' (작성중)',
    poNo: `PC${String(yyyy).substring(2)}${mm}-${dd}01`,
    poDate: todayDateStr,
    recvCompany: vMeta.vendor,
    recvPhone: vMeta.officePhone,
    recvFax: vMeta.fax || '',
    recvPerson: vMeta.contactPerson,
    recvMobile: vMeta.mobilePhone || '',
    senderCompany: defaultSender.company,
    senderPhone: defaultSender.phone,
    senderFax: defaultSender.fax,
    senderManager: defaultSender.manager,
    senderMobile: defaultSender.mobile,
    note: `입고요청일 : ${mm}/${dd}까지 입고요청합니다.`,
    items: initialItems
  };

  // Add historical real sheets from user's 2026 Excel files
  const sheets = [todaySheet];
  if (window.SUB_ORDER_ORIGINAL_SHEETS && window.SUB_ORDER_ORIGINAL_SHEETS[vendorName]) {
    const origSheets = window.SUB_ORDER_ORIGINAL_SHEETS[vendorName];
    origSheets.forEach((os, idx) => {
      sheets.push({
        id: 'orig_' + idx + '_' + (os.sheetName || 'hist'),
        sheetName: os.sheetName || `과거발주${idx + 1}`,
        poNo: os.poNo || `PC2611-${dd}0${idx + 2}`,
        poDate: os.poDate || todayDateStr,
        recvCompany: os.recvCompany || vMeta.vendor,
        recvPhone: os.recvPhone || vMeta.officePhone,
        recvFax: os.recvFax || vMeta.fax,
        recvPerson: os.recvPerson || vMeta.contactPerson,
        recvMobile: os.recvMobile || vMeta.mobilePhone,
        senderCompany: defaultSender.company,
        senderPhone: defaultSender.phone,
        senderFax: defaultSender.fax,
        senderManager: defaultSender.manager,
        senderMobile: defaultSender.mobile,
        note: os.note || `입고요청일: 협의 후 납품`,
        items: (os.items || []).map((it, i) => ({
          no: i + 1,
          name: it.name || '',
          material: it.material || '',
          spec: it.spec || '',
          unit: it.unit || 'EA',
          qty: it.qty || '',
          remark: it.remark || ''
        }))
      });
    });
  }

  window.vendorSheetsMap[vendorName] = sheets;
  window.currentActiveSheetIdx = 0;
  return sheets;
};

// Render Sheet Tab Bar
window.renderSubOrderSheetTabs = function() {
  const container = document.getElementById('subOrderSheetTabBar');
  if (!container) return;
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];

  container.innerHTML = '';
  sheets.forEach((s, idx) => {
    const isActive = (idx === window.currentActiveSheetIdx);
    const tab = document.createElement('div');
    tab.className = `suborder-sheet-tab ${isActive ? 'active' : ''}`;
    tab.title = `시트: ${s.sheetName} (발주번호: ${s.poNo || '미정'})`;
    
    tab.innerHTML = `
      <span>📄</span>
      <span style="max-width: 130px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHTML(s.sheetName)}</span>
      ${sheets.length > 1 && idx > 0 ? `<span class="tab-del-btn" style="margin-left: 4px; font-size: 0.72rem; color: #94a3b8; padding: 0 2px; border-radius: 2px;" title="이 시트 삭제">✕</span>` : ''}
    `;

    tab.onclick = () => window.switchSubOrderSheet(idx);

    const delBtn = tab.querySelector('.tab-del-btn');
    if (delBtn) {
      delBtn.onclick = (e) => {
        e.stopPropagation();
        window.deleteSubOrderSheet(idx);
      };
    }

    container.appendChild(tab);
  });
};

// Switch Active Sheet
window.switchSubOrderSheet = function(idx) {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  if (!sheets[idx]) return;

  window.currentActiveSheetIdx = idx;
  renderSubOrderSheetTabs();
  renderSubOrderPaper();

  // Sync left-hand form inputs
  const s = sheets[idx];
  if (document.getElementById('subOrderPoNo')) document.getElementById('subOrderPoNo').value = s.poNo || '';
  if (document.getElementById('subOrderDate')) document.getElementById('subOrderDate').value = s.poDate || '';
  if (document.getElementById('subOrderRecvCompany')) document.getElementById('subOrderRecvCompany').value = s.recvCompany || '';
  if (document.getElementById('subOrderRecvPerson')) document.getElementById('subOrderRecvPerson').value = s.recvPerson || '';
  if (document.getElementById('subOrderRecvPhone')) document.getElementById('subOrderRecvPhone').value = s.recvPhone || '';
  if (document.getElementById('subOrderRecvFax')) document.getElementById('subOrderRecvFax').value = s.recvFax || '';
  if (document.getElementById('subOrderRecvMobile')) document.getElementById('subOrderRecvMobile').value = s.recvMobile || '';
  if (document.getElementById('subOrderTermsNotes')) document.getElementById('subOrderTermsNotes').value = s.note || '';

  window.subOrderItems = s.items || [];
  renderSubOrderFormTable();
  triggerSubOrderAutoSave();
};

// Add New Sheet
window.addNewSubOrderSheet = function() {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const todayDateStr = `${yyyy}-${mm}-${dd}`;
  const count = sheets.length + 1;
  const sheetName = `${String(yyyy).substring(2)}.${mm}.${dd}(${count})`;

  const prev = sheets[0] || {};
  const newSheet = {
    id: 'sheet_' + Date.now(),
    sheetName: sheetName,
    poNo: `PC${String(yyyy).substring(2)}${mm}-${dd}0${count}`,
    poDate: todayDateStr,
    recvCompany: prev.recvCompany || v,
    recvPhone: prev.recvPhone || '',
    recvFax: prev.recvFax || '',
    recvPerson: prev.recvPerson || '',
    recvMobile: prev.recvMobile || '',
    senderCompany: prev.senderCompany || "(주)에스앤더블류",
    senderPhone: prev.senderPhone || "051-209-2229",
    senderFax: prev.senderFax || "051-205-7417",
    senderManager: prev.senderManager || "김태훈 주임",
    senderMobile: prev.senderMobile || "010-6645-9311",
    note: `입고요청일 : ${mm}/${dd}까지 입고요청합니다.`,
    items: []
  };

  sheets.unshift(newSheet);
  window.currentActiveSheetIdx = 0;
  renderSubOrderSheetTabs();
  renderSubOrderPaper();
  triggerSubOrderAutoSave();
  if (typeof showToast === 'function') showToast(`새 발주서 시트 [${sheetName}]가 추가되었습니다.`, 'success');
};

// Delete Sheet
window.deleteSubOrderSheet = function(idx) {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  if (sheets.length <= 1) {
    alert('최소 1개의 발주서 시트는 유지되어야 합니다.');
    return;
  }
  const sName = sheets[idx].sheetName;
  if (!confirm(`'${sName}' 발주서 시트를 삭제하시겠습니까?`)) return;

  sheets.splice(idx, 1);
  if (window.currentActiveSheetIdx >= sheets.length) {
    window.currentActiveSheetIdx = sheets.length - 1;
  }
  renderSubOrderSheetTabs();
  renderSubOrderPaper();
  triggerSubOrderAutoSave();
};

// Add Blank Row
window.addBlankRowToPaper = function() {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s) return;
  s.items = s.items || [];
  s.items.push({
    no: s.items.length + 1,
    name: '',
    material: '',
    spec: '',
    unit: 'EA',
    qty: '',
    remark: ''
  });
  window.subOrderItems = s.items;
  renderSubOrderPaper();
  renderSubOrderFormTable();
  triggerSubOrderAutoSave();

  // Focus new row's name cell
  setTimeout(() => {
    const newIdx = s.items.length - 1;
    const input = document.querySelector(`input[data-row="${newIdx}"][data-col="0"]`);
    if (input) input.focus();
  }, 50);
};

// Clear Empty Rows
window.clearEmptyPaperRows = function() {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s) return;
  s.items = (s.items || []).filter(it => it.name && it.name.trim() !== '');
  s.items.forEach((it, idx) => { it.no = idx + 1; });
  window.subOrderItems = s.items;
  renderSubOrderPaper();
  renderSubOrderFormTable();
  triggerSubOrderAutoSave();
  if (typeof showToast === 'function') showToast('내용이 없는 빈 행이 정리되었습니다.', 'info');
};

// Render Sub Order Paper (100% Authentic Excel Format with Interactive Cells)
window.renderSubOrderPaper = function() {
  const paper = document.getElementById('subOrderPaperPreview');
  if (!paper) return;

  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx] || {};

  const poNo = s.poNo || 'PC2611-0001';
  const poDate = s.poDate || '';
  const note = s.note || '입고요청일 : 협의 후 납품';

  const rComp = s.recvCompany || v;
  const rPerson = s.recvPerson || '대표/담당자님';
  const rPhone = s.recvPhone || '';
  const rFax = s.recvFax || '';
  const rMobile = s.recvMobile || '';

  const sComp = s.senderCompany || '(주)에스앤더블류';
  const sMgr = s.senderManager || '김태훈 주임';
  const sPhone = s.senderPhone || '051-209-2229';
  const sFax = s.senderFax || '051-205-7417';
  const sMobile = s.senderMobile || '010-6645-9311';

  const items = s.items || [];
  let totalQty = 0;

  // Exact 17 rows minimum (matching authentic company Excel layout rows 9 to 25/26)
  const targetRowCount = Math.max(17, items.length);
  let tableRowsHtml = '';

  for (let i = 0; i < targetRowCount; i++) {
    const item = items[i] || {};
    const q = parseFloat(item.qty) || 0;
    if (q > 0) totalQty += q;

    const noText = (i < items.length && (item.name || item.qty)) ? (i + 1) : '';

    tableRowsHtml += `
      <tr style="height: 27px; border-bottom: 1px solid #000;">
        <td style="text-align: center; border-right: 1px solid #000; font-size: 0.82rem; color: #475569; width: 36px; padding: 0;">${noText || (i + 1)}</td>
        <td style="border-right: 1px solid #000; padding: 0;">
          <input class="po-cell-input po-item-cell" data-row="${i}" data-col="0" value="${escapeHTML(item.name || '')}" oninput="onPaperItemCellInput(${i}, 'name', this.value)" onkeydown="onPaperCellKeyDown(event, ${i}, 0)" onpaste="onPaperTablePaste(event, ${i}, 0)" placeholder="${i === 0 && !item.name ? '품명 입력' : ''}" style="font-weight: 700;">
        </td>
        <td style="border-right: 1px solid #000; width: 110px; padding: 0;">
          <input class="po-cell-input po-item-cell" data-row="${i}" data-col="1" value="${escapeHTML(item.material || '')}" oninput="onPaperItemCellInput(${i}, 'material', this.value)" onkeydown="onPaperCellKeyDown(event, ${i}, 1)" onpaste="onPaperTablePaste(event, ${i}, 1)" style="text-align: center;">
        </td>
        <td style="border-right: 1px solid #000; width: 175px; padding: 0;">
          <input class="po-cell-input po-item-cell" data-row="${i}" data-col="2" value="${escapeHTML(item.spec || '')}" oninput="onPaperItemCellInput(${i}, 'spec', this.value)" onkeydown="onPaperCellKeyDown(event, ${i}, 2)" onpaste="onPaperTablePaste(event, ${i}, 2)">
        </td>
        <td style="border-right: 1px solid #000; width: 45px; padding: 0;">
          <input class="po-cell-input po-item-cell" data-row="${i}" data-col="3" value="${escapeHTML(item.unit || (item.name ? 'EA' : ''))}" oninput="onPaperItemCellInput(${i}, 'unit', this.value)" onkeydown="onPaperCellKeyDown(event, ${i}, 3)" onpaste="onPaperTablePaste(event, ${i}, 3)" style="text-align: center;">
        </td>
        <td style="border-right: 1px solid #000; width: 75px; padding: 0;">
          <input class="po-cell-input po-item-cell" data-row="${i}" data-col="4" value="${item.qty !== undefined && item.qty !== null ? item.qty : ''}" oninput="onPaperItemCellInput(${i}, 'qty', this.value)" onkeydown="onPaperCellKeyDown(event, ${i}, 4)" onpaste="onPaperTablePaste(event, ${i}, 4)" style="text-align: right; font-weight: 700;">
        </td>
        <td style="width: 120px; padding: 0;">
          <input class="po-cell-input po-item-cell" data-row="${i}" data-col="5" value="${escapeHTML(item.remark || '')}" oninput="onPaperItemCellInput(${i}, 'remark', this.value)" onkeydown="onPaperCellKeyDown(event, ${i}, 5)" onpaste="onPaperTablePaste(event, ${i}, 5)">
        </td>
      </tr>
    `;
  }

  paper.innerHTML = `
    <!-- Top Header -->
    <div style="text-align: center; margin-bottom: 12px;">
      <h1 style="font-size: 24pt; font-weight: 800; letter-spacing: 16px; margin: 0 0 6px 0; color: #000000; font-family: 'Malgun Gothic', '맑은 고딕', Dotum, sans-serif;">&lt; &nbsp;발 &nbsp;주 &nbsp;서 &nbsp;&gt;</h1>
      <div style="display: flex; justify-content: space-between; align-items: flex-end; font-size: 9.5pt; color: #000000; margin-top: 6px; padding: 0 4px;">
        <div style="display: flex; align-items: center; gap: 4px;">
          <strong>발주번호 :</strong>
          <input class="po-cell-input" style="font-family: monospace; font-weight: 700; width: 150px; font-size: 0.95rem; border-bottom: 1px dashed #94a3b8;" value="${escapeHTML(poNo)}" oninput="onPaperMetaChange('poNo', this.value)">
        </div>
        <div style="display: flex; align-items: center; gap: 4px;">
          <strong>일 &nbsp; &nbsp;자 :</strong>
          <input type="text" class="po-cell-input" style="font-weight: 700; width: 120px; font-size: 0.95rem; text-align: right; border-bottom: 1px dashed #94a3b8;" value="${escapeHTML(poDate)}" oninput="onPaperMetaChange('poDate', this.value)">
        </div>
      </div>
    </div>

    <!-- Double Box Table (수신 & 발신) -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; font-size: 8.8pt;">
      <!-- 수신處 Box -->
      <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000;">
        <tr>
          <th rowspan="5" style="width: 28px; background: #f8fafc; border: 1px solid #000; writing-mode: vertical-rl; text-orientation: upright; font-weight: 800; color: #000; letter-spacing: 6px; padding: 4px 0; text-align: center; vertical-align: middle;">수신</th>
          <th style="width: 55px; background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">상 호</th>
          <td style="border: 1px solid #000; padding: 0;"><input class="po-cell-input" value="${escapeHTML(rComp)}" oninput="onPaperRecvChange('recvCompany', this.value)" style="font-weight: 700; font-size: 0.92rem;"></td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">전 화</th>
          <td style="border: 1px solid #000; padding: 0;"><input class="po-cell-input" value="${escapeHTML(rPhone)}" oninput="onPaperRecvChange('recvPhone', this.value)"></td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">FAX</th>
          <td style="border: 1px solid #000; padding: 0;"><input class="po-cell-input" value="${escapeHTML(rFax)}" oninput="onPaperRecvChange('recvFax', this.value)"></td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">담당자</th>
          <td style="border: 1px solid #000; padding: 0;"><input class="po-cell-input" value="${escapeHTML(rPerson)}" oninput="onPaperRecvChange('recvPerson', this.value)" style="font-weight: 600;"></td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">H.P.</th>
          <td style="border: 1px solid #000; padding: 0;"><input class="po-cell-input" value="${escapeHTML(rMobile)}" oninput="onPaperRecvChange('recvMobile', this.value)" style="color: #1e40af; font-weight: 600;"></td>
        </tr>
      </table>

      <!-- 발신處 Box -->
      <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000;">
        <tr>
          <th rowspan="5" style="width: 28px; background: #f8fafc; border: 1px solid #000; writing-mode: vertical-rl; text-orientation: upright; font-weight: 800; color: #000; letter-spacing: 6px; padding: 4px 0; text-align: center; vertical-align: middle;">발신</th>
          <th style="width: 55px; background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">상 호</th>
          <td style="border: 1px solid #000; padding: 0;"><input class="po-cell-input" value="${escapeHTML(sComp)}" oninput="onPaperSenderChange('senderCompany', this.value)" style="font-weight: 700; font-size: 0.92rem;"></td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">전 화</th>
          <td style="border: 1px solid #000; padding: 0;"><input class="po-cell-input" value="${escapeHTML(sPhone)}" oninput="onPaperSenderChange('senderPhone', this.value)"></td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">FAX</th>
          <td style="border: 1px solid #000; padding: 0;"><input class="po-cell-input" value="${escapeHTML(sFax)}" oninput="onPaperSenderChange('senderFax', this.value)"></td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">담당자</th>
          <td style="border: 1px solid #000; padding: 0;"><input class="po-cell-input" value="${escapeHTML(sMgr)}" oninput="onPaperSenderChange('senderManager', this.value)" style="font-weight: 600;"></td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">H.P.</th>
          <td style="border: 1px solid #000; padding: 0;"><input class="po-cell-input" value="${escapeHTML(sMobile)}" oninput="onPaperSenderChange('senderMobile', this.value)" style="color: #1e40af; font-weight: 600;"></td>
        </tr>
      </table>
    </div>

    <!-- Main Items Grid (7 Columns) -->
    <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 8.8pt;">
      <thead>
        <tr style="background: #e2e8f0; height: 28px; border-bottom: 1.5px solid #000;">
          <th style="width: 36px; border: 1px solid #000; text-align: center;">순</th>
          <th style="border: 1px solid #000; text-align: center;">품 명</th>
          <th style="width: 110px; border: 1px solid #000; text-align: center;">재 질</th>
          <th style="width: 175px; border: 1px solid #000; text-align: center;">규 격</th>
          <th style="width: 45px; border: 1px solid #000; text-align: center;">단위</th>
          <th style="width: 75px; border: 1px solid #000; text-align: center;">수 량</th>
          <th style="width: 120px; border: 1px solid #000; text-align: center;">비 고</th>
        </tr>
      </thead>
      <tbody>
        ${tableRowsHtml}
      </tbody>
      <tfoot>
        <tr style="background: #f8fafc; height: 28px; font-weight: 700; border-top: 1.5px solid #000;">
          <td colspan="5" style="border: 1px solid #000; text-align: center; letter-spacing: 10px; font-weight: 800;">합 &nbsp; &nbsp;계</td>
          <td style="border: 1px solid #000; text-align: right; padding: 3px 8px; color: #000; font-weight: 800;" id="paperTotalQty">${totalQty > 0 ? totalQty.toLocaleString() : ''}</td>
          <td style="border: 1px solid #000;">&nbsp;</td>
        </tr>
      </tfoot>
    </table>

    <!-- 참고사항 Box -->
    <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; margin-top: 8px; font-size: 8.8pt;">
      <tr>
        <th style="width: 28px; background: #f8fafc; border-right: 1px solid #000; writing-mode: vertical-rl; text-orientation: upright; font-weight: 800; color: #000; letter-spacing: 4px; padding: 6px 0; text-align: center; vertical-align: middle;">참고사항</th>
        <td style="padding: 6px 10px; vertical-align: middle;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <input class="po-cell-input" value="${escapeHTML(note)}" oninput="onPaperNoteChange(this.value)" placeholder="* 입고요청일: MM/DD까지 입고요청합니다" style="font-weight: 700; color: #dc2626; font-size: 0.92rem;">
          </div>
        </td>
      </tr>
    </table>
  `;
};

// Aliases for compatibility
window.updateSubOrderPreview = window.renderSubOrderPaper;

// Interactive Cell Input Handlers
window.onPaperItemCellInput = function(rowIdx, field, val) {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s) return;
  s.items = s.items || [];
  while (s.items.length <= rowIdx) {
    s.items.push({ no: s.items.length + 1, name: '', material: '', spec: '', unit: 'EA', qty: '', remark: '' });
  }

  s.items[rowIdx][field] = val;
  if (!s.items[rowIdx].no) s.items[rowIdx].no = rowIdx + 1;

  // Recalculate total qty
  let totalQty = 0;
  s.items.forEach(it => {
    const q = parseFloat(it.qty) || 0;
    if (q > 0) totalQty += q;
  });
  const totalEl = document.getElementById('paperTotalQty');
  if (totalEl) totalEl.textContent = totalQty > 0 ? totalQty.toLocaleString() : '';

  // Synchronize with window.subOrderItems & left table if open
  window.subOrderItems = s.items;
  renderSubOrderFormTable();

  triggerSubOrderAutoSave();
};

window.onPaperMetaChange = function(field, val) {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s) return;
  s[field] = val;

  if (field === 'poNo' && document.getElementById('subOrderPoNo')) document.getElementById('subOrderPoNo').value = val;
  if (field === 'poDate' && document.getElementById('subOrderDate')) document.getElementById('subOrderDate').value = val;

  triggerSubOrderAutoSave();
};

window.onPaperRecvChange = function(field, val) {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s) return;
  s[field] = val;

  triggerSubOrderAutoSave();
};

window.onPaperSenderChange = function(field, val) {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s) return;
  s[field] = val;

  triggerSubOrderAutoSave();
};

window.onPaperNoteChange = function(val) {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s) return;
  s.note = val;

  if (document.getElementById('subOrderTermsNotes')) document.getElementById('subOrderTermsNotes').value = val;

  triggerSubOrderAutoSave();
};

// Keyboard Arrow / Tab / Enter Navigation
window.onPaperCellKeyDown = function(event, rowIdx, colIdx) {
  if (event.key === 'Enter') {
    event.preventDefault();
    const nextRow = rowIdx + 1;
    let target = document.querySelector(`input[data-row="${nextRow}"][data-col="${colIdx}"]`);
    if (!target) {
      window.addBlankRowToPaper();
      setTimeout(() => {
        target = document.querySelector(`input[data-row="${nextRow}"][data-col="${colIdx}"]`);
        if (target) target.focus();
      }, 50);
    } else {
      target.focus();
    }
  } else if (event.key === 'Tab' && !event.shiftKey && colIdx === 5) {
    const nextRow = rowIdx + 1;
    let target = document.querySelector(`input[data-row="${nextRow}"][data-col="0"]`);
    if (target) {
      event.preventDefault();
      target.focus();
    }
  }
};

// Excel Paste Support (Tab & Newline parsing)
window.onPaperTablePaste = function(event, startRow, startCol) {
  const clipboardData = event.clipboardData || window.clipboardData;
  if (!clipboardData) return;
  const text = clipboardData.getData('text');
  if (!text || (!text.includes('\t') && !text.includes('\n'))) return;

  event.preventDefault();
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s) return;
  s.items = s.items || [];

  const lines = text.trim().split(/\r?\n/);
  const fields = ['name', 'material', 'spec', 'unit', 'qty', 'remark'];

  lines.forEach((line, rOffset) => {
    const targetRowIdx = startRow + rOffset;
    while (s.items.length <= targetRowIdx) {
      s.items.push({ no: s.items.length + 1, name: '', material: '', spec: '', unit: 'EA', qty: '', remark: '' });
    }

    const cells = line.split('\t');
    cells.forEach((cellVal, cOffset) => {
      const targetColIdx = startCol + cOffset;
      if (targetColIdx < fields.length) {
        const fieldName = fields[targetColIdx];
        s.items[targetRowIdx][fieldName] = cellVal.trim();
      }
    });
    s.items[targetRowIdx].no = targetRowIdx + 1;
  });

  window.subOrderItems = s.items;
  renderSubOrderPaper();
  renderSubOrderFormTable();
  triggerSubOrderAutoSave();
  if (typeof showToast === 'function') showToast(`엑셀에서 ${lines.length}개 행이 발주서 시트에 붙여넣어졌습니다.`, 'success');
};

// Vendor Change Handler
window.onSubOrderVendorChange = function(vendorName) {
  if (!vendorName) return;
  window.currentSubOrderVendor = vendorName;
  window.currentActiveSheetIdx = 0; // Always start at primary active sheet

  // Sync select dropdown options & value
  const select = document.getElementById('subOrderVendorSelect');
  if (select) {
    let exists = false;
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].value === vendorName) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      const vMeta = (window.SUB_ORDER_VENDORS || []).find(v => v.vendor === vendorName);
      const opt = document.createElement('option');
      opt.value = vendorName;
      opt.textContent = `${vendorName} (${(vMeta && vMeta.category) || '부재료'})`;
      select.appendChild(opt);
    }
    select.value = vendorName;
  }

  // Update Category Badge & Header Title
  let vMeta = (window.SUB_ORDER_VENDORS || []).find(v => v.vendor === vendorName);
  const badge = document.getElementById('subOrderVendorCategoryBadge');
  if (badge && vMeta) {
    badge.textContent = vMeta.category || '부재료';
  }
  const titleBadge = document.getElementById('currentVendorHeaderTitle');
  if (titleBadge) titleBadge.textContent = vendorName;

  // Re-render vendor pills to highlight active vendor
  if (typeof renderSubOrderVendorPills === 'function') {
    const input = document.getElementById('subOrderVendorSearchInput');
    const query = input ? input.value : '';
    const filtered = (window.SUB_ORDER_VENDORS || []).filter(v => matchSubOrderVendor(v, query));
    renderSubOrderVendorPills(filtered.length > 0 ? filtered : window.SUB_ORDER_VENDORS);
  }

  // Update search results dropdown if open
  const resBox = document.getElementById('subOrderVendorSearchResults');
  if (resBox && resBox.style.display !== 'none') {
    const input = document.getElementById('subOrderVendorSearchInput');
    const query = input ? input.value : '';
    if (query && query.trim()) {
      const filtered = (window.SUB_ORDER_VENDORS || []).filter(v => matchSubOrderVendor(v, query));
      renderVendorSearchResultsDropdown(filtered, query);
    }
  }

  // Render quick chips
  if (vMeta) renderSubOrderQuickChips(vMeta);

  // Load sheets for this vendor
  loadVendorSheets(vendorName);

  // Render sheet tabs and paper
  renderSubOrderSheetTabs();
  renderSubOrderPaper();

  // Sync left-hand inputs
  const s = (window.vendorSheetsMap[vendorName] || [])[window.currentActiveSheetIdx] || {};
  if (document.getElementById('subOrderPoNo')) document.getElementById('subOrderPoNo').value = s.poNo || '';
  if (document.getElementById('subOrderDate')) document.getElementById('subOrderDate').value = s.poDate || '';
  if (document.getElementById('subOrderRecvCompany')) document.getElementById('subOrderRecvCompany').value = s.recvCompany || vendorName;
  if (document.getElementById('subOrderRecvPerson')) document.getElementById('subOrderRecvPerson').value = s.recvPerson || '';
  if (document.getElementById('subOrderRecvPhone')) document.getElementById('subOrderRecvPhone').value = s.recvPhone || '';
  if (document.getElementById('subOrderRecvFax')) document.getElementById('subOrderRecvFax').value = s.recvFax || '';
  if (document.getElementById('subOrderRecvMobile')) document.getElementById('subOrderRecvMobile').value = s.recvMobile || '';
  if (document.getElementById('subOrderTermsNotes')) document.getElementById('subOrderTermsNotes').value = s.note || '';

  window.subOrderItems = s.items || [];
  renderSubOrderFormTable();
  triggerSubOrderAutoSave();
};

window.renderSubOrderQuickChips = function(target) {
  const container = document.getElementById('subOrderQuickChips');
  if (!container) return;
  container.innerHTML = '';
  if (!target || !target.frequentItems || target.frequentItems.length === 0) {
    container.innerHTML = '<span style="font-size:0.76rem; color:#94a3b8;">추천 품목 없음</span>';
    return;
  }

  target.frequentItems.forEach(item => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'btn btn-sm';
    chip.style.cssText = 'font-size: 0.74rem; padding: 3px 8px; border-radius: 6px; background: rgba(59, 130, 246, 0.12); border: 1px solid rgba(59, 130, 246, 0.3); color: #3b82f6; font-weight: 600; cursor: pointer; white-space: nowrap;';
    chip.innerHTML = `+ ${item.name} <span style="opacity:0.75; font-size:0.7rem;">(${item.spec})</span>`;
    chip.onclick = () => {
      window.addSubOrderItem({
        name: item.name,
        material: item.material,
        spec: item.spec,
        unit: item.unit || 'EA',
        qty: 100,
        remark: item.remark || ''
      });
      if (typeof showToast === 'function') showToast(`[${item.name} (${item.spec})] 품목이 추가되었습니다.`, 'info');
    };
    container.appendChild(chip);
  });
};

window.renderSubOrderFormTable = function() {
  const tbody = document.getElementById('subOrderFormTableBody');
  if (!tbody) return;
  tbody.innerHTML = '';

  const items = window.subOrderItems || [];
  if (items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 22px; color: var(--text-secondary, #64748b); font-size: 0.85rem;">우측 시트에서 직접 입력하거나 상단의 <strong>[+ 품목 행 추가]</strong>를 클릭하세요.</td></tr>`;
    return;
  }

  items.forEach((item, idx) => {
    const tr = document.createElement('tr');
    tr.style.cssText = 'border-bottom: 1px solid var(--input-border, #cbd5e1); height: 40px; transition: background 0.15s;';
    tr.innerHTML = `
      <td style="text-align: center; font-weight: 700; font-size: 0.85rem; color: var(--text-secondary, #475569); padding: 4px;">${idx + 1}</td>
      <td style="padding: 3px 6px;">
        <input type="text" value="${escapeHTML(item.name || '')}" oninput="onSubOrderItemFieldChange(${idx}, 'name', this.value)" placeholder="품명 (예: PLAIN WASHER)" title="품명 입력" style="width: 100%; min-width: 170px; padding: 6px 8px; font-size: 0.88rem; font-weight: 700; border: 1.5px solid var(--input-border, #cbd5e1); border-radius: 5px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a); outline: none; transition: border-color 0.15s, box-shadow 0.15s;">
      </td>
      <td style="padding: 3px 6px;">
        <input type="text" value="${escapeHTML(item.material || '')}" oninput="onSubOrderItemFieldChange(${idx}, 'material', this.value)" placeholder="재질 (예: SUS316L)" title="재질 및 표면처리 입력" style="width: 100%; min-width: 120px; padding: 6px 8px; font-size: 0.86rem; font-weight: 600; border: 1.5px solid var(--input-border, #cbd5e1); border-radius: 5px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a); outline: none; transition: border-color 0.15s, box-shadow 0.15s;">
      </td>
      <td style="padding: 3px 6px;">
        <input type="text" value="${escapeHTML(item.spec || '')}" oninput="onSubOrderItemFieldChange(${idx}, 'spec', this.value)" placeholder="규격 (예: M16*70L)" title="규격 및 치수 입력" style="width: 100%; min-width: 150px; padding: 6px 8px; font-size: 0.86rem; font-weight: 600; border: 1.5px solid var(--input-border, #cbd5e1); border-radius: 5px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a); outline: none; transition: border-color 0.15s, box-shadow 0.15s;">
      </td>
      <td style="padding: 3px 4px;">
        <input type="text" value="${escapeHTML(item.unit || 'EA')}" oninput="onSubOrderItemFieldChange(${idx}, 'unit', this.value)" title="단위" style="width: 100%; padding: 6px 2px; font-size: 0.85rem; font-weight: 600; text-align: center; border: 1px solid var(--input-border, #cbd5e1); border-radius: 5px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a); outline: none;">
      </td>
      <td style="padding: 3px 4px;">
        <input type="number" value="${item.qty || ''}" oninput="onSubOrderItemFieldChange(${idx}, 'qty', this.value)" placeholder="0" title="수량" style="width: 100%; padding: 6px 6px; font-size: 0.88rem; text-align: right; font-weight: 800; border: 1.5px solid var(--input-border, #cbd5e1); border-radius: 5px; background: var(--input-bg, #ffffff); color: #2563eb; outline: none;">
      </td>
      <td style="padding: 3px 6px;">
        <input type="text" value="${escapeHTML(item.remark || '')}" oninput="onSubOrderItemFieldChange(${idx}, 'remark', this.value)" placeholder="비고 (선택사항)" title="비고" style="width: 100%; min-width: 100px; padding: 6px 8px; font-size: 0.85rem; border: 1px solid var(--input-border, #cbd5e1); border-radius: 5px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a); outline: none;">
      </td>
      <td style="text-align: center; padding: 4px;">
        <button type="button" onclick="removeSubOrderItem(${idx})" title="이 품목 행 삭제" style="background: none; border: none; color: #ef4444; font-size: 1.05rem; cursor: pointer; padding: 4px 6px; border-radius: 4px; line-height: 1;">✕</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
};

window.addSubOrderItem = function(defaultValues = {}) {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s) return;
  s.items = s.items || [];
  s.items.push({
    no: s.items.length + 1,
    name: defaultValues.name || '품목명 입력',
    material: defaultValues.material || '',
    spec: defaultValues.spec || '',
    unit: defaultValues.unit || 'EA',
    qty: defaultValues.qty || 100,
    remark: defaultValues.remark || ''
  });
  window.subOrderItems = s.items;
  renderSubOrderPaper();
  renderSubOrderFormTable();
  triggerSubOrderAutoSave();
};

window.removeSubOrderItem = function(idx) {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s || !s.items) return;
  s.items.splice(idx, 1);
  s.items.forEach((it, i) => { it.no = i + 1; });
  window.subOrderItems = s.items;
  renderSubOrderPaper();
  renderSubOrderFormTable();
  triggerSubOrderAutoSave();
};

window.onSubOrderItemFieldChange = function(idx, field, value) {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (!s || !s.items || !s.items[idx]) return;
  s.items[idx][field] = value;
  window.subOrderItems = s.items;
  renderSubOrderPaper();
  triggerSubOrderAutoSave();
};

// Print Function (Exact 1:1 A4 Format)
window.printSubOrder = function() {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx] || {};

  const poNo = s.poNo || 'PC2611-0001';
  const poDate = s.poDate || '';
  const note = s.note || '입고요청일 : 협의 후 납품';

  const rComp = s.recvCompany || v;
  const rPerson = s.recvPerson || '대표/담당자님';
  const rPhone = s.recvPhone || '';
  const rFax = s.recvFax || '';
  const rMobile = s.recvMobile || '';

  const sComp = s.senderCompany || '(주)에스앤더블류';
  const sMgr = s.senderManager || '김태훈 주임';
  const sPhone = s.senderPhone || '051-209-2229';
  const sFax = s.senderFax || '051-205-7417';
  const sMobile = s.senderMobile || '010-6645-9311';

  const items = s.items || [];
  let totalQty = 0;
  const targetRowCount = Math.max(17, items.length);
  let rowsHtml = '';

  for (let i = 0; i < targetRowCount; i++) {
    const item = items[i] || {};
    const q = parseFloat(item.qty) || 0;
    if (q > 0) totalQty += q;
    const noText = (i < items.length && (item.name || item.qty)) ? (i + 1) : '';

    rowsHtml += `
      <tr style="height: 27px; border-bottom: 1px solid #000;">
        <td style="text-align: center; border-right: 1px solid #000; font-size: 8.5pt;">${noText || (i + 1)}</td>
        <td style="padding: 2px 6px; font-weight: 700; border-right: 1px solid #000; font-size: 8.5pt;">${escapeHTML(item.name || '')}</td>
        <td style="text-align: center; padding: 2px 4px; border-right: 1px solid #000; font-size: 8.5pt;">${escapeHTML(item.material || '')}</td>
        <td style="padding: 2px 6px; border-right: 1px solid #000; font-size: 8.5pt;">${escapeHTML(item.spec || '')}</td>
        <td style="text-align: center; border-right: 1px solid #000; font-size: 8.5pt;">${escapeHTML(item.unit || (item.name ? 'EA' : ''))}</td>
        <td style="text-align: right; padding: 2px 6px; font-weight: 700; border-right: 1px solid #000; font-size: 8.5pt;">${q > 0 ? q.toLocaleString() : ''}</td>
        <td style="padding: 2px 6px; font-size: 8.2pt;">${escapeHTML(item.remark || '')}</td>
      </tr>
    `;
  }

  const printContent = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>발주서_${rComp}_${poNo}</title>
  <style>
    @page { size: A4 portrait; margin: 12mm 14mm 10mm 14mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    body { margin: 0; padding: 0; font-family: 'Malgun Gothic', '맑은 고딕', Dotum, sans-serif; background: #fff; color: #000; }
    .no-print-bar { margin-bottom: 12px; padding: 8px 14px; background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; }
    @media print { .no-print-bar { display: none !important; } body { margin: 0; padding: 0; } }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <span style="font-size: 13px; font-weight: 600; color: #1e3a8a;">📄 [${rComp}] 부재료 발주서 인쇄 미리보기</span>
    <button onclick="window.print()" style="padding: 6px 18px; background: #2563eb; color: #fff; border: none; border-radius: 4px; font-weight: 700; cursor: pointer; font-size: 13px;">🖨️ 인쇄 / PDF 저장</button>
  </div>

  <div style="text-align: center; margin-bottom: 12px;">
    <h1 style="font-size: 24pt; font-weight: 800; letter-spacing: 16px; margin: 0 0 6px 0; color: #000;">&lt; &nbsp;발 &nbsp;주 &nbsp;서 &nbsp;&gt;</h1>
    <div style="display: flex; justify-content: space-between; font-size: 9.5pt; color: #000; margin-top: 6px;">
      <span><strong>발주번호 :</strong> <span style="font-family: monospace; font-weight: 700;">${escapeHTML(poNo)}</span></span>
      <span><strong>일 &nbsp; &nbsp;자 :</strong> <span style="font-weight: 700;">${escapeHTML(poDate)}</span></span>
    </div>
  </div>

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 10px; font-size: 8.8pt;">
    <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000;">
      <tr>
        <th rowspan="5" style="width: 28px; background: #f8fafc; border: 1px solid #000; writing-mode: vertical-rl; text-orientation: upright; font-weight: 800; letter-spacing: 6px; padding: 4px 0; text-align: center; vertical-align: middle;">수신</th>
        <th style="width: 55px; background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">상 호</th>
        <td style="border: 1px solid #000; padding: 3px 6px; font-weight: 700; font-size: 9.2pt;">${escapeHTML(rComp)}</td>
      </tr>
      <tr>
        <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">전 화</th>
        <td style="border: 1px solid #000; padding: 3px 6px;">${escapeHTML(rPhone)}</td>
      </tr>
      <tr>
        <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">FAX</th>
        <td style="border: 1px solid #000; padding: 3px 6px;">${escapeHTML(rFax)}</td>
      </tr>
      <tr>
        <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">담당자</th>
        <td style="border: 1px solid #000; padding: 3px 6px; font-weight: 600;">${escapeHTML(rPerson)}</td>
      </tr>
      <tr>
        <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">H.P.</th>
        <td style="border: 1px solid #000; padding: 3px 6px; font-weight: 600;">${escapeHTML(rMobile)}</td>
      </tr>
    </table>

    <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000;">
      <tr>
        <th rowspan="5" style="width: 28px; background: #f8fafc; border: 1px solid #000; writing-mode: vertical-rl; text-orientation: upright; font-weight: 800; letter-spacing: 6px; padding: 4px 0; text-align: center; vertical-align: middle;">발신</th>
        <th style="width: 55px; background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">상 호</th>
        <td style="border: 1px solid #000; padding: 3px 6px; font-weight: 700; font-size: 9.2pt;">${escapeHTML(sComp)}</td>
      </tr>
      <tr>
        <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">전 화</th>
        <td style="border: 1px solid #000; padding: 3px 6px;">${escapeHTML(sPhone)}</td>
      </tr>
      <tr>
        <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">FAX</th>
        <td style="border: 1px solid #000; padding: 3px 6px;">${escapeHTML(sFax)}</td>
      </tr>
      <tr>
        <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">담당자</th>
        <td style="border: 1px solid #000; padding: 3px 6px; font-weight: 600;">${escapeHTML(sMgr)}</td>
      </tr>
      <tr>
        <th style="background: #f1f5f9; border: 1px solid #000; padding: 3px 6px; text-align: center; font-weight: 600;">H.P.</th>
        <td style="border: 1px solid #000; padding: 3px 6px; font-weight: 600;">${escapeHTML(sMobile)}</td>
      </tr>
    </table>
  </div>

  <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 8.8pt;">
    <thead>
      <tr style="background: #e2e8f0; height: 28px; border-bottom: 1.5px solid #000;">
        <th style="width: 36px; border: 1px solid #000; text-align: center;">순</th>
        <th style="border: 1px solid #000; text-align: center;">품 명</th>
        <th style="width: 110px; border: 1px solid #000; text-align: center;">재 질</th>
        <th style="width: 175px; border: 1px solid #000; text-align: center;">규 격</th>
        <th style="width: 45px; border: 1px solid #000; text-align: center;">단위</th>
        <th style="width: 75px; border: 1px solid #000; text-align: center;">수 량</th>
        <th style="width: 120px; border: 1px solid #000; text-align: center;">비 고</th>
      </tr>
    </thead>
    <tbody>
      ${rowsHtml}
    </tbody>
    <tfoot>
      <tr style="background: #f8fafc; height: 28px; font-weight: 700; border-top: 1.5px solid #000;">
        <td colspan="5" style="border: 1px solid #000; text-align: center; letter-spacing: 10px; font-weight: 800;">합 &nbsp; &nbsp;계</td>
        <td style="border: 1px solid #000; text-align: right; padding: 3px 8px; color: #000; font-weight: 800;">${totalQty > 0 ? totalQty.toLocaleString() : ''}</td>
        <td style="border: 1px solid #000;">&nbsp;</td>
      </tr>
    </tfoot>
  </table>

  <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; margin-top: 8px; font-size: 8.8pt;">
    <tr>
      <th style="width: 28px; background: #f8fafc; border-right: 1px solid #000; writing-mode: vertical-rl; text-orientation: upright; font-weight: 800; color: #000; letter-spacing: 4px; padding: 6px 0; text-align: center; vertical-align: middle;">참고사항</th>
      <td style="padding: 6px 10px; vertical-align: middle;">
        <strong style="color: #000;">${escapeHTML(note)}</strong>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    const printWin = window.open('', '_blank', 'width=900,height=1000');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(printContent);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        try { printWin.print(); } catch (e) {}
      }, 350);
      return;
    }
  } catch (err) {
    console.warn('Popup print blocked, falling back to direct window.print:', err);
  }

  document.body.classList.add('printing-suborder');
  window.print();
  setTimeout(() => {
    document.body.classList.remove('printing-suborder');
  }, 1000);
};

// Excel Download (Exact Match to Company Excel Format)
window.downloadSubOrderExcel = function() {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx] || {};

  const poNo = s.poNo || 'PC2611-0001';
  const poDate = s.poDate || '';
  const note = s.note || '입고요청일 : 협의 후 납품';

  const rComp = s.recvCompany || v;
  const rPerson = s.recvPerson || '대표/담당자님';
  const rPhone = s.recvPhone || '';
  const rFax = s.recvFax || '';
  const rMobile = s.recvMobile || '';

  const sComp = s.senderCompany || '(주)에스앤더블류';
  const sMgr = s.senderManager || '김태훈 주임';
  const sPhone = s.senderPhone || '051-209-2229';
  const sFax = s.senderFax || '051-205-7417';
  const sMobile = s.senderMobile || '010-6645-9311';

  const items = s.items || [];
  let totalQty = 0;
  const targetRows = Math.max(17, items.length);
  let rowsXml = '';

  for (let i = 0; i < targetRows; i++) {
    const it = items[i] || {};
    const q = parseFloat(it.qty) || 0;
    if (q > 0) totalQty += q;
    const noText = (i < items.length && (it.name || it.qty)) ? (i + 1) : '';

    rowsXml += `
      <tr style="height:25px;">
        <td style="border:1px solid #000; text-align:center;">${noText || (i + 1)}</td>
        <td style="border:1px solid #000; font-weight:bold;">${escapeHTML(it.name || '')}</td>
        <td style="border:1px solid #000; text-align:center;">${escapeHTML(it.material || '')}</td>
        <td style="border:1px solid #000;">${escapeHTML(it.spec || '')}</td>
        <td style="border:1px solid #000; text-align:center;">${escapeHTML(it.unit || (it.name ? 'EA' : ''))}</td>
        <td style="border:1px solid #000; text-align:right;">${q > 0 ? q : ''}</td>
        <td style="border:1px solid #000;">${escapeHTML(it.remark || '')}</td>
      </tr>
    `;
  }

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${escapeHTML(s.sheetName || '발주서')}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
      <style>
        body { font-family: 'Malgun Gothic', '맑은 고딕', sans-serif; font-size: 10pt; }
        table { border-collapse: collapse; width: 100%; }
        th, td { padding: 4px 6px; }
      </style>
    </head>
    <body>
      <table>
        <tr><td colspan="7" style="text-align:center; font-size:22pt; font-weight:bold; letter-spacing:14px; height:45px;">&lt; &nbsp;발 &nbsp;주 &nbsp;서 &nbsp;&gt;</td></tr>
        <tr>
          <td colspan="3" style="font-weight:bold;">발주번호 : ${escapeHTML(poNo)}</td>
          <td colspan="4" style="text-align:right; font-weight:bold;">일 &nbsp; &nbsp;자 : ${escapeHTML(poDate)}</td>
        </tr>
        <tr><td colspan="7" style="height:6px;"></td></tr>
        <tr>
          <th rowspan="5" style="border:1px solid #000; background:#eee; text-align:center; vertical-align:middle; width:30px;">수<br><br>신</th>
          <th style="border:1px solid #000; background:#f5f5f5; width:60px;">상 호</th>
          <td style="border:1px solid #000; font-weight:bold;" colspan="2">${escapeHTML(rComp)}</td>
          <th rowspan="5" style="border:1px solid #000; background:#eee; text-align:center; vertical-align:middle; width:30px;">발<br><br>신</th>
          <th style="border:1px solid #000; background:#f5f5f5; width:60px;">상 호</th>
          <td style="border:1px solid #000; font-weight:bold;">${escapeHTML(sComp)}</td>
        </tr>
        <tr>
          <th style="border:1px solid #000; background:#f5f5f5;">전 화</th>
          <td style="border:1px solid #000;" colspan="2">${escapeHTML(rPhone)}</td>
          <th style="border:1px solid #000; background:#f5f5f5;">전 화</th>
          <td style="border:1px solid #000;">${escapeHTML(sPhone)}</td>
        </tr>
        <tr>
          <th style="border:1px solid #000; background:#f5f5f5;">FAX</th>
          <td style="border:1px solid #000;" colspan="2">${escapeHTML(rFax)}</td>
          <th style="border:1px solid #000; background:#f5f5f5;">FAX</th>
          <td style="border:1px solid #000;">${escapeHTML(sFax)}</td>
        </tr>
        <tr>
          <th style="border:1px solid #000; background:#f5f5f5;">담당자</th>
          <td style="border:1px solid #000;" colspan="2">${escapeHTML(rPerson)}</td>
          <th style="border:1px solid #000; background:#f5f5f5;">담당자</th>
          <td style="border:1px solid #000; font-weight:bold;">${escapeHTML(sMgr)}</td>
        </tr>
        <tr>
          <th style="border:1px solid #000; background:#f5f5f5;">H.P.</th>
          <td style="border:1px solid #000;" colspan="2">${escapeHTML(rMobile)}</td>
          <th style="border:1px solid #000; background:#f5f5f5;">H.P.</th>
          <td style="border:1px solid #000;">${escapeHTML(sMobile)}</td>
        </tr>
        <tr><td colspan="7" style="height:6px;"></td></tr>
        <tr style="background:#ddd; font-weight:bold; height:28px;">
          <th style="border:1px solid #000; width:40px; text-align:center;">순</th>
          <th style="border:1px solid #000; text-align:center;">품 명</th>
          <th style="border:1px solid #000; width:110px; text-align:center;">재 질</th>
          <th style="border:1px solid #000; width:180px; text-align:center;">규 격</th>
          <th style="border:1px solid #000; width:45px; text-align:center;">단위</th>
          <th style="border:1px solid #000; width:75px; text-align:center;">수 량</th>
          <th style="border:1px solid #000; width:120px; text-align:center;">비 고</th>
        </tr>
        ${rowsXml}
        <tr style="background:#eee; font-weight:bold; height:28px;">
          <td colspan="5" style="border:1px solid #000; text-align:center; letter-spacing:10px;">합 &nbsp; &nbsp;계</td>
          <td style="border:1px solid #000; text-align:right;">${totalQty > 0 ? totalQty.toLocaleString() : ''}</td>
          <td style="border:1px solid #000;"></td>
        </tr>
        <tr><td colspan="7" style="height:6px;"></td></tr>
        <tr>
          <th style="border:1px solid #000; background:#eee; text-align:center; vertical-align:middle;">참<br><br>고<br><br>사<br><br>항</th>
          <td colspan="6" style="border:1px solid #000; padding:8px; line-height:1.6; font-weight:bold;">
            ${escapeHTML(note)}
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\uFEFF' + html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  const sheetClean = (s.sheetName || '발주서').replace(/[^\w\d가-힣.-]/g, '_');
  a.download = `발주서_${rComp}_${sheetClean}_${poNo}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  if (typeof showToast === 'function') showToast(`'${a.download}' 엑셀 파일이 다운로드되었습니다.`, 'success');
};

// Copy Text
window.copySubOrderText = function() {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx] || {};

  let text = `[ (주)에스앤더블류 부재료 발주서 ]\n`;
  text += `* 발주번호: ${s.poNo || ''}\n`;
  text += `* 수신업체: ${s.recvCompany || v}\n`;
  text += `* 발주일자: ${s.poDate || ''}\n`;
  text += `* 참고사항: ${s.note || ''}\n`;
  text += `-----------------------------------------\n`;
  text += `순번 | 품명 | 재질 | 규격 | 수량 | 비고\n`;

  (s.items || []).forEach((row, idx) => {
    if (row.name || row.qty) {
      text += `${idx + 1}. ${row.name || '-'} | ${row.material || '-'} | ${row.spec || '-'} | ${row.qty || 0}${row.unit || 'EA'} | ${row.remark || '-'}\n`;
    }
  });
  text += `-----------------------------------------\n`;
  text += `* 발신: (주)에스앤더블류 구매부 김태훈 주임 (010-6645-9311 / 051-209-2229)`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      if (typeof showToast === 'function') showToast('발주서 텍스트가 클립보드에 복사되었습니다.', 'success');
    }).catch(() => prompt('발주서 텍스트 복사 (Ctrl+C):', text));
  } else {
    prompt('발주서 텍스트 복사 (Ctrl+C):', text);
  }
};

// Email Launcher
window.openSubOrderEmail = function() {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx] || {};

  const rComp = s.recvCompany || v;
  const poNo = s.poNo || '';
  const poDate = s.poDate || '';

  let vMeta = (window.SUB_ORDER_VENDORS || []).find(it => it.vendor === v);
  const rEmail = (vMeta && vMeta.email) || '';

  const subject = encodeURIComponent(`[(주)에스앤더블류 발주서] ${rComp} 귀하 (${poNo})`);
  let bodyText = `안녕하세요, ${rComp} 담당자님.\n(주)에스앤더블류 구매부 김태훈 주임입니다.\n\n요청드린 부재료 발주서를 송부드리오니 확인 후 납기 일정에 맞추어 공급 부탁드립니다.\n\n- 발주번호: ${poNo}\n- 발주일자: ${poDate}\n- 참고사항: ${s.note || ''}\n\n감사합니다.\n\n(주)에스앤더블류 구매부 김태훈 주임 드림\nTEL: 051-209-2229 | H.P: 010-6645-9311`;
  const body = encodeURIComponent(bodyText);

  window.location.href = `mailto:${rEmail}?subject=${subject}&body=${body}`;
};

// History Modal Handlers
window.saveSubOrderToHistory = function() {
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx] || {};

  try {
    let history = JSON.parse(localStorage.getItem('snw_sub_orders_history') || '[]');
    const record = {
      id: 'po_' + Date.now(),
      vendor: v,
      sheetName: s.sheetName,
      poNo: s.poNo,
      date: s.poDate,
      savedAt: new Date().toISOString(),
      note: s.note,
      recv: {
        company: s.recvCompany,
        person: s.recvPerson,
        phone: s.recvPhone,
        fax: s.recvFax,
        mobile: s.recvMobile
      },
      items: s.items || []
    };
    history.unshift(record);
    if (history.length > 50) history = history.slice(0, 50);
    localStorage.setItem('snw_sub_orders_history', JSON.stringify(history));
    triggerSubOrderAutoSave();
    if (typeof showToast === 'function') showToast(`발주서 [${s.poNo}]가 발주 이력에 저장되었습니다.`, 'success');
  } catch (e) {
    console.error('Save to history failed:', e);
  }
};

window.showSubOrderHistoryModal = function() {
  const modal = document.getElementById('subOrderHistoryModal');
  const body = document.getElementById('subOrderHistoryModalBody');
  if (!modal || !body) return;

  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('snw_sub_orders_history') || '[]');
  } catch (e) {}

  if (history.length === 0) {
    body.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary, #94a3b8);">
        <div style="font-size: 2.2rem; margin-bottom: 8px;">📂</div>
        <div style="font-weight: 700; font-size: 1rem; color: var(--text-primary, #f8fafc);">저장된 발주서 이력이 없습니다.</div>
        <div style="font-size: 0.85rem; margin-top: 4px;">상단의 [💾 발주서 저장] 버튼을 누르면 최근 발주서가 보관됩니다.</div>
      </div>
    `;
  } else {
    let rowsHtml = '';
    history.forEach(item => {
      const itemsSummary = (item.items || []).filter(i => i.name).map(i => `${i.name}(${i.qty || 0})`).slice(0, 3).join(', ');
      rowsHtml += `
        <tr style="border-bottom: 1px solid var(--border-color, #334155); height: 36px; font-size: 0.85rem;">
          <td style="padding: 6px 10px; font-family: monospace; font-weight: 700; color: #3b82f6;">${escapeHTML(item.poNo || '-')}</td>
          <td style="padding: 6px 10px; font-weight: 700; color: var(--text-primary, #f8fafc);">${escapeHTML(item.vendor || '-')}</td>
          <td style="padding: 6px 10px; text-align: center; color: var(--text-secondary, #94a3b8);">${escapeHTML(item.date || '-')}</td>
          <td style="padding: 6px 10px; color: var(--text-secondary, #cbd5e1); max-width: 250px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${escapeHTML(itemsSummary || '품목 없음')}</td>
          <td style="padding: 6px 10px; text-align: center;">
            <button class="btn btn-sm btn-primary" onclick="loadSubOrderRecord('${item.id}')" style="font-size: 0.75rem; padding: 2px 8px; font-weight: 700; margin-right: 4px;">불러오기</button>
            <button class="btn btn-sm btn-outline" onclick="deleteSubOrderRecord('${item.id}')" style="font-size: 0.75rem; padding: 2px 6px; color: #ef4444; border-color: rgba(239, 68, 68, 0.4);">삭제</button>
          </td>
        </tr>
      `;
    });

    body.innerHTML = `
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="border-bottom: 1px solid var(--border-color, #334155); background: rgba(255,255,255,0.03); font-size: 0.8rem; color: var(--text-secondary, #94a3b8); height: 30px;">
            <th style="padding: 6px 10px; text-align: left;">발주번호</th>
            <th style="padding: 6px 10px; text-align: left;">거래처</th>
            <th style="padding: 6px 10px; text-align: center;">발주일자</th>
            <th style="padding: 6px 10px; text-align: left;">품목 요약</th>
            <th style="padding: 6px 10px; text-align: center; width: 130px;">관리</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  }

  modal.style.display = 'flex';
};

window.closeSubOrderHistoryModal = function() {
  const modal = document.getElementById('subOrderHistoryModal');
  if (modal) modal.style.display = 'none';
};

window.loadSubOrderRecord = function(id) {
  try {
    const history = JSON.parse(localStorage.getItem('snw_sub_orders_history') || '[]');
    const record = history.find(h => h.id === id);
    if (!record) return;

    if (record.vendor) {
      const select = document.getElementById('subOrderVendorSelect');
      if (select) select.value = record.vendor;
      window.currentSubOrderVendor = record.vendor;
      loadVendorSheets(record.vendor);
    }

    const sheets = window.vendorSheetsMap[window.currentSubOrderVendor] || [];
    const restoredSheet = {
      id: record.id,
      sheetName: record.sheetName || '복원시트',
      poNo: record.poNo,
      poDate: record.date,
      recvCompany: (record.recv && record.recv.company) || record.vendor,
      recvPhone: (record.recv && record.recv.phone) || '',
      recvFax: (record.recv && record.recv.fax) || '',
      recvPerson: (record.recv && record.recv.person) || '',
      recvMobile: (record.recv && record.recv.mobile) || '',
      senderCompany: "(주)에스앤더블류",
      senderPhone: "051-209-2229",
      senderFax: "051-205-7417",
      senderManager: "김태훈 주임",
      senderMobile: "010-6645-9311",
      note: record.note || '',
      items: record.items || []
    };

    sheets.unshift(restoredSheet);
    window.currentActiveSheetIdx = 0;
    renderSubOrderSheetTabs();
    renderSubOrderPaper();
    closeSubOrderHistoryModal();
    triggerSubOrderAutoSave();
    if (typeof showToast === 'function') showToast(`발주서 [${record.poNo}]를 새 시트로 성공적으로 불러왔습니다.`, 'success');
  } catch (e) {
    console.error('Load record failed:', e);
  }
};

window.deleteSubOrderRecord = function(id) {
  if (!confirm('해당 발주서 저장 이력을 삭제하시겠습니까?')) return;
  try {
    let history = JSON.parse(localStorage.getItem('snw_sub_orders_history') || '[]');
    history = history.filter(h => h.id !== id);
    localStorage.setItem('snw_sub_orders_history', JSON.stringify(history));
    showSubOrderHistoryModal();
  } catch (e) {}
};

window.resetSubOrderForm = function() {
  if (!confirm('현재 시트의 작성 내용을 초기화하시겠습니까?')) return;
  const v = window.currentSubOrderVendor;
  const sheets = window.vendorSheetsMap[v] || [];
  const s = sheets[window.currentActiveSheetIdx];
  if (s) {
    s.items = [];
    window.subOrderItems = [];
    renderSubOrderPaper();
    renderSubOrderFormTable();
    triggerSubOrderAutoSave();
  }
};

// Auto-initialize Sub Order view when DOM is ready
if (typeof document !== 'undefined') {
  // Global click listener to close vendor search suggestions when clicked outside
  document.addEventListener('click', function(e) {
    const container = document.getElementById('subOrderVendorSearchResults');
    const input = document.getElementById('subOrderVendorSearchInput');
    if (container && input && container.style.display !== 'none') {
      if (!container.contains(e.target) && e.target !== input) {
        container.style.display = 'none';
      }
    }
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof window.initSubOrderView === 'function') {
        window.initSubOrderView(true);
      }
    });
  } else {
    setTimeout(function() {
      if (typeof window.initSubOrderView === 'function') {
        window.initSubOrderView(true);
      }
    }, 100);
  }
}
