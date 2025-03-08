"use client";

import { useState, useMemo, useCallback } from "react";
import { Card, CardContent} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { 
  SavingsInputData, 
  MilitaryRank,
  MilitarySalaryInfo
} from "@/types";



// 군 계급별 월급 정보 (2024년 기준)
const militaryRanks2024: MilitarySalaryInfo[] = [
  { rank: "이병" as MilitaryRank, monthlySalary: 640000, recommendedSavings: 15 },
  { rank: "일병" as MilitaryRank, monthlySalary: 800000, recommendedSavings: 20 },
  { rank: "상병" as MilitaryRank, monthlySalary: 1000000, recommendedSavings: 25 },
  { rank: "병장" as MilitaryRank, monthlySalary: 1250000, recommendedSavings: 30 }
];

// 군 계급별 월급 정보 (2025년 기준)
const militaryRanks2025: MilitarySalaryInfo[] = [
  { rank: "이병" as MilitaryRank, monthlySalary: 750000, recommendedSavings: 15 },
  { rank: "일병" as MilitaryRank, monthlySalary: 900000, recommendedSavings: 20 },
  { rank: "상병" as MilitaryRank, monthlySalary: 1200000, recommendedSavings: 25 },
  { rank: "병장" as MilitaryRank, monthlySalary: 1500000, recommendedSavings: 35 }
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

// 월 선택 옵션
const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  value: `${i + 1}`,
  label: `${i + 1}월`
}));

