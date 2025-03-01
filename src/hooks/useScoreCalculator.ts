import { useState, useCallback } from 'react';
import { 
  AttendanceType, 
  BonusPointType, 
  CertificateType, 
  MajorType, 
  SoldierType, 
  SpecialtyType,
  UserInputData,
  ScoreResult
} from '@/types';
import { calculateScore } from '@/utils/calculateScore';

/**
 * 점수 계산 기능을 제공하는 커스텀 훅
 */
export function useScoreCalculator() {
  const [userData, setUserData] = useState<UserInputData>({
    soldierType: 'specialized',
    certificate: 'none',
    major: 'nonMajor',
    attendance: 'absence0',
    bonusPoints: [],
    recruitmentMonth: '', // 모집 월 초기값
    specialty: 'general' // 특기 초기값
  });

  const [result, setResult] = useState<ScoreResult | null>(null);

  // 군인 유형 변경 핸들러
  const handleSoldierTypeChange = useCallback((type: SoldierType) => {
    setUserData(prev => ({ ...prev, soldierType: type }));
  }, []);

  // 자격/면허 변경 핸들러
  const handleCertificateChange = useCallback((cert: CertificateType) => {
    setUserData(prev => ({ ...prev, certificate: cert }));
  }, []);

  // 전공 변경 핸들러
  const handleMajorChange = useCallback((major: MajorType) => {
    setUserData(prev => ({ ...prev, major: major }));
  }, []);

  // 출결 변경 핸들러
  const handleAttendanceChange = useCallback((attendance: AttendanceType) => {
    setUserData(prev => ({ ...prev, attendance: attendance }));
  }, []);

  // 가산점 변경 핸들러
  const handleBonusPointsChange = useCallback((bonusPoints: BonusPointType[]) => {
    setUserData(prev => ({ ...prev, bonusPoints: bonusPoints }));
  }, []);
  
  // 모집 월 변경 핸들러
  const handleRecruitmentMonthChange = useCallback((month: string) => {
    setUserData(prev => ({ ...prev, recruitmentMonth: month }));
  }, []);
  
  // 특기 변경 핸들러
  const handleSpecialtyChange = useCallback((specialty: SpecialtyType) => {
    setUserData(prev => ({ ...prev, specialty: specialty }));
  }, []);

  // 점수 계산 실행
  const calculateUserScore = useCallback(() => {
    const calculatedResult = calculateScore(userData);
    setResult(calculatedResult);
  }, [userData]);

  // 결과 초기화
  const resetResult = useCallback(() => {
    setResult(null);
  }, []);

  return {
    userData,
    result,
    handleSoldierTypeChange,
    handleCertificateChange,
    handleMajorChange,
    handleAttendanceChange,
    handleBonusPointsChange,
    handleRecruitmentMonthChange,
    handleSpecialtyChange,
    calculateUserScore,
    resetResult
  };
} 