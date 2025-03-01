"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

// 은행별 금리 정보 타입 정의
interface BankInterestRate {
  bankName: string;         // 은행 이름
  baseRate: number;         // 기본 금리 (%)
  additionalRate: number;   // 우대 금리 (%)
  totalRate: number;        // 총 금리 (%)
  specialBenefits: string;  // 특별 혜택
  minDeposit?: number;      // 최소 납입액
  maxDeposit?: number;      // 최대 납입액 (별도 한도가 있는 경우)
  officialLink: string;     // 공식 웹사이트 링크
}

// 장병내일준비적금 계산 필요한 타입 정의
interface SavingsInputData {
  monthlySavings: number;          // 월 납입액
  serviceMonths: number;           // 복무 개월 수
  interestRate: number;            // 총 금리 (기본금리+우대금리)
  governmentMatch: boolean;        // 정부 매칭 지원금
  isYear2025: boolean;             // 2025년 이후 납입 여부 (한도 55만원)
  selectedBank: string;            // 선택한 은행
  militaryRank?: string;           // 군 계급 (선택사항)
  savingsRatio?: number;           // 월급 대비 저축 비율 (%)
  monthlySavings2024?: number;     // 2024년 월 납입액 (만원)
  monthlySavings2025?: number;     // 2025년 월 납입액 (만원)
  remainingSavingsRate: number;    // 월급 나머지 금액 저축 비율 (%)
}

// 계산 결과 내역 타입 정의
interface CalculationBreakdown {
  totalDeposit: number;           // 총 납입액
  baseInterest: number;           // 기본 이자
  additionalInterest: number;     // 추가 이자
  governmentMatch: number;        // 정부 매칭 지원금
}

// 군 계급별 월급 정보 (2024년 기준)
const militaryRanks2024 = [
  { rank: "이병", monthlySalary: 640000, recommendedSavings: 15 },
  { rank: "일병", monthlySalary: 800000, recommendedSavings: 20 },
  { rank: "상병", monthlySalary: 1000000, recommendedSavings: 25 },
  { rank: "병장", monthlySalary: 1250000, recommendedSavings: 30 }
];

// 군 계급별 월급 정보 (2025년 기준)
const militaryRanks2025 = [
  { rank: "이병", monthlySalary: 750000, recommendedSavings: 15 },
  { rank: "일병", monthlySalary: 900000, recommendedSavings: 20 },
  { rank: "상병", monthlySalary: 1200000, recommendedSavings: 25 },
  { rank: "병장", monthlySalary: 1500000, recommendedSavings: 35 }
];

// 기본 복무기간 및 계급 규정
const rankPeriods = {
  "육군/해병대": {
    total: 18,
    이병: 2,
    일병: 6,
    상병: 6,
    병장: 4
  },
  "해군": {
    total: 20,
    이병: 2,
    일병: 6,
    상병: 6,
    병장: 6
  },
  "공군": {
    total: 21,
    이병: 2,
    일병: 6,
    상병: 6,
    병장: 7
  }
};

// 입대월 옵션
const enlistmentMonthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: `${i + 1}`,
  label: `${i + 1}월`
}));

