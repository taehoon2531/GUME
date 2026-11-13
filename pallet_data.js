// ============================================================================
// 나무 파렛트 및 박스 CBM 단가표 & 계산식 기준 데이터 (유성수출포장 / 천우수출포장)
// (주)에스앤더블류 구매부 소모품 관리 시스템
// ============================================================================

window.PALLET_PRICES_DATA = {
  // 1. CBM 단가표 (0.10 ~ 7.00 CBM)
  // 유성수출포장: 내수용 박스, 수출용 박스 (0.10 ~ 7.00 CBM)
  // 천우수출포장: 내수용 박스, 수출용 박스 (0.10 ~ 2.00 CBM)
  cbmRates: [
    {cbm: 0.10, yuseong_domestic: 28530, yuseong_export: 31390, cheonwoo_domestic: 30000, cheonwoo_export: 35000},
    {cbm: 0.11, yuseong_domestic: 30960, yuseong_export: 34060, cheonwoo_domestic: 30000, cheonwoo_export: 35000},
    {cbm: 0.12, yuseong_domestic: 33380, yuseong_export: 36720, cheonwoo_domestic: 30000, cheonwoo_export: 35000},
    {cbm: 0.13, yuseong_domestic: 35690, yuseong_export: 39260, cheonwoo_domestic: 30000, cheonwoo_export: 35000},
    {cbm: 0.14, yuseong_domestic: 37890, yuseong_export: 41680, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.15, yuseong_domestic: 40080, yuseong_export: 44090, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.16, yuseong_domestic: 42050, yuseong_export: 46260, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.17, yuseong_domestic: 44130, yuseong_export: 48550, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.18, yuseong_domestic: 46090, yuseong_export: 50700, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.19, yuseong_domestic: 47940, yuseong_export: 52740, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.20, yuseong_domestic: 49670, yuseong_export: 54640, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.21, yuseong_domestic: 51170, yuseong_export: 56290, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.22, yuseong_domestic: 52670, yuseong_export: 57940, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.23, yuseong_domestic: 54060, yuseong_export: 59470, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.24, yuseong_domestic: 55330, yuseong_export: 60870, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.25, yuseong_domestic: 56480, yuseong_export: 62130, cheonwoo_domestic: 35000, cheonwoo_export: 40000},
    {cbm: 0.26, yuseong_domestic: 57520, yuseong_export: 63280, cheonwoo_domestic: 50000, cheonwoo_export: 55000},
    {cbm: 0.27, yuseong_domestic: 58560, yuseong_export: 64420, cheonwoo_domestic: 50000, cheonwoo_export: 55000},
    {cbm: 0.28, yuseong_domestic: 59490, yuseong_export: 65440, cheonwoo_domestic: 50000, cheonwoo_export: 55000},
    {cbm: 0.29, yuseong_domestic: 60300, yuseong_export: 66330, cheonwoo_domestic: 50000, cheonwoo_export: 55000},
    {cbm: 0.30, yuseong_domestic: 60990, yuseong_export: 67090, cheonwoo_domestic: 50000, cheonwoo_export: 55000},
    {cbm: 0.31, yuseong_domestic: 62140, yuseong_export: 68360, cheonwoo_domestic: 50000, cheonwoo_export: 55000},
    {cbm: 0.32, yuseong_domestic: 63180, yuseong_export: 69500, cheonwoo_domestic: 50000, cheonwoo_export: 55000},
    {cbm: 0.33, yuseong_domestic: 64110, yuseong_export: 70530, cheonwoo_domestic: 50000, cheonwoo_export: 55000},
    {cbm: 0.34, yuseong_domestic: 65030, yuseong_export: 71540, cheonwoo_domestic: 50000, cheonwoo_export: 55000},
    {cbm: 0.35, yuseong_domestic: 65960, yuseong_export: 72560, cheonwoo_domestic: 50000, cheonwoo_export: 55000},
    {cbm: 0.36, yuseong_domestic: 66650, yuseong_export: 73320, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.37, yuseong_domestic: 67460, yuseong_export: 74210, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.38, yuseong_domestic: 68150, yuseong_export: 74970, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.39, yuseong_domestic: 68730, yuseong_export: 75610, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.40, yuseong_domestic: 69300, yuseong_export: 76230, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.41, yuseong_domestic: 70000, yuseong_export: 77000, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.42, yuseong_domestic: 70580, yuseong_export: 77640, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.43, yuseong_domestic: 71040, yuseong_export: 78150, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.44, yuseong_domestic: 71610, yuseong_export: 78780, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.45, yuseong_domestic: 71960, yuseong_export: 79160, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.46, yuseong_domestic: 72420, yuseong_export: 79670, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.47, yuseong_domestic: 72650, yuseong_export: 79920, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.48, yuseong_domestic: 73000, yuseong_export: 80300, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.49, yuseong_domestic: 73230, yuseong_export: 80560, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.50, yuseong_domestic: 73350, yuseong_export: 80690, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.51, yuseong_domestic: 73690, yuseong_export: 81060, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.52, yuseong_domestic: 73920, yuseong_export: 81320, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.53, yuseong_domestic: 74040, yuseong_export: 81450, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.54, yuseong_domestic: 74270, yuseong_export: 81700, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.55, yuseong_domestic: 74390, yuseong_export: 81830, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.56, yuseong_domestic: 74440, yuseong_export: 81890, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.57, yuseong_domestic: 74450, yuseong_export: 81900, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.58, yuseong_domestic: 74500, yuseong_export: 81950, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.59, yuseong_domestic: 74620, yuseong_export: 82090, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.60, yuseong_domestic: 74730, yuseong_export: 82210, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.61, yuseong_domestic: 74850, yuseong_export: 82340, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.62, yuseong_domestic: 75430, yuseong_export: 82980, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.63, yuseong_domestic: 76120, yuseong_export: 83740, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.64, yuseong_domestic: 76700, yuseong_export: 84370, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.65, yuseong_domestic: 77390, yuseong_export: 85130, cheonwoo_domestic: 60000, cheonwoo_export: 65000},
    {cbm: 0.66, yuseong_domestic: 77970, yuseong_export: 85770, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.67, yuseong_domestic: 78430, yuseong_export: 86280, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.68, yuseong_domestic: 79010, yuseong_export: 86920, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.69, yuseong_domestic: 79580, yuseong_export: 87540, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.70, yuseong_domestic: 80050, yuseong_export: 88060, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.71, yuseong_domestic: 80510, yuseong_export: 88570, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.72, yuseong_domestic: 80850, yuseong_export: 88940, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.73, yuseong_domestic: 81200, yuseong_export: 89320, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.74, yuseong_domestic: 81550, yuseong_export: 89710, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.75, yuseong_domestic: 81890, yuseong_export: 90080, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.76, yuseong_domestic: 82130, yuseong_export: 90350, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.77, yuseong_domestic: 82470, yuseong_export: 90720, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.78, yuseong_domestic: 82700, yuseong_export: 90970, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.79, yuseong_domestic: 82930, yuseong_export: 91230, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.80, yuseong_domestic: 83160, yuseong_export: 91480, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.81, yuseong_domestic: 83510, yuseong_export: 91870, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.82, yuseong_domestic: 83970, yuseong_export: 92370, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.83, yuseong_domestic: 84320, yuseong_export: 92760, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.84, yuseong_domestic: 84550, yuseong_export: 93010, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.85, yuseong_domestic: 84900, yuseong_export: 93390, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.86, yuseong_domestic: 85240, yuseong_export: 93770, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.87, yuseong_domestic: 85470, yuseong_export: 94020, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.88, yuseong_domestic: 85820, yuseong_export: 94410, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.89, yuseong_domestic: 86050, yuseong_export: 94660, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.90, yuseong_domestic: 86280, yuseong_export: 94910, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.91, yuseong_domestic: 86630, yuseong_export: 95300, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.92, yuseong_domestic: 86980, yuseong_export: 95680, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.93, yuseong_domestic: 87210, yuseong_export: 95940, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.94, yuseong_domestic: 87550, yuseong_export: 96310, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.95, yuseong_domestic: 87780, yuseong_export: 96560, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.96, yuseong_domestic: 88020, yuseong_export: 96830, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.97, yuseong_domestic: 88250, yuseong_export: 97080, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.98, yuseong_domestic: 88480, yuseong_export: 97330, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 0.99, yuseong_domestic: 88710, yuseong_export: 97590, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 1.00, yuseong_domestic: 88940, yuseong_export: 97840, cheonwoo_domestic: 70000, cheonwoo_export: 75000},
    {cbm: 1.10, yuseong_domestic: 96790, yuseong_export: 106470, cheonwoo_domestic: 90000, cheonwoo_export: 95000},
    {cbm: 1.20, yuseong_domestic: 104530, yuseong_export: 114990, cheonwoo_domestic: 90000, cheonwoo_export: 95000},
    {cbm: 1.30, yuseong_domestic: 112040, yuseong_export: 123250, cheonwoo_domestic: 90000, cheonwoo_export: 95000},
    {cbm: 1.40, yuseong_domestic: 119320, yuseong_export: 131260, cheonwoo_domestic: 90000, cheonwoo_export: 95000},
    {cbm: 1.50, yuseong_domestic: 126480, yuseong_export: 139130, cheonwoo_domestic: 90000, cheonwoo_export: 95000},
    {cbm: 1.60, yuseong_domestic: 134220, yuseong_export: 147650, cheonwoo_domestic: 90000, cheonwoo_export: 95000},
    {cbm: 1.70, yuseong_domestic: 141720, yuseong_export: 155900, cheonwoo_domestic: 90000, cheonwoo_export: 95000},
    {cbm: 1.80, yuseong_domestic: 149230, yuseong_export: 164160, cheonwoo_domestic: 90000, cheonwoo_export: 95000},
    {cbm: 1.90, yuseong_domestic: 156740, yuseong_export: 172420, cheonwoo_domestic: 90000, cheonwoo_export: 95000},
    {cbm: 2.00, yuseong_domestic: 164010, yuseong_export: 180420, cheonwoo_domestic: 90000, cheonwoo_export: 95000},
    {cbm: 2.10, yuseong_domestic: 170710, yuseong_export: 187790, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 2.20, yuseong_domestic: 177410, yuseong_export: 195160, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 2.30, yuseong_domestic: 183880, yuseong_export: 202270, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 2.40, yuseong_domestic: 190120, yuseong_export: 209140, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 2.50, yuseong_domestic: 196350, yuseong_export: 215990, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 2.60, yuseong_domestic: 203050, yuseong_export: 223360, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 2.70, yuseong_domestic: 209520, yuseong_export: 230480, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 2.80, yuseong_domestic: 215990, yuseong_export: 237590, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 2.90, yuseong_domestic: 222460, yuseong_export: 244710, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 3.00, yuseong_domestic: 228690, yuseong_export: 251560, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 3.10, yuseong_domestic: 234930, yuseong_export: 258430, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 3.20, yuseong_domestic: 240940, yuseong_export: 265040, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 3.30, yuseong_domestic: 246940, yuseong_export: 271640, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 3.40, yuseong_domestic: 252950, yuseong_export: 278250, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 3.50, yuseong_domestic: 258720, yuseong_export: 284600, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 3.60, yuseong_domestic: 262770, yuseong_export: 289050, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 3.70, yuseong_domestic: 266690, yuseong_export: 293360, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 3.80, yuseong_domestic: 270390, yuseong_export: 297430, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 3.90, yuseong_domestic: 273860, yuseong_export: 301250, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 4.00, yuseong_domestic: 277200, yuseong_export: 304920, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 4.10, yuseong_domestic: 281250, yuseong_export: 309380, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 4.20, yuseong_domestic: 285290, yuseong_export: 313820, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 4.30, yuseong_domestic: 289100, yuseong_export: 318010, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 4.40, yuseong_domestic: 292680, yuseong_export: 321950, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 4.50, yuseong_domestic: 296260, yuseong_export: 325890, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 4.60, yuseong_domestic: 299610, yuseong_export: 329580, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 4.70, yuseong_domestic: 302960, yuseong_export: 333260, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 4.80, yuseong_domestic: 306080, yuseong_export: 336690, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 4.90, yuseong_domestic: 308970, yuseong_export: 339870, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 5.00, yuseong_domestic: 311850, yuseong_export: 343040, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 5.10, yuseong_domestic: 316360, yuseong_export: 348000, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 5.20, yuseong_domestic: 320750, yuseong_export: 352830, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 5.30, yuseong_domestic: 325020, yuseong_export: 357530, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 5.40, yuseong_domestic: 329300, yuseong_export: 362230, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 5.50, yuseong_domestic: 333570, yuseong_export: 366930, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 5.60, yuseong_domestic: 337610, yuseong_export: 371380, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 5.70, yuseong_domestic: 341650, yuseong_export: 375820, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 5.80, yuseong_domestic: 345700, yuseong_export: 380270, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 5.90, yuseong_domestic: 349620, yuseong_export: 384590, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 6.00, yuseong_domestic: 353430, yuseong_export: 388780, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 6.10, yuseong_domestic: 356550, yuseong_export: 392210, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 6.20, yuseong_domestic: 359440, yuseong_export: 395390, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 6.30, yuseong_domestic: 362330, yuseong_export: 398570, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 6.40, yuseong_domestic: 365220, yuseong_export: 401750, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 6.50, yuseong_domestic: 367870, yuseong_export: 404660, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 6.60, yuseong_domestic: 370530, yuseong_export: 407590, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 6.70, yuseong_domestic: 372950, yuseong_export: 410250, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 6.80, yuseong_domestic: 375380, yuseong_export: 412920, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 6.90, yuseong_domestic: 377810, yuseong_export: 415600, cheonwoo_domestic: null, cheonwoo_export: null},
    {cbm: 7.00, yuseong_domestic: 380000, yuseong_export: 418000, cheonwoo_domestic: null, cheonwoo_export: null}
  ],

  // 2. 칸막이 합판 (합판 7T 및 공임비용 포함)
  partitionBoard: [
    {maxCount: 4, label: "4칸 이하", price: 4000},
    {maxCount: 8, label: "8칸 이하", price: 9000},
    {maxCount: 12, label: "12칸 이하", price: 24000},
    {maxCount: 18, label: "18칸 이하", price: 29000},
    {maxCount: 36, label: "36칸 이하", price: 39000},
    {maxCount: 50, label: "50칸 이하", price: 49000},
    {maxCount: 99999, label: "50칸 초과", price: 90000}
  ],

  // 3. 중 합판 (7T 기준) 공식 정보
  plywood7T: {
    standardWidth: 1220,
    standardLength: 2440,
    basePrice: 10000,
    calcPrice: function(width_mm, length_mm) {
      if (!width_mm || !length_mm) return 0;
      var w_m = width_mm / 1000;
      var l_m = length_mm / 1000;
      var x = (w_m * l_m * 10000) / 3;
      var rawPrice = x + 1000;
      // 10원 단위 올림 (예: 1870 -> 1900)
      return Math.ceil(rawPrice / 10) * 10;
    }
  },

  // 4. 반체 규격 고정 단가
  halfBoxPrices: {
    "500*350*330": 28000,
    "700*520*300": 28000,
    "750*520*330": 30000
  },

  // 5. 할증 및 특이사항 옵션 목록
  surcharges: [
    {id: "man_heavy", label: "MAN 수출박스 중량포장 (1500×1500 이상 등)", surcharge: 4000, type: "flat"},
    {id: "cyl_core", label: "원통코어 박스 제작", surcharge: 15000, type: "flat"},
    {id: "fork_1side", label: "지게차 4M 작업 (가로 1면)", surcharge: 5000, type: "flat"},
    {id: "fork_2side", label: "지게차 4M 작업 (가로·세로 양면)", surcharge: 10000, type: "flat"},
    {id: "cart_cbm", label: "대차 포장 (CBM당 25,000원 적용)", surchargePerCbm: 25000, type: "cbm_rate"},
    {id: "steel_pallet_cbm", label: "철대 파렛트 (CBM당 22,000원 적용)", surchargePerCbm: 22000, type: "cbm_rate"},
    {id: "custom_rate_19", label: "특이 각재/팔레트 충전단가 19% 인상 적용", ratePercent: 19, type: "percent"}
  ],

  // 6. CBM 및 단가 산출 헬퍼 함수
  calculateCBM: function(width_mm, length_mm, height_mm, marginW, marginL, marginH) {
    var mW = (marginW !== undefined) ? marginW : 100;
    var mL = (marginL !== undefined) ? marginL : 100;
    var mH = (marginH !== undefined) ? marginH : 220;

    var w = (Number(width_mm) + mW) / 1000;
    var l = (Number(length_mm) + mL) / 1000;
    var h = (Number(height_mm) + mH) / 1000;

    var raw = w * l * h;
    if (isNaN(raw) || raw <= 0) return 0.10;

    var minVal = Math.max(raw, 0.10);
    if (minVal > 1.0) {
      return Number(minVal.toFixed(1));
    } else {
      return Number(minVal.toFixed(2));
    }
  },

  // CBM 값으로 가장 가까운 테이블 행 찾기
  lookupRate: function(targetCbm) {
    if (!targetCbm || isNaN(targetCbm)) targetCbm = 0.10;
    var rounded = (targetCbm > 1.0) ? Number(targetCbm.toFixed(1)) : Number(targetCbm.toFixed(2));
    if (rounded < 0.10) rounded = 0.10;
    if (rounded > 7.00) rounded = 7.00;

    // 정확한 일치 검색
    for (var i = 0; i < this.cbmRates.length; i++) {
      if (Math.abs(this.cbmRates[i].cbm - rounded) < 0.005) {
        return this.cbmRates[i];
      }
    }
    // 없으면 가장 근접한 행 검색
    var closest = this.cbmRates[0];
    var minDiff = Math.abs(closest.cbm - rounded);
    for (var j = 1; j < this.cbmRates.length; j++) {
      var diff = Math.abs(this.cbmRates[j].cbm - rounded);
      if (diff < minDiff) {
        minDiff = diff;
        closest = this.cbmRates[j];
      }
    }
    return closest;
  }
};
