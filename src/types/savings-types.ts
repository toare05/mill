// ===== 장병내일준비적금 관련 타입 =====

// 장병내일준비적금 계산 필요한 타입 정의
export interface SavingsInputData {
  monthlySavings: number;          // 월 납입액
  serviceMonths: number;           // 복무 개월 수
  interestRate: number;            // 총 금리 (기본금리+우대금리)
  governmentMatch: boolean;        // 정부 매칭 지원금
  isYear2025: boolean;             // 2025년 이후 납입 여부 (한도 55만원)
  militaryRank?: string;           // 군 계급 (선택사항)
  monthlySavings2024?: number;     // 2024년 월 납입액 (만원)
  monthlySavings2025?: number;     // 2025년 월 납입액 (만원)
}

// 계산 결과 내역 타입 정의
export interface CalculationBreakdown {
  totalDeposit: number;           // 총 납입액
  baseInterest: number;           // 기본 이자
  additionalInterest: number;     // 추가 이자
  governmentMatch: number;        // 정부 매칭 지원금
}

// 계산 결과 타입 정의
export interface CalculationResult {
  totalAmount: number;
  breakdown: CalculationBreakdown;
}

// 군 계급 타입
export type MilitaryRank = '이병' | '일병' | '상병' | '병장';

// 군 계급별 월급 정보 타입
export interface MilitarySalaryInfo {
  rank: MilitaryRank;
  monthlySalary: number;
  recommendedSavings: number;
} 