// 예시 데이터 - 은행별 금리 정보 (2024년 8월 기준, 뱅크샐러드 자료 참고)
const bankRates: BankInterestRate[] = [
  { 
    bankName: "국민은행", 
    baseRate: 5.0, 
    additionalRate: 1.0, 
    totalRate: 6.0,
    specialBenefits: "KB국민카드 연계 혜택",
    officialLink: "https://www.kbstar.com"
  },
  { 
    bankName: "우리은행", 
    baseRate: 5.1, 
    additionalRate: 1.0, 
    totalRate: 6.1,
    specialBenefits: "우리 WON 뱅킹 앱 가입시 우대",
    officialLink: "https://www.wooribank.com"
  },
  { 
    bankName: "하나은행", 
    baseRate: 5.2, 
    additionalRate: 0.9, 
    totalRate: 6.1,
    specialBenefits: "하나멤버스 포인트 적립 혜택",
    officialLink: "https://www.hanabank.com"
  },
  { 
    bankName: "신한은행", 
    baseRate: 5.3, 
    additionalRate: 0.8, 
    totalRate: 6.1,
    specialBenefits: "SOL 앱 가입 우대",
    officialLink: "https://www.shinhan.com"
  },
  { 
    bankName: "NH농협은행", 
    baseRate: 5.1, 
    additionalRate: 1.1, 
    totalRate: 6.2,
    specialBenefits: "NH앱 가입시 추가 우대금리",
    officialLink: "https://banking.nonghyup.com"
  },
  { 
    bankName: "IBK기업은행", 
    baseRate: 5.2, 
    additionalRate: 0.9, 
    totalRate: 6.1,
    specialBenefits: "i-ONE뱅크 앱 가입 우대",
    officialLink: "https://www.ibk.co.kr"
  },
  { 
    bankName: "SC제일은행", 
    baseRate: 5.0, 
    additionalRate: 0.9, 
    totalRate: 5.9,
    specialBenefits: "모바일뱅킹 가입 시 우대금리",
    officialLink: "https://www.standardchartered.co.kr"
  },
  { 
    bankName: "부산은행", 
    baseRate: 5.1, 
    additionalRate: 0.8, 
    totalRate: 5.9,
    specialBenefits: "썸뱅크 앱 가입 우대",
    officialLink: "https://www.busanbank.co.kr"
  }
];

