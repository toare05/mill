import { useState, useCallback, useMemo } from 'react';
import { 
  SavingsInputData, 
  CalculationBreakdown, 
  CalculationResult 
} from '@/types';

export function useSavingsCalculator() {
  // 기본 금리 설정
  const defaultInterestRate = 5.0;

  // 입력 데이터 상태
  const [inputData, setInputData] = useState<SavingsInputData>({
    monthlySavings: 10,
    serviceMonths: 18,
    interestRate: defaultInterestRate,
    governmentMatch: true,
    isYear2025: false,
    militaryRank: '',
    monthlySavings2024: 10,
    monthlySavings2025: 10
  });

  // 금리 정보 표시 상태
  const [showRateInfo, setShowRateInfo] = useState(false);

  // 월 납입액 변경 핸들러
  const handleMonthlySavingsChange = useCallback((value: number) => {
    setInputData(prev => ({ ...prev, monthlySavings: value }));
  }, []);

  // 복무 개월 수 변경 핸들러
  const handleServiceMonthsChange = useCallback((value: number) => {
    setInputData(prev => ({ ...prev, serviceMonths: value }));
  }, []);

  // 금리 변경 핸들러
  const handleInterestRateChange = useCallback((value: number) => {
    setInputData(prev => ({ ...prev, interestRate: value }));
  }, []);

  // 정부 매칭 지원금 변경 핸들러
  const handleGovernmentMatchChange = useCallback((value: boolean) => {
    setInputData(prev => ({ ...prev, governmentMatch: value }));
  }, []);

  // 2025년 이후 납입 여부 변경 핸들러
  const handleIsYear2025Change = useCallback((value: boolean) => {
    setInputData(prev => ({ ...prev, isYear2025: value }));
  }, []);

  // 군 계급 변경 핸들러
  const handleMilitaryRankChange = useCallback((value: string) => {
    setInputData(prev => ({ ...prev, militaryRank: value }));
  }, []);

  // 2024년 월 납입액 변경 핸들러
  const handleMonthlySavings2024Change = useCallback((value: number) => {
    setInputData(prev => ({ ...prev, monthlySavings2024: value }));
  }, []);

  // 2025년 월 납입액 변경 핸들러
  const handleMonthlySavings2025Change = useCallback((value: number) => {
    setInputData(prev => ({ ...prev, monthlySavings2025: value }));
  }, []);

  // 금리 정보 토글 핸들러
  const toggleRateInfo = useCallback(() => {
    setShowRateInfo(prev => !prev);
  }, []);

  // 계산 결과
  const calculationResult = useMemo<CalculationResult>(() => {
    // 월 납입액 (만원 단위를 원 단위로 변환)
    const monthlySavingsWon = inputData.monthlySavings * 10000;
    
    // 총 납입액
    const totalDeposit = monthlySavingsWon * inputData.serviceMonths;
    
    // 정부 매칭 지원금 (월 납입액의 1/3, 최대 15만원)
    const monthlyGovernmentMatch = inputData.governmentMatch 
      ? Math.min(monthlySavingsWon / 3, 150000) 
      : 0;
    const totalGovernmentMatch = monthlyGovernmentMatch * inputData.serviceMonths;
    
    // 이자 계산 (단리)
    const annualInterestRate = inputData.interestRate / 100;
    
    // 기본 이자 (본인 납입액에 대한 이자)
    let baseInterest = 0;
    for (let i = 1; i <= inputData.serviceMonths; i++) {
      const remainingMonths = inputData.serviceMonths - i;
      const monthlyInterest = monthlySavingsWon * annualInterestRate * (remainingMonths / 12);
      baseInterest += monthlyInterest;
    }
    
    // 추가 이자 (정부 매칭 지원금에 대한 이자)
    let additionalInterest = 0;
    if (inputData.governmentMatch) {
      for (let i = 1; i <= inputData.serviceMonths; i++) {
        const remainingMonths = inputData.serviceMonths - i;
        const monthlyInterest = monthlyGovernmentMatch * annualInterestRate * (remainingMonths / 12);
        additionalInterest += monthlyInterest;
      }
    }
    
    // 총 수령액
    const totalAmount = totalDeposit + baseInterest + totalGovernmentMatch + additionalInterest;
    
    return {
      totalAmount: Math.round(totalAmount),
      breakdown: {
        totalDeposit,
        baseInterest: Math.round(baseInterest),
        additionalInterest: Math.round(additionalInterest),
        governmentMatch: totalGovernmentMatch
      }
    };
  }, [inputData]);

  return {
    inputData,
    showRateInfo,
    calculationResult,
    handleMonthlySavingsChange,
    handleServiceMonthsChange,
    handleInterestRateChange,
    handleGovernmentMatchChange,
    handleIsYear2025Change,
    handleMilitaryRankChange,
    handleMonthlySavings2024Change,
    handleMonthlySavings2025Change,
    toggleRateInfo
  };
} 