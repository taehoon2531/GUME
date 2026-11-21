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
    vendor: "에스비앤",
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

  // 1. Populate vendor dropdown
  if (select) {
    select.innerHTML = '<option value="">-- 부재료 발주 거래처 선택 --</option>';
    window.SUB_ORDER_VENDORS.forEach((v, idx) => {
      const opt = document.createElement('option');
      opt.value = v.vendor;
      opt.textContent = `${v.vendor} (${v.category})`;
      if (idx === 0) opt.selected = true;
      select.appendChild(opt);
    });

    // Also add any other vendors from VENDOR_MASTER_DATA if available
    if (window.VENDOR_MASTER_DATA && Array.isArray(window.VENDOR_MASTER_DATA)) {
      const existing = new Set(window.SUB_ORDER_VENDORS.map(v => v.vendor));
      const group = document.createElement('optgroup');
      group.label = "기타 등록 거래처";
      window.VENDOR_MASTER_DATA.forEach(vm => {
        if (!existing.has(vm.vendor) && vm.vendor) {
          const opt = document.createElement('option');
          opt.value = vm.vendor;
          opt.textContent = `${vm.vendor} (${vm.category || '기타'})`;
          group.appendChild(opt);
        }
      });
      if (group.children.length > 0) select.appendChild(group);
    }
  }

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

window.onSubOrderVendorChange = function(vendorName) {
  if (!vendorName) return;
  let target = window.SUB_ORDER_VENDORS.find(v => v.vendor === vendorName);
  if (!target && window.VENDOR_MASTER_DATA) {
    const vm = window.VENDOR_MASTER_DATA.find(v => v.vendor === vendorName);
    if (vm) {
      target = {
        vendor: vm.vendor,
        category: vm.category || '부재료',
        contactPerson: vm.contactPerson || '대표/담당자님',
        officePhone: vm.officePhone || '',
        fax: '',
        mobilePhone: vm.mobilePhone || '',
        email: vm.email || '',
        address: vm.addressRemarks || '',
        defaultRemarks: '검사성적서 동봉',
        frequentItems: []
      };
    }
  }

  if (!target) return;
  window.subOrderCurrentVendor = target;

  // Fill Receiver inputs
  const rComp = document.getElementById('subOrderRecvCompany');
  if (rComp) rComp.value = target.vendor;
  const rPerson = document.getElementById('subOrderRecvPerson');
  if (rPerson) rPerson.value = target.contactPerson;
  const rPhone = document.getElementById('subOrderRecvPhone');
  if (rPhone) rPhone.value = target.officePhone;
  const rFax = document.getElementById('subOrderRecvFax');
  if (rFax) rFax.value = target.fax || '';
  const rMobile = document.getElementById('subOrderRecvMobile');
  if (rMobile) rMobile.value = target.mobilePhone;
  const rEmail = document.getElementById('subOrderRecvEmail');
  if (rEmail) rEmail.value = target.email || '';

  // Render quick frequent items chips
  renderSubOrderQuickChips(target);

  // Initialize items with top 3 frequent items or empty row
  window.subOrderItems = [];
  if (target.frequentItems && target.frequentItems.length > 0) {
    const initialItems = target.frequentItems.slice(0, 2);
    initialItems.forEach(fi => {
      window.subOrderItems.push({
        name: fi.name,
        material: fi.material,
        spec: fi.spec,
        unit: fi.unit || 'EA',
        qty: 100,
        price: '',
        amount: '',
        remark: fi.remark || ''
      });
    });
  } else {
    window.subOrderItems.push({
      name: '부재료 품목',
      material: '',
      spec: '',
      unit: 'EA',
      qty: 1,
      price: '',
      amount: '',
      remark: ''
    });
  }

  renderSubOrderFormTable();
  updateSubOrderPreview();
};