export default function MoneyCalculator() {
  // 초기 입력값 설정
  const initialInputData: SavingsInputData = {
    monthlySavings: 55,          // 월 납입액 (만원) - 2025년 기준 최대 55만원으로 변경
    serviceMonths: 18,           // 복무 개월 수 (기본 육군)
    interestRate: 5.0,           // 총 금리 (기본값 5.0%)
    governmentMatch: true,       // 정부 매칭 지원금 (항상 true로 고정)
    isYear2025: true,            // 2025년 이후 기준 (기본값)
    selectedBank: "국민은행",     // 기본 선택 은행 (남겨두지만 UI에서는 제거)
    savingsRatio: 30,            // 월급 대비 저축 비율 (기본 30%)
    monthlySavings2024: 40,      // 2024년 월 납입액 (기본 40만원)
    monthlySavings2025: 55,      // 2025년 월 납입액 (기본 55만원)
    remainingSavingsRate: 100,   // 월급 나머지 금액 100% 저축 (기본값)
  };

  // 사용자 입력 데이터 상태
  const [inputData, setInputData] = useState<SavingsInputData>(initialInputData);
  
  // 입대월 상태
  const [enlistmentMonth, setEnlistmentMonth] = useState("6");
  // 입대연도 상태
  const [enlistmentYear, setEnlistmentYear] = useState("2025");
  // 군 종류 상태
  const [militaryType, setMilitaryType] = useState("육군/해병대");
  
  // 입력값 변경 핸들러들
  const handleMonthlySavingsChange = (value: string) => {
    const amount = Number(value);
    if (!isNaN(amount) && amount >= 0) {
      // 입대 연도가 2025년 이상인 경우 단일 슬라이더만 사용
      if (parseInt(enlistmentYear) >= 2025) {
        const maxLimit = 55; // 2025년부터는 55만원 한도
        const cappedAmount = Math.min(amount, maxLimit);
        
        setInputData({
          ...inputData,
          monthlySavings: cappedAmount,
          isYear2025: true
        });
      } else {
        // 2024년 슬라이더인 경우 그대로 사용
        setInputData({
          ...inputData,
          monthlySavings: amount
        });
      }
    }
  };
  
  // 기본 금리 변경 핸들러 (통합 금리로 변경)
  const handleInterestRateChange = (value: string) => {
    const rate = parseFloat(value);
    if (!isNaN(rate) && rate >= 0) {
      setInputData({
        ...inputData,
        interestRate: rate
      });
    }
  };
  
  // 2024년용 월 납입액 변경 핸들러
  const handleMonthlySavings2024Change = (value: string) => {
    const amount = Number(value);
    if (!isNaN(amount) && amount >= 0) {
      const maxLimit = 40; // 2024년은 40만원 한도
      const cappedAmount = Math.min(amount, maxLimit);
      
      setInputData({
        ...inputData,
        monthlySavings2024: cappedAmount
      });
    }
  };
  
  // 2025년용 월 납입액 변경 핸들러
  const handleMonthlySavings2025Change = (value: string) => {
    const amount = Number(value);
    if (!isNaN(amount) && amount >= 0) {
      const maxLimit = 55; // 2025년은 55만원 한도
      const cappedAmount = Math.min(amount, maxLimit);
      
      setInputData({
        ...inputData,
        monthlySavings2025: cappedAmount
      });
    }
  };
  
  const handleEnlistmentMonthChange = (value: string) => {
    setEnlistmentMonth(value);
  };
  
  const handleEnlistmentYearChange = (value: string) => {
    setEnlistmentYear(value);
    
    if (parseInt(value) >= 2025) {
      // 2025년 이상인 경우 단일 슬라이더 사용
      setInputData({
        ...inputData,
        isYear2025: true,
        monthlySavings: Math.min(inputData.monthlySavings, 55)
      });
    } else {
      // 2024년인 경우 두 개의 슬라이더 사용
      setInputData({
        ...inputData,
        isYear2025: false,
        monthlySavings2024: 40, // 기본값으로 설정
        monthlySavings2025: 55  // 기본값으로 설정
      });
    }
  };
  
  const handleMilitaryTypeChange = (value: string) => {
    setMilitaryType(value);
    // 군 종류에 따라 복무 기간도 업데이트
    let serviceMonths = 18;
    if (value === "육군/해병대") {
      serviceMonths = 18;
    } else if (value === "해군") {
      serviceMonths = 20;
    } else if (value === "공군") {
      serviceMonths = 21;
    }
    
    setInputData({
      ...inputData,
      serviceMonths
    });
  };
  
  // 입대월/연도에 따른 계급별 기간 계산
  const calculateRankPeriods = () => {
    const startMonth = parseInt(enlistmentMonth);
    const startYear = parseInt(enlistmentYear);
    const serviceMonthsTotal = rankPeriods[militaryType as keyof typeof rankPeriods].total;
    
    // 이병 기간 (2개월)
    const privateEndMonth = (startMonth + rankPeriods[militaryType as keyof typeof rankPeriods].이병 - 1) % 12 + 1;
    const privateEndYear = startYear + Math.floor((startMonth + rankPeriods[militaryType as keyof typeof rankPeriods].이병 - 1) / 12);
    
    // 일병 기간 (다음 6개월)
    const privateFirstClassEndMonth = (privateEndMonth + rankPeriods[militaryType as keyof typeof rankPeriods].일병 - 1) % 12 + 1;
    const privateFirstClassEndYear = privateEndYear + Math.floor((privateEndMonth + rankPeriods[militaryType as keyof typeof rankPeriods].일병 - 1) / 12);
    
    // 상병 기간 (다음 6개월)
    const corporalEndMonth = (privateFirstClassEndMonth + rankPeriods[militaryType as keyof typeof rankPeriods].상병 - 1) % 12 + 1;
    const corporalEndYear = privateFirstClassEndYear + Math.floor((privateFirstClassEndMonth + rankPeriods[militaryType as keyof typeof rankPeriods].상병 - 1) / 12);
    
    // 병장 기간 (남은 기간)
    const sergeantEndMonth = (startMonth + serviceMonthsTotal - 1) % 12 + 1;
    const sergeantEndYear = startYear + Math.floor((startMonth + serviceMonthsTotal - 1) / 12);
    
    return {
      이병: { 
        start: { year: startYear, month: startMonth }, 
        end: { year: privateEndYear, month: privateEndMonth } 
      },
      일병: { 
        start: { year: privateEndYear, month: privateEndMonth }, 
        end: { year: privateFirstClassEndYear, month: privateFirstClassEndMonth } 
      },
      상병: { 
        start: { year: privateFirstClassEndYear, month: privateFirstClassEndMonth }, 
        end: { year: corporalEndYear, month: corporalEndMonth } 
      },
      병장: { 
        start: { year: corporalEndYear, month: corporalEndMonth }, 
        end: { year: sergeantEndYear, month: sergeantEndMonth } 
      }
    };
  };
  
  // 계급별 월급 계산
  const calculateSalaryByRank = () => {
    const rankPeriods = calculateRankPeriods();
    
    const result = [];
    
    // 각 계급별 기간에 대해 월급 계산
    for (const [rank, period] of Object.entries(rankPeriods)) {
      // 계급별 시작 월부터 종료 월까지의 월급을 계산
      let currentYear = period.start.year;
      let currentMonth = period.start.month;
      
      while (currentYear < period.end.year || 
             (currentYear === period.end.year && currentMonth <= period.end.month)) {
        // 해당 년도의 월급 정보 선택
        const salaryInfo = currentYear >= 2025 ? militaryRanks2025 : militaryRanks2024;
        const rankInfo = salaryInfo.find(r => r.rank === rank);
        
        if (rankInfo) {
          result.push({
            year: currentYear,
            month: currentMonth,
            rank: rank,
            salary: rankInfo.monthlySalary
          });
        }
        
        // 다음 달로 이동
        currentMonth++;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
        }
      }
    }
    
    return result;
  };
  
  // 장병내일준비적금 수령액 계산 함수
  const calculateTotal = (): { total: number; breakdown: CalculationBreakdown & { remainingSavings: number } } => {
    // 월 납입액 계산 (만원 단위를 원 단위로 변환)
    // 입대 연도가 2024년인 경우 2024년과 2025년 납입액을 각각 고려
    let totalDeposit = 0;
    // 월급에서 저축액을 제외한 나머지 금액의 총합
    let totalRemaining = 0;
    
    if (parseInt(enlistmentYear) >= 2025) {
      // 2025년 이상 입대자는 모든 월에 동일 금액 적용
      const monthlyAmount = inputData.monthlySavings * 10000;
      totalDeposit = monthlyAmount * inputData.serviceMonths;
      
      // 월급에서 적금 납입액을 제외한 나머지 금액 계산
      const salaries = calculateSalaryByRank();
      for (const salaryInfo of salaries) {
        const depositAmount = monthlyAmount;
        const remainingAmount = salaryInfo.salary - depositAmount;
        if (remainingAmount > 0) {
          // 나머지 금액도 모두 저축한다고 가정 (inputData.remainingSavingsRate에 따라 일부만 저축 가능)
          totalRemaining += remainingAmount * (inputData.remainingSavingsRate / 100);
        }
      }
    } else {
      // 2024년 입대자는 각 연도별로 다른 납입액 적용
      // 입대 월과 복무 기간을 바탕으로 2024년에 몇 개월, 2025년에 몇 개월 복무하는지 계산
      const startMonth = parseInt(enlistmentMonth);
      const startYear = parseInt(enlistmentYear);
      let months2024 = 0;
      let months2025 = 0;
      
      // 여기서는 납입액 계산을 위해 연도별 개월 수를 계산
      for (let i = 0; i < inputData.serviceMonths; i++) {
        const currentYear = startYear + Math.floor((startMonth + i - 1) / 12);
        
        if (currentYear < 2025) {
          months2024++;
        } else {
          months2025++;
        }
      }
      
      // 2024년과 2025년 각각의 납입액 계산
      const deposit2024 = (inputData.monthlySavings2024 || 40) * 10000 * months2024;
      const deposit2025 = (inputData.monthlySavings2025 || 55) * 10000 * months2025;
      
      totalDeposit = deposit2024 + deposit2025;
      
      // 월급에서 적금 납입액을 제외한 나머지 금액 계산
      const salaries = calculateSalaryByRank();
      for (const salaryInfo of salaries) {
        let depositAmount = 0;
        if (salaryInfo.year >= 2025) {
          depositAmount = (inputData.monthlySavings2025 || 55) * 10000;
        } else {
          depositAmount = (inputData.monthlySavings2024 || 40) * 10000;
        }
        
        const remainingAmount = salaryInfo.salary - depositAmount;
        if (remainingAmount > 0) {
          // 나머지 금액도 모두 저축한다고 가정 (inputData.remainingSavingsRate에 따라 일부만 저축 가능)
          totalRemaining += remainingAmount * (inputData.remainingSavingsRate / 100);
        }
      }
    }
    
    // 단리 방식으로 이자 계산 - 사용자가 설정한 통합 금리 사용
    const totalInterest = totalDeposit * (inputData.interestRate / 100) * (inputData.serviceMonths / 12);
    
    // 정부 매칭 지원금 (전체 납입액에 대해 1:1 매칭)
    const governmentMatch = inputData.governmentMatch ? totalDeposit : 0;
    
    // 총 수령액 (장병내일준비적금 + 나머지 저축금액)
    const total = totalDeposit + totalInterest + governmentMatch + totalRemaining;
    
    // 항목별 내역 (통합 금리 기준 변경)
    const breakdown = {
      totalDeposit,
      baseInterest: totalInterest,
      additionalInterest: 0,  // 통합 금리에 이미 포함되어 있으므로 0으로 설정
      governmentMatch,
      remainingSavings: totalRemaining
    };
    
    return { total, breakdown };
  };
  
  // 계산 결과
  const result = calculateTotal();
  
  // 금리 정보 표시 상태 관리
  const [showRateInfo, setShowRateInfo] = useState(false);
  
  // 금리 정보 토글 핸들러
  const toggleRateInfo = () => {
    setShowRateInfo(!showRateInfo);
  };
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">장병내일준비적금 계산기</h1>
          <p className="text-gray-600">월 납입액, 복무기간, 혜택 등을 입력하여 만기 수령액을 계산해보세요.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 입력 폼 */}
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
              <CardContent className="p-6 space-y-6">
                {/* 입대 정보 */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* 입대 연도 선택 */}
                  <div className="space-y-2">
                    <Label htmlFor="calculatorEnlistmentYear" className="text-base font-medium text-gray-700 block">
                      입대 연도
                    </Label>
                    <Select
                      value={enlistmentYear}
                      onValueChange={handleEnlistmentYearChange}
                    >
                      <SelectTrigger id="calculatorEnlistmentYear">
                        <SelectValue placeholder="입대 연도 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2024">2024년</SelectItem>
                        <SelectItem value="2025">2025년</SelectItem>
                        <SelectItem value="2026">2026년</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 입대 월 선택 */}
                  <div className="space-y-2">
                    <Label htmlFor="calculatorEnlistmentMonth" className="text-base font-medium text-gray-700 block">
                      입대 월
                    </Label>
                    <Select
                      value={enlistmentMonth}
                      onValueChange={handleEnlistmentMonthChange}
                    >
                      <SelectTrigger id="calculatorEnlistmentMonth">
                        <SelectValue placeholder="입대 월 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        {enlistmentMonthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 군종 선택 */}
                  <div className="space-y-2">
                    <Label htmlFor="calculatorMilitaryType" className="text-base font-medium text-gray-700 block">
                      군종
                    </Label>
                    <Select
                      value={militaryType}
                      onValueChange={handleMilitaryTypeChange}
                    >
                      <SelectTrigger id="calculatorMilitaryType">
                        <SelectValue placeholder="군종 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="육군/해병대">육군/해병대 (18개월)</SelectItem>
                        <SelectItem value="해군">해군 (20개월)</SelectItem>
                        <SelectItem value="공군">공군 (21개월)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* 월 납입액 입력 섹션 - 입대 연도에 따라 달라짐 */}
                {parseInt(enlistmentYear) >= 2025 ? (
                  // 2025년 이상 입대자용 단일 슬라이더
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="monthlySavings" className="text-base font-medium text-gray-700">
                        월 납입액
                      </Label>
                      <span className="text-lg font-semibold text-blue-600">{inputData.monthlySavings}만원</span>
                    </div>
                    <div className="relative pt-1">
                      <input 
                        type="range"
                        id="monthlySavings"
                        value={inputData.monthlySavings}
                        min={1}
                        max={55}
                        step={1}
                        onChange={(e) => handleMonthlySavingsChange(e.target.value)}
                        className="w-full appearance-none h-1 rounded-full bg-gray-200 focus:outline-none focus:ring-0 focus:shadow-none"
                        style={{
                          background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(inputData.monthlySavings / 55) * 100}%, #e5e7eb ${(inputData.monthlySavings / 55) * 100}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="absolute left-0 right-0 -bottom-6 flex justify-between text-xs text-gray-500">
                        <span>1만원</span>
                        <span>55만원</span>
                      </div>
                    </div>
                    <style jsx>{`
                      input[type=range]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: white;
                        border: 2px solid #3b82f6;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        cursor: pointer;
                        transition: all 0.15s ease;
                      }
                      input[type=range]::-webkit-slider-thumb:hover {
                        transform: scale(1.1);
                        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                      }
                      input[type=range]::-moz-range-thumb {
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: white;
                        border: 2px solid #3b82f6;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        cursor: pointer;
                        transition: all 0.15s ease;
                      }
                      input[type=range]::-moz-range-thumb:hover {
                        transform: scale(1.1);
                        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                      }
                    `}</style>
                  </div>
                ) : (
                  // 2024년 입대자용 두 개의 슬라이더
                  <div className="space-y-8">
                    {/* 2024년용 슬라이더 */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="monthlySavings2024" className="text-base font-medium text-gray-700">
                          2024년 월 납입액
                        </Label>
                        <span className="text-lg font-semibold text-blue-600">{inputData.monthlySavings2024}만원</span>
                      </div>
                      <div className="relative pt-1">
                        <input 
                          type="range"
                          id="monthlySavings2024"
                          value={inputData.monthlySavings2024 || 40}
                          min={1}
                          max={40}
                          step={1}
                          onChange={(e) => handleMonthlySavings2024Change(e.target.value)}
                          className="w-full appearance-none h-1 rounded-full bg-gray-200 focus:outline-none focus:ring-0 focus:shadow-none"
                          style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((inputData.monthlySavings2024 || 40) / 40) * 100}%, #e5e7eb ${((inputData.monthlySavings2024 || 40) / 40) * 100}%, #e5e7eb 100%)`
                          }}
                        />
                        <div className="absolute left-0 right-0 -bottom-6 flex justify-between text-xs text-gray-500">
                          <span>1만원</span>
                          <span>40만원</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 2025년용 슬라이더 */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <Label htmlFor="monthlySavings2025" className="text-base font-medium text-gray-700">
                          2025년 월 납입액
                        </Label>
                        <span className="text-lg font-semibold text-blue-600">{inputData.monthlySavings2025}만원</span>
                      </div>
                      <div className="relative pt-1">
                        <input 
                          type="range"
                          id="monthlySavings2025"
                          value={inputData.monthlySavings2025 || 55}
                          min={1}
                          max={55}
                          step={1}
                          onChange={(e) => handleMonthlySavings2025Change(e.target.value)}
                          className="w-full appearance-none h-1 rounded-full bg-gray-200 focus:outline-none focus:ring-0 focus:shadow-none"
                          style={{
                            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((inputData.monthlySavings2025 || 55) / 55) * 100}%, #e5e7eb ${((inputData.monthlySavings2025 || 55) / 55) * 100}%, #e5e7eb 100%)`
                          }}
                        />
                        <div className="absolute left-0 right-0 -bottom-6 flex justify-between text-xs text-gray-500">
                          <span>1만원</span>
                          <span>55만원</span>
                        </div>
                      </div>
                    </div>
                    <style jsx>{`
                      input[type=range]::-webkit-slider-thumb {
                        -webkit-appearance: none;
                        appearance: none;
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: white;
                        border: 2px solid #3b82f6;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        cursor: pointer;
                        transition: all 0.15s ease;
                      }
                      input[type=range]::-webkit-slider-thumb:hover {
                        transform: scale(1.1);
                        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                      }
                      input[type=range]::-moz-range-thumb {
                        width: 18px;
                        height: 18px;
                        border-radius: 50%;
                        background: white;
                        border: 2px solid #3b82f6;
                        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
                        cursor: pointer;
                        transition: all 0.15s ease;
                      }
                      input[type=range]::-moz-range-thumb:hover {
                        transform: scale(1.1);
                        box-shadow: 0 2px 4px rgba(0,0,0,0.15);
                      }
                    `}</style>
                  </div>
                )}
                
                {/* 월 납입액 설명 */}
                <div className="space-y-1">
                  <p className="text-sm text-gray-500 italic">
                    ※ 2025년부터는 월 납입액 한도가 55만원으로 상향됩니다. 2024년에는 40만원까지 납입 가능합니다.
                  </p>
                  {parseInt(enlistmentYear) === 2024 && (
                    <p className="text-sm text-gray-500 italic font-medium">
                      ※ 2024년 입대자는 복무 기간 중 연도별로 다른 납입액을 설정할 수 있습니다.
                    </p>
                  )}
                </div>
                
                {/* 금리 설정 */}
                <div className="space-y-2">
                  <Label htmlFor="interestRate" className="text-base font-medium text-gray-700 block">
                    금리 설정
                  </Label>
                  <Select
                    value={inputData.interestRate.toFixed(1)}
                    onValueChange={handleInterestRateChange}
                  >
                    <SelectTrigger id="interestRate">
                      <SelectValue placeholder="금리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 31 }, (_, i) => (5 + i * 0.1).toFixed(1)).map((rate) => (
                        <SelectItem key={rate} value={rate}>
                          {rate}%
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* 금리 확인하기 토글 버튼 */}
                  <div className="mt-2 text-left">
                    <button 
                      onClick={toggleRateInfo}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline inline-flex items-center"
                    >
                      <span>은행별 금리 확인하기</span>
                      <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ml-1 transition-transform ${showRateInfo ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* 은행별 금리 정보 (토글) */}
                  {showRateInfo && (
                    <div className="mt-4 border border-blue-100 rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
                      <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
                        <h3 className="font-medium text-blue-700">은행별 금리 비교</h3>
                      </div>
                      <div className="p-4 bg-white max-h-80 overflow-y-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-2 py-2 text-left font-medium text-gray-700">은행명</th>
                              <th className="px-2 py-2 text-center font-medium text-gray-700">기본금리</th>
                              <th className="px-2 py-2 text-center font-medium text-gray-700">우대금리</th>
                              <th className="px-2 py-2 text-center font-medium text-gray-700">총 금리</th>
                              <th className="px-2 py-2 text-left font-medium text-gray-700">특별혜택</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bankRates.map((bank) => (
                              <tr key={bank.bankName} className="border-t border-gray-100">
                                <td className="px-2 py-2 font-medium">{bank.bankName}</td>
                                <td className="px-2 py-2 text-center">{bank.baseRate}%</td>
                                <td className="px-2 py-2 text-center">{bank.additionalRate}%</td>
                                <td className="px-2 py-2 text-center font-medium text-blue-600">{bank.totalRate}%</td>
                                <td className="px-2 py-2">{bank.specialBenefits}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        <div className="mt-3 text-right">
                          <button 
                            onClick={() => setShowRateInfo(false)}
                            className="text-sm text-gray-500 hover:text-gray-700"
                          >
                            닫기
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* 결과 표시 */}
          <div className="lg:col-span-1">
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-4">
              <CardContent className="p-6">
                {/* 총 모을 수 있는 금액 - 가장 크게 표시 */}
                <div className="mb-6 bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-base font-medium text-blue-700 text-center">총 모을 수 있는 금액</h3>
                  <p className="text-4xl font-bold text-blue-700 text-center mt-2">
                    {Math.round(result.total).toLocaleString()}원
                  </p>
                  <p className="text-xs text-gray-500 text-center mt-1">
                    (장병내일준비적금 + 월급 나머지 저축액)
                  </p>
                </div>
                
                {/* 장병내일준비적금 예상 수령액 */}
                <div className="mb-6 p-4 border border-green-100 rounded-lg bg-green-50">
                  <h3 className="font-medium text-green-700 text-center">장병내일준비적금 예상 수령액</h3>
                  <p className="text-2xl font-bold text-green-700 text-center mt-2">
                    {Math.round(result.total - result.breakdown.remainingSavings).toLocaleString()}원
                  </p>
                  
                  <div className="space-y-3 pt-3 mt-2 border-t border-green-200">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">총 납입액</span>
                      <span className="font-medium">{Math.round(result.breakdown.totalDeposit).toLocaleString()}원</span>
                    </div>
                    
                    {inputData.governmentMatch && result.breakdown.governmentMatch > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">정부 매칭 지원금</span>
                        <span className="font-medium">{Math.round(result.breakdown.governmentMatch).toLocaleString()}원</span>
                      </div>
                    )}
                     
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">이자</span>
                      <span className="font-medium">{Math.round(result.breakdown.baseInterest).toLocaleString()}원</span>
                    </div>
                  </div>
                </div>
                
                {/* 추가 저축 가능액 */}
                <div className="mb-6 p-4 border border-yellow-100 rounded-lg bg-yellow-50">
                  <h3 className="font-medium text-yellow-700 text-center">추가 저축 가능액</h3>
                  <p className="text-2xl font-bold text-yellow-700 text-center mt-2">
                    {Math.round(result.breakdown.remainingSavings).toLocaleString()}원
                  </p>
                  <p className="text-xs text-gray-600 text-center mt-1">
                    월급에서 적금 납입 후 남은 금액을 저축한 총액
                  </p>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-500">
                    * 실제 수령액은 금리 변동, 납입 일정, 정부 정책 등에 따라 달라질 수 있습니다.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        
        {/* 다른 계산기로 이동하는 링크 */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">공군 지원 점수 계산기도 이용해보세요</h3>
          <p className="text-gray-600 mb-4">
            공군 지원을 준비 중이신가요? 자격/면허, 전공, 출결, 가산점 등을 입력하여<br />
            공군 지원 1차 점수를 실시간으로 계산하고, 선발 점수와 비교해볼 수 있습니다.
          </p>
          <Link href="/scorecalculator" className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            공군 점수 계산기로 이동
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
           <div className="mt-8 text-center text-sm text-gray-500">
          <p>※ 본 계산기는 참고용이며, 실제 금융상품의 조건과 다를 수 있습니다.</p>
          <p>※ 정확한 정보는 관련 금융기관 또는 정부 기관의 공식 홈페이지를 참고하시기 바랍니다.</p>
        </div>
      </div>
    </main>
  );
} 