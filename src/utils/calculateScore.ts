import { 
  ATTENDANCE_SCORES, 
  BONUS_POINT_SCORES, 
  CERTIFICATE_SCORES, 
  MAJOR_SCORES, 
  MAX_BONUS_POINTS 
} from "@/constants/scores";
import { ScoreResult, UserInputData } from "@/types";

export function calculateScore(userData: UserInputData): ScoreResult {
  // 자격/면허 점수 계산
  const certificateScore = CERTIFICATE_SCORES[userData.soldierType][userData.certificate];
  
  // 전공 점수 계산
  const majorScore = MAJOR_SCORES[userData.soldierType][userData.major];
  
  // 출결 점수 계산
  const attendanceScore = ATTENDANCE_SCORES[userData.soldierType][userData.attendance];
  
  // 가산점 계산
  let bonusPointsScore = 0;
  
  // 사회봉사활동 점수 계산
  const volunteerBonusPoints = userData.bonusPoints
    .filter(bp => bp.startsWith('volunteerHours'))
    .map(bp => BONUS_POINT_SCORES[bp])
    .sort((a, b) => b - a)[0] || 0;
  
  // 헌혈 점수 계산
  const bloodDonationBonusPoints = userData.bonusPoints
    .filter(bp => bp.startsWith('bloodDonation'))
    .map(bp => BONUS_POINT_SCORES[bp])
    .sort((a, b) => b - a)[0] || 0;
  
  // 사회봉사활동과 헌혈 점수의 합계 (최대 8점)
  const socialBonusPoints = Math.min(volunteerBonusPoints + bloodDonationBonusPoints, 8);
  
  // 기타 가산점 계산
  const otherBonusPoints = userData.bonusPoints
    .filter(bp => !bp.startsWith('volunteerHours') && !bp.startsWith('bloodDonation'))
    .reduce((sum, bp) => sum + BONUS_POINT_SCORES[bp], 0);
  
  // 총 가산점 (최대 15점)
  bonusPointsScore = Math.min(socialBonusPoints + otherBonusPoints, MAX_BONUS_POINTS);
  
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