window.renderSubOrderQuickChips = function(target) {
  const container = document.getElementById('subOrderQuickChips');
  if (!container) return;
  container.innerHTML = '';
  if (!target || !target.frequentItems || target.frequentItems.length === 0) {
    container.innerHTML = '<span style="font-size:0.78rem; color:#94a3b8;">추천 품목 없음</span>';
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
        price: '',
        amount: '',
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

  window.subOrderItems.forEach((row, idx) => {
    const tr = document.createElement('tr');
    tr.style.borderBottom = '1px solid var(--input-border, #cbd5e1)';
    tr.innerHTML = `
      <td style="text-align: center; font-weight: 700; color: var(--text-secondary, #64748b); width: 36px;">${idx + 1}</td>
      <td>
        <input type="text" value="${escapeHTML(row.name || '')}" oninput="onSubOrderItemFieldChange(${idx}, 'name', this.value)" style="width: 100%; padding: 5px 8px; font-size: 0.82rem; border: 1px solid var(--input-border, #cbd5e1); border-radius: 4px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a);" placeholder="품명 (예: PLAIN WASHER)">
      </td>
      <td style="width: 95px;">
        <input type="text" value="${escapeHTML(row.material || '')}" oninput="onSubOrderItemFieldChange(${idx}, 'material', this.value)" style="width: 100%; padding: 5px 8px; font-size: 0.82rem; border: 1px solid var(--input-border, #cbd5e1); border-radius: 4px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a);" placeholder="재질 (F436M)">
      </td>
      <td style="width: 105px;">
        <input type="text" value="${escapeHTML(row.spec || '')}" oninput="onSubOrderItemFieldChange(${idx}, 'spec', this.value)" style="width: 100%; padding: 5px 8px; font-size: 0.82rem; border: 1px solid var(--input-border, #cbd5e1); border-radius: 4px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a);" placeholder="규격 (M42)">
      </td>
      <td style="width: 45px;">
        <input type="text" value="${escapeHTML(row.unit || 'EA')}" oninput="onSubOrderItemFieldChange(${idx}, 'unit', this.value)" style="width: 100%; padding: 5px 4px; font-size: 0.82rem; text-align: center; border: 1px solid var(--input-border, #cbd5e1); border-radius: 4px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a);">
      </td>
      <td style="width: 70px;">
        <input type="number" value="${row.qty || ''}" oninput="onSubOrderItemFieldChange(${idx}, 'qty', this.value)" style="width: 100%; padding: 5px 6px; font-size: 0.82rem; text-align: right; border: 1px solid var(--input-border, #cbd5e1); border-radius: 4px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a);" placeholder="수량">
      </td>
      <td style="width: 95px;">
        <input type="text" value="${escapeHTML(row.remark || '')}" oninput="onSubOrderItemFieldChange(${idx}, 'remark', this.value)" style="width: 100%; padding: 5px 8px; font-size: 0.82rem; border: 1px solid var(--input-border, #cbd5e1); border-radius: 4px; background: var(--input-bg, #ffffff); color: var(--text-primary, #0f172a);" placeholder="비고 (용융도금 등)">
      </td>
      <td style="text-align: center; width: 36px;">
        <button type="button" class="btn btn-sm" onclick="removeSubOrderItem(${idx})" style="background: rgba(239, 68, 68, 0.12); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.3); padding: 2px 6px; border-radius: 4px;" title="품목 삭제">✕</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
};

window.addSubOrderItem = function(data) {
  const item = data || {
    name: '',
    material: '',
    spec: '',
    unit: 'EA',
    qty: 100,
    remark: ''
  };
  window.subOrderItems.push(item);
  renderSubOrderFormTable();
  updateSubOrderPreview();
};

window.removeSubOrderItem = function(idx) {
  if (window.subOrderItems.length <= 1) {
    if (typeof showToast === 'function') showToast('발주서에는 최소 1개 이상의 품목이 필요합니다.', 'warning');
    return;
  }
  window.subOrderItems.splice(idx, 1);
  renderSubOrderFormTable();
  updateSubOrderPreview();
};

window.onSubOrderItemFieldChange = function(idx, field, value) {
  if (!window.subOrderItems[idx]) return;
  window.subOrderItems[idx][field] = value;
  updateSubOrderPreview();
};

window.updateSubOrderPreview = function() {
  const paper = document.getElementById('subOrderPaperPreview');
  if (!paper) return;

  const poNo = (document.getElementById('subOrderPoNo') || {}).value || 'PC2611-0001';
  const poDate = (document.getElementById('subOrderDate') || {}).value || '';
  const poDueDate = (document.getElementById('subOrderDueDate') || {}).value || '';
  const deliveryLoc = (document.getElementById('subOrderDeliveryLoc') || {}).value || '본사 출하반';
  const termsNotes = (document.getElementById('subOrderTermsNotes') || {}).value || '1. 납기 준수 요망  2. 검사성적서 및 밀시트 동봉 요망  3. 불량 발생 시 즉시 통보 요망';

  const rComp = (document.getElementById('subOrderRecvCompany') || {}).value || '(주)공급업체';
  const rPerson = (document.getElementById('subOrderRecvPerson') || {}).value || '대표/담당자님';
  const rPhone = (document.getElementById('subOrderRecvPhone') || {}).value || '';
  const rFax = (document.getElementById('subOrderRecvFax') || {}).value || '';
  const rMobile = (document.getElementById('subOrderRecvMobile') || {}).value || '';

  const sComp = (document.getElementById('subOrderSenderCompany') || {}).value || '(주)에스앤더블류';
  const sMgr = (document.getElementById('subOrderSenderManager') || {}).value || '김태훈 주임';
  const sPhone = (document.getElementById('subOrderSenderPhone') || {}).value || '051-209-2229';
  const sFax = (document.getElementById('subOrderSenderFax') || {}).value || '051-205-7417';
  const sMobile = (document.getElementById('subOrderSenderMobile') || {}).value || '010-6645-9311';

  let totalQty = 0;

  let tableRowsHtml = '';
  window.subOrderItems.forEach((row, idx) => {
    const q = parseFloat(row.qty) || 0;
    if (q > 0) totalQty += q;

    tableRowsHtml += `
      <tr style="height: 27px; border-bottom: 1px solid #000;">
        <td style="text-align: center; border-right: 1px solid #000; font-size: 0.85rem; padding: 2px 4px;">${idx + 1}</td>
        <td style="padding: 2px 8px; font-weight: 700; border-right: 1px solid #000; font-size: 0.85rem; color: #000;">${escapeHTML(row.name || '')}</td>
        <td style="padding: 2px 6px; text-align: center; border-right: 1px solid #000; font-size: 0.85rem; color: #000;">${escapeHTML(row.material || '')}</td>
        <td style="padding: 2px 8px; border-right: 1px solid #000; font-size: 0.85rem; color: #000;">${escapeHTML(row.spec || '')}</td>
        <td style="text-align: center; border-right: 1px solid #000; font-size: 0.85rem; padding: 2px 4px;">${escapeHTML(row.unit || 'EA')}</td>
        <td style="text-align: right; padding: 2px 8px; border-right: 1px solid #000; font-size: 0.85rem; font-weight: 700; color: #000;">${q > 0 ? q.toLocaleString() : ''}</td>
        <td style="padding: 2px 8px; font-size: 0.82rem; color: #000;">${escapeHTML(row.remark || '')}</td>
      </tr>
    `;
  });

  // Pad to 16 rows to match the exact authentic SNW PO layout
  const targetRowCount = Math.max(16, window.subOrderItems.length);
  for (let i = window.subOrderItems.length; i < targetRowCount; i++) {
    tableRowsHtml += `
      <tr style="height: 27px; border-bottom: 1px solid #000;">
        <td style="text-align: center; border-right: 1px solid #000; color: #64748b; font-size: 0.8rem; padding: 2px 4px;">${i + 1}</td>
        <td style="border-right: 1px solid #000;">&nbsp;</td>
        <td style="border-right: 1px solid #000;">&nbsp;</td>
        <td style="border-right: 1px solid #000;">&nbsp;</td>
        <td style="border-right: 1px solid #000;">&nbsp;</td>
        <td style="border-right: 1px solid #000;">&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
    `;
  }

  paper.innerHTML = `
    <!-- Top Header -->
    <div style="text-align: center; margin-bottom: 14px;">
      <h1 style="font-size: 26pt; font-weight: 800; letter-spacing: 16px; margin: 0 0 8px 0; color: #000000; font-family: 'Malgun Gothic', '맑은 고딕', sans-serif;">&lt; &nbsp;발 &nbsp;주 &nbsp;서 &nbsp;&gt;</h1>
      <div style="display: flex; justify-content: space-between; align-items: flex-end; font-size: 9.5pt; color: #000000; margin-top: 6px; padding: 0 4px;">
        <span><strong>발주번호 :</strong> <span style="font-family: monospace; font-weight: 700; letter-spacing: 0.5px;">${escapeHTML(poNo)}</span></span>
        <span><strong>일 &nbsp; &nbsp;자 :</strong> <span style="font-weight: 700;">${escapeHTML(poDate)}</span></span>
      </div>
    </div>

    <!-- Double Box Table (수신 & 발신) -->
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 12px; font-size: 8.8pt;">
      <!-- 수신處 Box -->
      <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000;">
        <tr>
          <th rowspan="5" style="width: 28px; background: #f8fafc; border: 1px solid #000; writing-mode: vertical-rl; text-orientation: upright; font-weight: 800; color: #000; letter-spacing: 6px; padding: 6px 0; text-align: center;">수신</th>
          <th style="width: 55px; background: #f1f5f9; border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: 600;">상 호</th>
          <td style="border: 1px solid #000; padding: 4px 8px; font-weight: 700; color: #000; font-size: 0.95rem;">${escapeHTML(rComp)}</td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: 600;">전 화</th>
          <td style="border: 1px solid #000; padding: 4px 8px;">${escapeHTML(rPhone)}</td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: 600;">FAX</th>
          <td style="border: 1px solid #000; padding: 4px 8px;">${escapeHTML(rFax || '-')}</td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: 600;">담당자</th>
          <td style="border: 1px solid #000; padding: 4px 8px; font-weight: 600; color: #000;">${escapeHTML(rPerson)}</td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: 600;">H.P.</th>
          <td style="border: 1px solid #000; padding: 4px 8px; font-weight: 600; color: #1e40af;">${escapeHTML(rMobile || '-')}</td>
        </tr>
      </table>

      <!-- 발신處 Box -->
      <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000;">
        <tr>
          <th rowspan="5" style="width: 28px; background: #f8fafc; border: 1px solid #000; writing-mode: vertical-rl; text-orientation: upright; font-weight: 800; color: #000; letter-spacing: 6px; padding: 6px 0; text-align: center;">발신</th>
          <th style="width: 55px; background: #f1f5f9; border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: 600;">상 호</th>
          <td style="border: 1px solid #000; padding: 4px 8px; font-weight: 700; color: #000; font-size: 0.95rem;">${escapeHTML(sComp)}</td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: 600;">전 화</th>
          <td style="border: 1px solid #000; padding: 4px 8px;">${escapeHTML(sPhone)}</td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: 600;">FAX</th>
          <td style="border: 1px solid #000; padding: 4px 8px;">${escapeHTML(sFax)}</td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: 600;">담당자</th>
          <td style="border: 1px solid #000; padding: 4px 8px; font-weight: 600; color: #000;">${escapeHTML(sMgr)}</td>
        </tr>
        <tr>
          <th style="background: #f1f5f9; border: 1px solid #000; padding: 4px 6px; text-align: center; font-weight: 600;">H.P.</th>
          <td style="border: 1px solid #000; padding: 4px 8px; font-weight: 600; color: #1e40af;">${escapeHTML(sMobile)}</td>
        </tr>
      </table>
    </div>

    <!-- Main Items Grid (7 Columns) -->
    <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; font-size: 8.8pt;">
      <thead>
        <tr style="background: #e2e8f0; height: 30px; border-bottom: 1.5px solid #000;">
          <th style="width: 38px; border: 1px solid #000; text-align: center;">순</th>
          <th style="border: 1px solid #000; text-align: center;">품 명</th>
          <th style="width: 110px; border: 1px solid #000; text-align: center;">재 질</th>
          <th style="width: 180px; border: 1px solid #000; text-align: center;">규 격</th>
          <th style="width: 45px; border: 1px solid #000; text-align: center;">단위</th>
          <th style="width: 70px; border: 1px solid #000; text-align: center;">수 량</th>
          <th style="width: 120px; border: 1px solid #000; text-align: center;">비 고</th>
        </tr>
      </thead>
      <tbody>
        ${tableRowsHtml}
      </tbody>
      <tfoot>
        <tr style="background: #f1f5f9; height: 30px; font-weight: 700; border-top: 1.5px solid #000;">
          <td colspan="5" style="border: 1px solid #000; text-align: center; letter-spacing: 10px; font-weight: 800;">합 &nbsp; &nbsp;계</td>
          <td style="border: 1px solid #000; text-align: right; padding: 4px 8px; color: #000; font-weight: 800;">${totalQty.toLocaleString()}</td>
          <td style="border: 1px solid #000;">&nbsp;</td>
        </tr>
      </tfoot>
    </table>

    <!-- 참고사항 Box -->
    <table style="width: 100%; border-collapse: collapse; border: 1.5px solid #000; margin-top: 10px; font-size: 8.8pt;">
      <tr>
        <th style="width: 28px; background: #f8fafc; border-right: 1px solid #000; writing-mode: vertical-rl; text-orientation: upright; font-weight: 800; color: #000; letter-spacing: 4px; padding: 8px 0; text-align: center; vertical-align: middle;">참고사항</th>
        <td style="padding: 8px 12px; line-height: 1.8; vertical-align: middle;">
          <div><strong>* 입고요청일 :</strong> <span style="font-weight: 700; color: #dc2626;">${escapeHTML(poDueDate ? poDueDate + '까지 입고요청합니다.' : '협의 후 납품')}</span></div>
          <div><strong>* 납품장소 :</strong> <span style="font-weight: 600;">${escapeHTML(deliveryLoc || '본사 출하반')}</span></div>
          ${termsNotes ? `<div><strong>* 특기사항 :</strong> ${escapeHTML(termsNotes).replace(/\n/g, '<br>')}</div>` : ''}
        </td>
      </tr>
    </table>

    <!-- Official Signature Line -->
    <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-top: 12px; font-size: 8.5pt;">
      <div style="color: #64748b;">
        * 본 발주서는 (주)에스앤더블류 구매부 전산 시스템에서 전자적으로 발행되었습니다.
      </div>
      <div style="font-size: 11pt; font-weight: 800; color: #000000; letter-spacing: 2px;">
        (주)에스앤더블류 대표이사 <span style="font-size: 8.5pt; font-weight: 700; color: #dc2626; border: 1.5px solid #dc2626; padding: 2px 5px; border-radius: 3px; margin-left: 6px;">직인생략</span>
      </div>
    </div>
  `;
};

window.printSubOrder = function() {
  const paper = document.getElementById('subOrderPaperPreview');
  if (!paper) return;

  try {
    const printWin = window.open('', '_blank', 'width=900,height=1000');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(`<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <title>발주서 - (주)에스앤더블류</title>
  <style>
    @page {
      size: A4 portrait;
      margin: 12mm 14mm 10mm 14mm;
    }
    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: 'Malgun Gothic', '맑은 고딕', Dotum, sans-serif;
      background: #ffffff;
      color: #000000;
    }
    .no-print-bar {
      margin-bottom: 12px;
      padding: 8px 14px;
      background: #eff6ff;
      border: 1px solid #bfdbfe;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    @media print {
      .no-print-bar { display: none !important; }
      body { margin: 0; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="no-print-bar">
    <span style="font-size: 13px; font-weight: 600; color: #1e3a8a;">📄 발주서 인쇄 미리보기</span>
    <button onclick="window.print()" style="padding: 6px 18px; background: #2563eb; color: #fff; border: none; border-radius: 4px; font-weight: 700; cursor: pointer; font-size: 13px;">🖨️ 인쇄 / PDF 저장</button>
  </div>
  ${paper.innerHTML}
</body>
</html>`);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        try { printWin.print(); } catch(e) {}
      }, 350);
      return;
    }
  } catch (err) {
    console.warn('Popup print blocked, falling back to direct window.print:', err);
  }

  // Fallback to direct print
  document.body.classList.add('printing-suborder');
  window.print();
  setTimeout(() => {
    document.body.classList.remove('printing-suborder');
  }, 1000);
};

window.downloadSubOrderExcel = function() {
  const poNo = (document.getElementById('subOrderPoNo') || {}).value || 'PC2611-0001';
  const rComp = (document.getElementById('subOrderRecvCompany') || {}).value || '공급업체';
  const poDate = (document.getElementById('subOrderDate') || {}).value || '';
  const poDueDate = (document.getElementById('subOrderDueDate') || {}).value || '';
  const deliveryLoc = (document.getElementById('subOrderDeliveryLoc') || {}).value || '본사 출하반';
  const termsNotes = (document.getElementById('subOrderTermsNotes') || {}).value || '';

  const rPerson = (document.getElementById('subOrderRecvPerson') || {}).value || '';
  const rPhone = (document.getElementById('subOrderRecvPhone') || {}).value || '';
  const rFax = (document.getElementById('subOrderRecvFax') || {}).value || '';
  const rMobile = (document.getElementById('subOrderRecvMobile') || {}).value || '';

  const sComp = (document.getElementById('subOrderSenderCompany') || {}).value || '(주)에스앤더블류';
  const sMgr = (document.getElementById('subOrderSenderManager') || {}).value || '김태훈 주임';
  const sPhone = (document.getElementById('subOrderSenderPhone') || {}).value || '051-209-2229';
  const sFax = (document.getElementById('subOrderSenderFax') || {}).value || '051-205-7417';
  const sMobile = (document.getElementById('subOrderSenderMobile') || {}).value || '010-6645-9311';

  let rowsXml = '';
  let totalQty = 0;

  window.subOrderItems.forEach((row, idx) => {
    const q = parseFloat(row.qty) || 0;
    totalQty += q;

    rowsXml += `
      <tr style="height:25px;">
        <td style="border:1px solid #000; text-align:center;">${idx + 1}</td>
        <td style="border:1px solid #000; font-weight:bold;">${escapeHTML(row.name || '')}</td>
        <td style="border:1px solid #000; text-align:center;">${escapeHTML(row.material || '')}</td>
        <td style="border:1px solid #000;">${escapeHTML(row.spec || '')}</td>
        <td style="border:1px solid #000; text-align:center;">${escapeHTML(row.unit || 'EA')}</td>
        <td style="border:1px solid #000; text-align:right;">${q > 0 ? q : ''}</td>
        <td style="border:1px solid #000;">${escapeHTML(row.remark || '')}</td>
      </tr>
    `;
  });

  // Pad to 16 rows to match company Excel standard
  const targetRows = Math.max(16, window.subOrderItems.length);
  for (let i = window.subOrderItems.length; i < targetRows; i++) {
    rowsXml += `
      <tr style="height:25px;">
        <td style="border:1px solid #000; text-align:center;">${i + 1}</td>
        <td style="border:1px solid #000;"></td>
        <td style="border:1px solid #000;"></td>
        <td style="border:1px solid #000;"></td>
        <td style="border:1px solid #000;"></td>
        <td style="border:1px solid #000;"></td>
        <td style="border:1px solid #000;"></td>
      </tr>
    `;
  }

  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
      <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>발주서</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
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
          <td style="border:1px solid #000; text-align:right;">${totalQty.toLocaleString()}</td>
          <td style="border:1px solid #000;"></td>
        </tr>
        <tr><td colspan="7" style="height:6px;"></td></tr>
        <tr>
          <th style="border:1px solid #000; background:#eee; text-align:center; vertical-align:middle;">참<br><br>고<br><br>사<br><br>항</th>
          <td colspan="6" style="border:1px solid #000; padding:8px; line-height:1.6;">
            * 입고요청일 : ${escapeHTML(poDueDate ? poDueDate + '까지 입고요청합니다.' : '협의 후 납품')}<br>
            * 납품장소 : ${escapeHTML(deliveryLoc || '본사 출하반')}<br>
            ${termsNotes ? '* 특기사항 : ' + escapeHTML(termsNotes).replace(/\n/g, '<br>') : ''}
          </td>
        </tr>
        <tr><td colspan="7" style="height:10px;"></td></tr>
        <tr>
          <td colspan="7" style="text-align:right; font-size:12pt; font-weight:bold;">(주)에스앤더블류 대표이사 [직인생략]</td>
        </tr>
      </table>
    </body>
    </html>
  `;

  const blob = new Blob(['\uFEFF' + html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `발주서_${rComp}_${poNo}_${poDate}.xls`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  if (typeof showToast === 'function') showToast(`'${a.download}' 엑셀 파일이 다운로드되었습니다.`, 'success');
};


window.copySubOrderText = function() {
  const poNo = (document.getElementById('subOrderPoNo') || {}).value || '';
  const rComp = (document.getElementById('subOrderRecvCompany') || {}).value || '';
  const poDate = (document.getElementById('subOrderDate') || {}).value || '';
  const poDueDate = (document.getElementById('subOrderDueDate') || {}).value || '';
  const deliveryLoc = (document.getElementById('subOrderDeliveryLoc') || {}).value || '본사 출하반';

  let text = `[ (주)에스앤더블류 부재료 발주서 ]\n`;
  text += `* 발주번호: ${poNo}\n`;
  text += `* 수신업체: ${rComp}\n`;
  text += `* 발주일자: ${poDate} (납기: ${poDueDate})\n`;
  text += `* 납품장소: ${deliveryLoc}\n`;
  text += `-----------------------------------------\n`;
  text += `순번 | 품명 | 재질 | 규격 | 수량 | 비고\n`;

  window.subOrderItems.forEach((row, idx) => {
    text += `${idx + 1}. ${row.name || '-'} | ${row.material || '-'} | ${row.spec || '-'} | ${row.qty || 0}${row.unit || 'EA'} | ${row.remark || '-'}\n`;
  });
  text += `-----------------------------------------\n`;
  text += `* 발신: (주)에스앤더블류 구매부 김태훈 주임 (010-6645-9311 / 051-209-2229)`;

  navigator.clipboard.writeText(text).then(() => {
    if (typeof showToast === 'function') showToast('발주서 텍스트가 클립보드에 복사되었습니다. (메신저/카톡 붙여넣기 가능)', 'success');
  }).catch(() => {
    prompt('발주서 텍스트 복사 (Ctrl+C):', text);
  });
};

window.openSubOrderEmail = function() {
  const rComp = (document.getElementById('subOrderRecvCompany') || {}).value || '';
  const rEmail = (document.getElementById('subOrderRecvEmail') || {}).value || '';
  const poNo = (document.getElementById('subOrderPoNo') || {}).value || '';
  const poDate = (document.getElementById('subOrderDate') || {}).value || '';

  const subject = encodeURIComponent(`[(주)에스앤더블류 발주서] ${rComp} 귀하 (${poNo})`);
  let bodyText = `안녕하세요, ${rComp} 담당자님.\n(주)에스앤더블류 구매부 김태훈 주임입니다.\n\n요청드린 부재료 발주서를 송부드리오니 확인 후 납기 일정에 맞추어 공급 부탁드립니다.\n\n- 발주번호: ${poNo}\n- 발주일자: ${poDate}\n\n감사합니다.\n\n(주)에스앤더블류 구매부 김태훈 주임 드림\nTEL: 051-209-2229 | H.P: 010-6645-9311`;
  const body = encodeURIComponent(bodyText);

  window.location.href = `mailto:${rEmail}?subject=${subject}&body=${body}`;
};

window.saveSubOrderToHistory = function() {
  const poNo = (document.getElementById('subOrderPoNo') || {}).value || '';
  const rComp = (document.getElementById('subOrderRecvCompany') || {}).value || '';
  const poDate = (document.getElementById('subOrderDate') || {}).value || '';

  if (!poNo || !rComp) {
    if (typeof showToast === 'function') showToast('발주번호와 거래처명을 입력해 주세요.', 'warning');
    return;
  }

  const record = {
    id: 'PO_' + Date.now(),
    poNo: poNo,
    vendor: rComp,
    date: poDate,
    dueDate: (document.getElementById('subOrderDueDate') || {}).value || '',
    deliveryLoc: (document.getElementById('subOrderDeliveryLoc') || {}).value || '',
    termsNotes: (document.getElementById('subOrderTermsNotes') || {}).value || '',
    recv: {
      person: (document.getElementById('subOrderRecvPerson') || {}).value || '',
      phone: (document.getElementById('subOrderRecvPhone') || {}).value || '',
      fax: (document.getElementById('subOrderRecvFax') || {}).value || '',
      mobile: (document.getElementById('subOrderRecvMobile') || {}).value || '',
      email: (document.getElementById('subOrderRecvEmail') || {}).value || ''
    },
    items: JSON.parse(JSON.stringify(window.subOrderItems)),
    savedAt: new Date().toISOString()
  };

  try {
    const raw = localStorage.getItem('snw_sub_orders_history') || '[]';
    const history = JSON.parse(raw);
    history.unshift(record);
    // Keep last 50
    if (history.length > 50) history.pop();
    localStorage.setItem('snw_sub_orders_history', JSON.stringify(history));
    if (typeof showToast === 'function') showToast(`발주서 [${poNo}] 저장이 완료되었습니다.`, 'success');
  } catch (e) {
    console.error('Save sub order history failed:', e);
  }
};

window.showSubOrderHistoryModal = function() {
  let history = [];
  try {
    history = JSON.parse(localStorage.getItem('snw_sub_orders_history') || '[]');
  } catch (e) {}

  const modal = document.getElementById('subOrderHistoryModal');
  const body = document.getElementById('subOrderHistoryModalBody');
  if (!modal || !body) return;

  if (history.length === 0) {
    body.innerHTML = '<div style="text-align: center; padding: 40px; color: #94a3b8;">저장된 과거 발주서 내역이 없습니다.</div>';
  } else {
    let rowsHtml = '';
    history.forEach(h => {
      const itemCount = (h.items || []).length;
      const totalQty = (h.items || []).reduce((acc, cur) => acc + (parseFloat(cur.qty) || 0), 0);
      rowsHtml += `
        <tr style="border-bottom: 1px solid var(--border-color, #334155);">
          <td style="padding: 8px 10px; font-weight: 700; color: #3b82f6;">${escapeHTML(h.poNo)}</td>
          <td style="padding: 8px 10px; font-weight: 700; color: var(--text-primary);">${escapeHTML(h.vendor)}</td>
          <td style="padding: 8px 10px; text-align: center;">${escapeHTML(h.date)}</td>
          <td style="padding: 8px 10px; text-align: center;">${itemCount}종 (${totalQty.toLocaleString()} EA)</td>
          <td style="padding: 8px 10px; text-align: center;">
            <button class="btn btn-sm btn-primary" onclick="loadSubOrderRecord('${h.id}')" style="padding: 3px 8px; font-size: 0.78rem;">불러오기</button>
            <button class="btn btn-sm btn-outline" onclick="deleteSubOrderRecord('${h.id}')" style="padding: 3px 6px; font-size: 0.78rem; color: #ef4444; border-color: rgba(239, 68, 68, 0.4); margin-left: 4px;">삭제</button>
          </td>
        </tr>
      `;
    });

    body.innerHTML = `
      <table style="width: 100%; border-collapse: collapse; font-size: 0.85rem;">
        <thead>
          <tr style="background: rgba(255, 255, 255, 0.05); border-bottom: 2px solid var(--border-color, #334155);">
            <th style="padding: 8px; text-align: left;">발주번호</th>
            <th style="padding: 8px; text-align: left;">거래처명</th>
            <th style="padding: 8px; text-align: center;">발주일자</th>
            <th style="padding: 8px; text-align: center;">수량 및 품목</th>
            <th style="padding: 8px; text-align: center;">관리</th>
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

    if (document.getElementById('subOrderPoNo')) document.getElementById('subOrderPoNo').value = record.poNo;
    if (document.getElementById('subOrderDate')) document.getElementById('subOrderDate').value = record.date;
    if (document.getElementById('subOrderDueDate')) document.getElementById('subOrderDueDate').value = record.dueDate || '';
    if (document.getElementById('subOrderDeliveryLoc')) document.getElementById('subOrderDeliveryLoc').value = record.deliveryLoc || '';
    if (document.getElementById('subOrderTermsNotes')) document.getElementById('subOrderTermsNotes').value = record.termsNotes || '';

    if (document.getElementById('subOrderRecvCompany')) document.getElementById('subOrderRecvCompany').value = record.vendor;
    if (document.getElementById('subOrderRecvPerson')) document.getElementById('subOrderRecvPerson').value = (record.recv && record.recv.person) || '';
    if (document.getElementById('subOrderRecvPhone')) document.getElementById('subOrderRecvPhone').value = (record.recv && record.recv.phone) || '';
    if (document.getElementById('subOrderRecvFax')) document.getElementById('subOrderRecvFax').value = (record.recv && record.recv.fax) || '';
    if (document.getElementById('subOrderRecvMobile')) document.getElementById('subOrderRecvMobile').value = (record.recv && record.recv.mobile) || '';
    if (document.getElementById('subOrderRecvEmail')) document.getElementById('subOrderRecvEmail').value = (record.recv && record.recv.email) || '';

    window.subOrderItems = record.items || [];
    renderSubOrderFormTable();
    updateSubOrderPreview();
    closeSubOrderHistoryModal();
    if (typeof showToast === 'function') showToast(`발주서 [${record.poNo}]를 성공적으로 불러왔습니다.`, 'success');
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
  if (!confirm('발주서 작성 내용을 초기화하시겠습니까?')) return;
  const select = document.getElementById('subOrderVendorSelect');
  if (select && select.value) {
    onSubOrderVendorChange(select.value);
  }
};

// Auto-initialize Sub Order view when DOM is ready
if (typeof document !== 'undefined') {
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