export default function MoneyCalculator() {
  // 초기 입력값 설정
  const initialInputData: SavingsInputData = {
    monthlySavings: 55,          // 월 납입액 (만원) - 2025년 기준 최대 55만원으로 변경
    serviceMonths: 18,           // 복무 개월 수 (기본 육군)
    interestRate: 5.0,           // 총 금리 (기본값 5.0%)
    governmentMatch: true,       // 정부 매칭 지원금 (항상 true로 고정)
    isYear2025: true,            // 2025년 이후 기준 (기본값)
    monthlySavings2024: 40,      // 2024년 월 납입액 (기본 40만원)
    monthlySavings2025: 55,      // 2025년 월 납입액 (기본 55만원)
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
  const handleMonthlySavingsChange = useCallback((value: string) => {
    const amount = Number(value);
    if (!isNaN(amount) && amount >= 0) {
      // 입대 연도가 2025년 이상인 경우 단일 슬라이더만 사용
      if (parseInt(enlistmentYear) >= 2025) {
        const maxLimit = 55; // 2025년부터는 55만원 한도
        const cappedAmount = Math.min(amount, maxLimit);
        
        setInputData(prevData => ({
          ...prevData,
          monthlySavings: cappedAmount,
          isYear2025: true
        }));
      } else {
        // 2024년 슬라이더인 경우 그대로 사용
        setInputData(prevData => ({
          ...prevData,
          monthlySavings: amount
        }));
      }
    }
  }, [enlistmentYear]);
  
  // 기본 금리 변경 핸들러 (통합 금리로 변경)
  const handleInterestRateChange = useCallback((value: string) => {
    const rate = parseFloat(value);
    if (!isNaN(rate) && rate >= 0) {
      setInputData(prevData => ({
        ...prevData,
        interestRate: rate
      }));
    }
  }, []);
  
  // 2024년용 월 납입액 변경 핸들러
  const handleMonthlySavings2024Change = useCallback((value: string) => {
    const amount = Number(value);
    if (!isNaN(amount) && amount >= 0) {
      const maxLimit = 40; // 2024년은 40만원 한도
      const cappedAmount = Math.min(amount, maxLimit);
      
      setInputData(prevData => ({
        ...prevData,
        monthlySavings2024: cappedAmount
      }));
    }
  }, []);
  
  // 2025년용 월 납입액 변경 핸들러
  const handleMonthlySavings2025Change = useCallback((value: string) => {
    const amount = Number(value);
    if (!isNaN(amount) && amount >= 0) {
      const maxLimit = 55; // 2025년은 55만원 한도
      const cappedAmount = Math.min(amount, maxLimit);
      
      setInputData(prevData => ({
        ...prevData,
        monthlySavings2025: cappedAmount
      }));
    }
  }, []);
  
  const handleEnlistmentMonthChange = useCallback((value: string) => {
    setEnlistmentMonth(value);
  }, []);
  
  const handleEnlistmentYearChange = useCallback((value: string) => {
    setEnlistmentYear(value);
    
    // 입대 연도가 2025년 이상이면 isYear2025를 true로 설정
    if (parseInt(value) >= 2025) {
      setInputData(prevData => ({
        ...prevData,
        isYear2025: true
      }));
    } else {
      setInputData(prevData => ({
        ...prevData,
        isYear2025: false
      }));
    }
  }, []);
  
  const handleMilitaryTypeChange = useCallback((value: string) => {
    setMilitaryType(value);
    
    // 군 종류에 따라 복무 개월 수 자동 설정
    const serviceMonths = rankPeriods[value as keyof typeof rankPeriods].total;
    
    setInputData(prevData => ({
      ...prevData,
      serviceMonths
    }));
  }, []);
  
  // 입대월/연도에 따른 계급별 기간 계산
  const calculateRankPeriods = useCallback(() => {
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
  }, [enlistmentMonth, enlistmentYear, militaryType, inputData.serviceMonths]);
  
  // 계급별 월급 계산
  const calculateSalaryByRank = useCallback(() => {
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
        const rankInfo = salaryInfo.find(r => r.rank === rank as MilitaryRank);
        
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
  }, [enlistmentMonth, enlistmentYear, militaryType, inputData.serviceMonths]);
  
  // 장병내일준비적금 수령액 계산 함수
  const calculationResult = useMemo(() => {
    // 기본 변수 설정
    let totalDeposit = 0;
    let totalRemaining = 0;
    
    // 시작 시점 설정
    const startMonth = parseInt(enlistmentMonth);
    const startYear = parseInt(enlistmentYear);
    
    // 계급별 개월 수
    const rankMonths = rankPeriods[militaryType as keyof typeof rankPeriods];
    
    // 연도별 적금 한도
    const deposit2024Max = 400000; // 2024년 40만원 한도
    const deposit2025Max = 550000; // 2025년 55만원 한도
    
    // 월급 객체화 (계급별 월급을 빠르게 조회하기 위해)
    const salary2024 = {
      이병: militaryRanks2024.find(r => r.rank === "이병")!.monthlySalary,
      일병: militaryRanks2024.find(r => r.rank === "일병")!.monthlySalary,
      상병: militaryRanks2024.find(r => r.rank === "상병")!.monthlySalary,
      병장: militaryRanks2024.find(r => r.rank === "병장")!.monthlySalary
    };
    
    const salary2025 = {
      이병: militaryRanks2025.find(r => r.rank === "이병")!.monthlySalary,
      일병: militaryRanks2025.find(r => r.rank === "일병")!.monthlySalary,
      상병: militaryRanks2025.find(r => r.rank === "상병")!.monthlySalary,
      병장: militaryRanks2025.find(r => r.rank === "병장")!.monthlySalary
    };
    
    // 계급별 저축액 계산을 위한 변수들
    let savingsByRank = {
      이병: 0,
      일병: 0,
      상병: 0,
      병장: 0
    };
    
    // 월별 계산 데이터를 담을 배열
    const monthlyData = [];
    
    if (startYear >= 2025) {
      // 2025년 이상 입대자는 모든 월에 동일 금액 적용
      const monthlyAmount = Math.min(inputData.monthlySavings * 10000, deposit2025Max);
      totalDeposit = monthlyAmount * inputData.serviceMonths;
      
      // 각 계급별 남는 금액 계산
      const remainingByRank = {
        이병: salary2025.이병 - monthlyAmount,
        일병: salary2025.일병 - monthlyAmount,
        상병: salary2025.상병 - monthlyAmount,
        병장: salary2025.병장 - monthlyAmount
      };
      
      // 계급별 저축액 계산 (남는 금액 * 개월 수)
      savingsByRank.이병 = remainingByRank.이병 * rankMonths.이병;
      savingsByRank.일병 = remainingByRank.일병 * rankMonths.일병;
      savingsByRank.상병 = remainingByRank.상병 * rankMonths.상병;
      savingsByRank.병장 = remainingByRank.병장 * rankMonths.병장;
      
      totalRemaining = savingsByRank.이병 + savingsByRank.일병 + savingsByRank.상병 + savingsByRank.병장;
    } else {
      // 2024년 입대자 - 월별 계산 방식으로 변경
      
      // 입대 월과 복무 기간을 바탕으로 월별 데이터 계산
      let currentYear = startYear;
      let currentMonth = startMonth;
      let monthsServed = 0; // 복무 개월 수
      
      // 각 월별로 계산
      for (let i = 0; i < inputData.serviceMonths; i++) {
        // 현재 개월 수에 따른 계급 결정
        let currentRank;
        if (monthsServed < rankMonths.이병) {
          currentRank = "이병";
        } else if (monthsServed < rankMonths.이병 + rankMonths.일병) {
          currentRank = "일병";
        } else if (monthsServed < rankMonths.이병 + rankMonths.일병 + rankMonths.상병) {
          currentRank = "상병";
        } else {
          currentRank = "병장";
        }
        
        // 연도에 따른 월급과 적금 한도 설정
        const currentSalary = currentYear < 2025 
          ? salary2024[currentRank as keyof typeof salary2024] 
          : salary2025[currentRank as keyof typeof salary2025];
        
        const depositLimit = currentYear < 2025 ? deposit2024Max : deposit2025Max;
        const depositAmount = currentYear < 2025 
          ? Math.min((inputData.monthlySavings2024 || 40) * 10000, depositLimit)
          : Math.min((inputData.monthlySavings2025 || 55) * 10000, depositLimit);
        
        // 남는 금액과 추가 저축액 계산
        const remainingAmount = currentSalary - depositAmount;
        const savingsAmount = remainingAmount;
        
        // 월별 데이터 저장
        monthlyData.push({
          year: currentYear,
          month: currentMonth,
          rank: currentRank,
          salary: currentSalary,
          deposit: depositAmount,
          remaining: remainingAmount,
          savings: savingsAmount
        });
        
        // 총액에 추가
        totalDeposit += depositAmount;
        
        // 계급별 저축액 누적
        savingsByRank[currentRank as keyof typeof savingsByRank] += savingsAmount;
        totalRemaining += savingsAmount;
        
        // 다음 달로 이동
        currentMonth++;
        if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
        }
        
        // 복무 개월 수 증가
        monthsServed++;
      }
    }
    
    // 월 적금 방식으로 이자 계산 - 사용자가 설정한 통합 금리 사용
    // 월별로 납입하는 적금의 이자 계산식: (원금 x 이율 x (개월수 + 1)) / 24
    const baseInterest = (totalDeposit * (inputData.interestRate / 100) * (inputData.serviceMonths + 1)) / 24;
    
    // 정부 매칭 지원금 (전체 납입액에 대해 1:1 매칭)
    const governmentMatch = inputData.governmentMatch ? totalDeposit : 0;
    
    // 연도별 통계 (디버깅 및 UI 표시용)
    const yearStats = {
      2024: { deposit: 0, savings: 0, months: 0 },
      2025: { deposit: 0, savings: 0, months: 0 },
      2026: { deposit: 0, savings: 0, months: 0 }
    };
    
    // 월별 데이터로부터 연도별 통계 집계 (월별 방식으로 계산한 경우에만)
    if (monthlyData.length > 0) {
      monthlyData.forEach(month => {
        // 연도별 통계
        const yearKey = month.year as keyof typeof yearStats;
        if (yearStats[yearKey]) {
          yearStats[yearKey].deposit += month.deposit;
          yearStats[yearKey].savings += month.savings;
          yearStats[yearKey].months++;
        }
      });
      
      // 2024년 12월과 2025년 1월 비교 계산 (사용자 요청에 따라)
      // 복무 기간이 2024년 12월과 2025년 1월을 모두 포함하는 경우에만 계산
      const dec2024Data = monthlyData.find(m => m.year === 2024 && m.month === 12);
      const jan2025Data = monthlyData.find(m => m.year === 2025 && m.month === 1);
      
      if (dec2024Data && jan2025Data) {
        console.log('2024년 12월 vs 2025년 1월 비교:', {
          '2024년 12월 계급': dec2024Data.rank,
          '2024년 12월 월급': Math.round(dec2024Data.salary / 10000) + '만원',
          '2024년 12월 적금': Math.round(dec2024Data.deposit / 10000) + '만원',
          '2024년 12월 남는 금액': Math.round(dec2024Data.remaining / 10000) + '만원',
          '2024년 12월 저축액': Math.round(dec2024Data.savings / 10000) + '만원',
          '2025년 1월 계급': jan2025Data.rank,
          '2025년 1월 월급': Math.round(jan2025Data.salary / 10000) + '만원',
          '2025년 1월 적금': Math.round(jan2025Data.deposit / 10000) + '만원',
          '2025년 1월 남는 금액': Math.round(jan2025Data.remaining / 10000) + '만원',
          '2025년 1월 저축액': Math.round(jan2025Data.savings / 10000) + '만원',
          '저축액 차이': Math.round((dec2024Data.savings - jan2025Data.savings) / 10000) + '만원'
        });
      }
    }
    
    
    // 총 수령액 (장병내일준비적금 + 나머지 저축금액)
    const total = totalDeposit + baseInterest + governmentMatch + totalRemaining;
    
    // 항목별 내역
    return {
      total,
      breakdown: {
        totalDeposit,
        baseInterest,
        additionalInterest: 0, // 추가 이자는 없음 (통합 금리로 계산)
        governmentMatch,
        remainingSavings: totalRemaining
      },
      // 추가 통계 데이터 (필요시 UI에서 활용 가능)
      stats: {
        monthlyData,
        yearStats
      }
    };
  }, [
    inputData.monthlySavings,
    inputData.monthlySavings2024,
    inputData.monthlySavings2025,
    inputData.serviceMonths,
    inputData.interestRate,
    inputData.governmentMatch,
    enlistmentMonth,
    enlistmentYear,
    militaryType
  ]);
  
  // 계산 결과
  const result = calculationResult;
  
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
                      <SelectTrigger id="calculatorEnlistmentYear" className="w-full bg-white border border-gray-200 rounded-lg">
                        <SelectValue placeholder="입대 연도 선택" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                        <SelectItem value="2024" className="cursor-pointer">2024년</SelectItem>
                        <SelectItem value="2025" className="cursor-pointer">2025년</SelectItem>
                        <SelectItem value="2026" className="cursor-pointer">2026년</SelectItem>
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
                      <SelectTrigger id="calculatorEnlistmentMonth" className="w-full bg-white border border-gray-200 rounded-lg">
                        <SelectValue placeholder="입대 월 선택" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                        {enlistmentMonthOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="cursor-pointer">
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
                      <SelectTrigger id="calculatorMilitaryType" className="w-full bg-white border border-gray-200 rounded-lg">
                        <SelectValue placeholder="군종 선택" />
                      </SelectTrigger>
                      <SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200">
                        <SelectItem value="육군/해병대" className="cursor-pointer">육군/해병대 (18개월)</SelectItem>
                        <SelectItem value="해군" className="cursor-pointer">해군 (20개월)</SelectItem>
                        <SelectItem value="공군" className="cursor-pointer">공군 (21개월)</SelectItem>
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
                    <SelectTrigger id="interestRate" className="w-full bg-white border border-gray-200 rounded-lg">
                      <SelectValue placeholder="금리 선택" />
                    </SelectTrigger>
                    <SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200 max-h-[200px] overflow-y-auto">
                      {Array.from({ length: 31 }, (_, i) => (5 + i * 0.1).toFixed(1)).map((rate) => (
                        <SelectItem key={rate} value={rate} className="cursor-pointer">
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
                    <br />
                    {(militaryType === "육군" || militaryType === "해병대") && "* 이병/일병/상병/병장 복무 기간을 2/6/6/4개월로 계산하였습니다."}
                    {militaryType === "해군" && "* 이병/일병/상병/병장 복무 기간을 2/6/6/6개월로 계산하였습니다."}
                    {militaryType === "공군" && "* 이병/일병/상병/병장 복무 기간을 2/6/6/7개월로 계산하였습니다."}
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