"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GoogleAdsense from "@/components/GoogleAdsense";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  taxExemption: boolean;           // 이자소득세 면제 혜택 적용 여부
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
  taxSavings: number;             // 세금 절감액
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

// 세율 상수
const TAX_RATE = 0.154; // 이자소득세 15.4%

export default function MoneyCalculator() {
  // 초기 입력값 설정
  const initialInputData: SavingsInputData = {
    monthlySavings: 40,          // 월 납입액 (만원)
    serviceMonths: 18,           // 복무 개월 수 (기본 육군)
    interestRate: 6.0,           // 총 금리 (기본값 6.0%)
    governmentMatch: true,       // 정부 매칭 지원금 (항상 true로 고정)
    isYear2025: true,            // 2025년 이후 기준 (기본값)
    taxExemption: true,          // 이자소득세 면제 (항상 true로 고정)
    selectedBank: "국민은행",     // 기본 선택 은행 (남겨두지만 UI에서는 제거)
    savingsRatio: 30,            // 월급 대비 저축 비율 (기본 30%)
    monthlySavings2024: 40,      // 2024년 월 납입액 (기본 40만원)
    monthlySavings2025: 55,      // 2025년 월 납입액 (기본 55만원)
    remainingSavingsRate: 100,   // 월급 나머지 금액 100% 저축 (기본값)
  };

  // 사용자 입력 데이터 상태
  const [inputData, setInputData] = useState<SavingsInputData>(initialInputData);
  
  // 입대월 상태
  const [enlistmentMonth, setEnlistmentMonth] = useState("1");
  // 입대연도 상태
  const [enlistmentYear, setEnlistmentYear] = useState("2024");
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
    const rate = Number(value);
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
    
    // 이자소득세 계산 (비과세 혜택 적용 여부에 따라)
    const taxSavings = inputData.taxExemption ? totalInterest * TAX_RATE : 0;
    
    // 정부 매칭 지원금 (전체 납입액에 대해 1:1 매칭)
    const governmentMatch = inputData.governmentMatch ? totalDeposit : 0;
    
    // 총 수령액 (장병내일준비적금 + 나머지 저축금액)
    const total = totalDeposit + totalInterest + taxSavings + governmentMatch + totalRemaining;
    
    // 항목별 내역 (통합 금리 기준 변경)
    const breakdown = {
      totalDeposit,
      baseInterest: totalInterest,
      additionalInterest: 0,  // 통합 금리에 이미 포함되어 있으므로 0으로 설정
      taxSavings,
      governmentMatch,
      remainingSavings: totalRemaining
    };
    
    return { total, breakdown };
  };
  
  // 계산 결과
  const result = calculateTotal();
  
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 상단 광고 */}
        <div className="mb-8">
          <GoogleAdsense slot="3819366386" />
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">장병내일준비적금 계산기</h1>
          <p className="text-gray-600">월 납입액, 복무기간, 혜택 등을 입력하여 만기 수령액을 계산해보세요.</p>
        </div>
        
        <Tabs defaultValue="calculator" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">계산기</TabsTrigger>
            <TabsTrigger value="comparison">은행별 비교</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calculator">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* 입력 폼 */}
              <div className="lg:col-span-2">
                <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
                  <CardHeader className="border-b border-gray-100 p-6">
                    <CardTitle>계산 정보 입력</CardTitle>
                  </CardHeader>
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
                            <SelectItem value="2023">2023년</SelectItem>
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
                      <div className="space-y-3">
                        <Label htmlFor="monthlySavings" className="text-base font-medium text-green-700 block">
                          월 납입액: {inputData.monthlySavings}만원 (최대 55만원)
                        </Label>
                        <input 
                          type="range"
                          id="monthlySavings"
                          value={inputData.monthlySavings}
                          min={1}
                          max={55}
                          step={1}
                          onChange={(e) => handleMonthlySavingsChange(e.target.value)}
                          className="w-full"
                        />
                        <div className="flex justify-between text-sm text-gray-500">
                          <span>1만원</span>
                          <span>55만원</span>
                        </div>
                      </div>
                    ) : (
                      // 2024년 입대자용 두 개의 슬라이더
                      <div className="space-y-6">
                        {/* 2024년용 슬라이더 */}
                        <div className="space-y-3">
                          <Label htmlFor="monthlySavings2024" className="text-base font-medium text-green-700 block">
                            2024년 월 납입액: {inputData.monthlySavings2024}만원 (최대 40만원)
                          </Label>
                          <input 
                            type="range"
                            id="monthlySavings2024"
                            value={inputData.monthlySavings2024 || 40}
                            min={1}
                            max={40}
                            step={1}
                            onChange={(e) => handleMonthlySavings2024Change(e.target.value)}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>1만원</span>
                            <span>40만원</span>
                          </div>
                        </div>
                        
                        {/* 2025년용 슬라이더 */}
                        <div className="space-y-3">
                          <Label htmlFor="monthlySavings2025" className="text-base font-medium text-green-700 block">
                            2025년 월 납입액: {inputData.monthlySavings2025}만원 (최대 55만원)
                          </Label>
                          <input 
                            type="range"
                            id="monthlySavings2025"
                            value={inputData.monthlySavings2025 || 55}
                            min={1}
                            max={55}
                            step={1}
                            onChange={(e) => handleMonthlySavings2025Change(e.target.value)}
                            className="w-full"
                          />
                          <div className="flex justify-between text-sm text-gray-500">
                            <span>1만원</span>
                            <span>55만원</span>
                          </div>
                        </div>
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
                        금리 설정 (현재: {inputData.interestRate}%)
                      </Label>
                      <Select
                        value={inputData.interestRate.toString()}
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
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* 결과 표시 */}
              <div className="lg:col-span-1">
                <Card className="bg-white rounded-xl shadow-sm border border-gray-100 sticky top-4">
                  <CardHeader className="border-b border-gray-100 p-6">
                    <CardTitle>예상 수령액</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="mb-6">
                      <p className="text-4xl font-bold text-green-700 text-center">
                        {Math.round(result.total).toLocaleString()}원
                      </p>
                      <p className="text-sm text-gray-500 text-center mt-1">
                        예상 총 수령액
                      </p>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t border-gray-100">
                      <h3 className="font-medium text-green-700">상세 내역</h3>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">총 납입액</span>
                        <span className="font-medium">{Math.round(result.breakdown.totalDeposit).toLocaleString()}원</span>
                      </div>
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">이자</span>
                        <span className="font-medium">{Math.round(result.breakdown.baseInterest).toLocaleString()}원</span>
                      </div>
                      
                      {inputData.taxExemption && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">세금 절감액</span>
                          <span className="font-medium">{Math.round(result.breakdown.taxSavings).toLocaleString()}원</span>
                        </div>
                      )}
                      
                      {inputData.governmentMatch && result.breakdown.governmentMatch > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">정부 매칭 지원금</span>
                          <span className="font-medium">{Math.round(result.breakdown.governmentMatch).toLocaleString()}원</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">월급 나머지 저축액</span>
                        <span className="font-medium">{Math.round(result.breakdown.remainingSavings).toLocaleString()}원</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500">
                        * 실제 수령액은 금리 변동, 납입 일정, 정부 정책 등에 따라 달라질 수 있습니다.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>은행별 장병내일준비적금 비교</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>은행명</TableHead>
                      <TableHead>기본금리</TableHead>
                      <TableHead>우대금리</TableHead>
                      <TableHead>총 금리</TableHead>
                      <TableHead>특별혜택</TableHead>
                      <TableHead>상세정보</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bankRates.map((bank) => (
                      <TableRow key={bank.bankName}>
                        <TableCell className="font-medium">{bank.bankName}</TableCell>
                        <TableCell>{bank.baseRate}%</TableCell>
                        <TableCell>{bank.additionalRate}%</TableCell>
                        <TableCell className="font-bold">{bank.totalRate}%</TableCell>
                        <TableCell>{bank.specialBenefits}</TableCell>
                        <TableCell>
                          <a 
                            href={bank.officialLink} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            바로가기
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            
            <div className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>장병내일준비적금 가입 방법</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>
                    장병내일준비적금은 각 은행의 인터넷뱅킹이나 모바일뱅킹 앱을 통해 가입할 수 있습니다. 
                    가입 시 필요한 서류와 절차는 다음과 같습니다:
                  </p>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-blue-700 mb-2">필요 서류</h3>
                    <ul className="list-disc pl-5 space-y-1 text-gray-700">
                      <li>본인 명의 신분증 (주민등록증, 운전면허증 등)</li>
                      <li>병적증명서 또는 군복무확인서</li>
                      <li>가입 은행 계좌 (없을 경우 신규 개설 필요)</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-green-700 mb-2">가입 절차</h3>
                    <ol className="list-decimal pl-5 space-y-1 text-gray-700">
                      <li>각 은행 앱 또는 인터넷뱅킹에 로그인</li>
                      <li>&apos;장병내일준비적금&apos; 또는 &apos;군인적금&apos; 메뉴 선택</li>
                      <li>본인 정보 및 군 복무 정보 입력</li>
                      <li>월 납입액 및 자동이체 날짜 설정</li>
                      <li>약관 동의 후 가입 완료</li>
                    </ol>
                  </div>
                  
                  <p className="text-sm text-gray-600">
                    ※ 일부 은행은 모바일앱 가입 시 우대금리를 제공하는 경우가 있으니 가입 전 확인하세요.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* 하단 광고 */}
        <div className="mt-8">
          <GoogleAdsense slot="5108411687" />
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>※ 본 계산기는 참고용이며, 실제 금융상품의 조건과 다를 수 있습니다.</p>
          <p>※ 정확한 정보는 관련 금융기관 또는 정부 기관의 공식 홈페이지를 참고하시기 바랍니다.</p>
          <p className="mt-2">※ 참고 자료: 
            <a href="https://m.blog.naver.com/meaning87/223562710943" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">은퇴연구소 블로그</a>,
            <a href="https://www.banksalad.com/articles/2023-군인적금-장병내일준비적금" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">뱅크샐러드</a>,
            <a href="https://mma.go.kr/board/boardView.do?mc=usr0000379&gesipan_id=2&gsgeul_no=1518778" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">병무청</a>,
            <a href="https://blog.naver.com/mma9090/223957425127" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline ml-1">병무청 블로그 - 2025년 군인 월급</a>
          </p>
        </div>
      </div>
    </main>
  );
} 