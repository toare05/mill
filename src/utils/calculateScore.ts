import { 
  ATTENDANCE_SCORES, 
  BONUS_POINT_SCORES, 
  CERTIFICATE_SCORES, 
  MAJOR_SCORES, 
  MAX_BONUS_POINTS 
} from "@/constants/scores";
import { ScoreResult, UserInputData } from "@/types";

// 2025년 9월 이후 입대인지 확인하는 함수
const isAfterSep2025 = (recruitmentMonth: string): boolean => {
  const yearMatch = recruitmentMonth.match(/(\d{4})년/);
  const monthMatch = recruitmentMonth.match(/(\d{1,2})월/);
  
  if (!yearMatch || !monthMatch) return false;
  
  const year = parseInt(yearMatch[1]);
  const month = parseInt(monthMatch[1]);
  
  return (year > 2025) || (year === 2025 && month >= 9);
};

export function calculateScore(userData: UserInputData): ScoreResult {
  // 자격/면허 점수 계산
  let certificateScore = CERTIFICATE_SCORES[userData.soldierType][userData.certificate];
  
  // 운전면허 관련 자격증은 차량운전 특기일 때만 점수 부여
  if (userData.soldierType === 'specialized' && 
      ['largeSpecial', 'type1Manual', 'type2Manual'].includes(userData.certificate) && 
      userData.specialty !== 'driving') {
    // 차량운전 특기가 아닌 경우 'none'과 동일한 점수 부여
    certificateScore = CERTIFICATE_SCORES[userData.soldierType]['none'];
  }
  
  // 전공 점수 계산
  const majorScore = MAJOR_SCORES[userData.soldierType][userData.major];
  
  // 출결 점수 계산
  const attendanceScore = ATTENDANCE_SCORES[userData.soldierType][userData.attendance];
  
  // 가산점 계산
  // 사회봉사활동 점수와 헌혈 점수는 별도로 계산 후 합산 (최대 8점)
  const volunteerPoints = userData.bonusPoints
    .find(bp => bp.startsWith('volunteerHours'));
  
  const bloodDonationPoints = userData.bonusPoints
    .find(bp => bp.startsWith('bloodDonation'));
  
  // 사회봉사활동 점수
  const volunteerBonusPoints = volunteerPoints ? BONUS_POINT_SCORES[volunteerPoints] : 0;
  
  // 헌혈 점수
  const bloodDonationBonusPoints = bloodDonationPoints ? BONUS_POINT_SCORES[bloodDonationPoints] : 0;
  
  // 사회봉사활동과 헌혈 점수의 합계 (최대 8점)
  const socialBonusPoints = Math.min(volunteerBonusPoints + bloodDonationBonusPoints, 8);
  
  // 2025년 9월 이후 입대인지 확인
  const isAfterSeptember2025 = isAfterSep2025(userData.recruitmentMonth);
  
  // 기타 가산점 계산 (사회봉사활동과 헌혈 제외)
  const otherBonusPoints = userData.bonusPoints
    .filter(bp => !bp.startsWith('volunteerHours') && !bp.startsWith('bloodDonation'))
    .filter(bp => {
      // 2025년 9월 이후 입대자는 한국사 능력검정과 한국어능력시험 가산점 제외
      if (isAfterSeptember2025 && (bp.startsWith('koreanHistory') || bp.startsWith('koreanLanguage'))) {
        return false;
      }
      return true;
    })
    .reduce((sum, bp) => sum + BONUS_POINT_SCORES[bp], 0);
  
  // 총 가산점 (최대 15점)
  const bonusPointsScore = Math.min(socialBonusPoints + otherBonusPoints, MAX_BONUS_POINTS);
  
  // 총점 계산
  const totalScore = certificateScore + majorScore + attendanceScore + bonusPointsScore;
  
  return {
    certificateScore,
    majorScore,
    attendanceScore,
    bonusPointsScore,
    totalScore
  };
} 