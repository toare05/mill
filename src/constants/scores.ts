import { 
  AttendanceType, 
  BonusPointType, 
  CertificateType, 
  MajorType, 
  SoldierType 
} from "@/types";

// 자격/면허 점수 테이블
export const CERTIFICATE_SCORES: Record<SoldierType, Record<CertificateType, number>> = {
  general: {
    nationalEngineer: 70,
    nationalIndustrial: 68,
    nationalTechnician: 66,
    learningL6L5: 70,
    learningL4L3: 68,
    learningL2: 66,
    certified: 64,
    uncertified: 62,
    largeSpecial: 0, // 일반기술병에는 해당 없음
    type1Manual: 0, // 일반기술병에는 해당 없음
    type2Manual: 0, // 일반기술병에는 해당 없음
    none: 60
  },
  specialized: {
    nationalEngineer: 50,
    nationalIndustrial: 45,
    nationalTechnician: 40,
    learningL6L5: 50,
    learningL4L3: 45,
    learningL2: 40,
    certified: 30,
    uncertified: 26,
    largeSpecial: 50, // 차량운전 직종에만 해당
    type1Manual: 45, // 차량운전 직종에만 해당
    type2Manual: 40, // 차량운전 직종에만 해당
    none: 20
  }
};

// 전공 점수 테이블
export const MAJOR_SCORES: Record<SoldierType, Record<MajorType, number>> = {
  general: {
    // 일반기술병은 전공 점수가 없음
    university4YearCompleted: 0,
    university4YearInProgress: 0,
    university3YearCompleted: 0,
    university3YearInProgress: 0,
    university2YearCompleted: 0,
    university2YearInProgress: 0,
    university1YearCompleted: 0,
    university1YearInProgress: 0,
    highSchoolRelated: 0,
    highSchoolUnrelated: 0,
    polytechnic2Year: 0,
    polytechnic1Year: 0,
    polytechnic6Month: 0,
    creditBank40: 0,
    creditBank80: 0,
    creditBank120: 0,
    creditBank140: 0,
    nonMajor: 0
  },
  specialized: {
    university4YearCompleted: 40,
    university4YearInProgress: 38,
    university3YearCompleted: 36,
    university3YearInProgress: 34,
    university2YearCompleted: 32,
    university2YearInProgress: 30,
    university1YearCompleted: 28,
    university1YearInProgress: 26,
    highSchoolRelated: 34,
    highSchoolUnrelated: 20,
    polytechnic2Year: 32,
    polytechnic1Year: 30,
    polytechnic6Month: 26,
    creditBank40: 28,
    creditBank80: 32,
    creditBank120: 36,
    creditBank140: 40,
    nonMajor: 20
  }
};

// 출결 점수 테이블
export const ATTENDANCE_SCORES: Record<SoldierType, Record<AttendanceType, number>> = {
  general: {
    absence0: 20,
    absence1to2: 19,
    absence3to4: 18,
    absence5to6: 17,
    absence7plus: 16
  },
  specialized: {
    absence0: 10,
    absence1to2: 9,
    absence3to4: 8,
    absence5to6: 7,
    absence7plus: 6
  }
};

// 가산점 점수 테이블
export const BONUS_POINT_SCORES: Record<BonusPointType, number> = {
  nationalMerit: 4,
  voluntaryEnlistment: 4,
  overseasResident: 4,
  multiChild3: 4,
  multiChild2: 2,
  economicDisadvantage: 4,
  volunteerHours8: 1,
  volunteerHours16: 2,
  volunteerHours24: 3,
  volunteerHours32: 4,
  volunteerHours40: 5,
  volunteerHours48: 6,
  volunteerHours56: 7,
  volunteerHours64: 8,
  bloodDonation1: 1,
  bloodDonation2: 2,
  bloodDonation3: 3,
  bloodDonation4: 4,
  bloodDonation5: 5,
  bloodDonation6: 6,
  bloodDonation7: 7,
  bloodDonation8: 8,
  designatedSpecialty: 4,
  chemicalDriverLicense: 4,
  aircraftMaintenance: 4,
  careerDesignRecommendation: 1,
  koreanHistory34: 1,
  koreanHistory12: 2,
  koreanLanguage34: 1,
  koreanLanguage12: 2,
  englishToeic520to729: 1,
  englishToeic730plus: 2,
  englishToefl59to81: 1,
  englishToefl82plus: 2,
  englishTeps201to276: 1,
  englishTeps277plus: 2
};

// 가산점 최대 점수
export const MAX_BONUS_POINTS = 15;

// 군인 유형별 최대 점수 (면접 제외)
export const MAX_SCORES: Record<SoldierType, number> = {
  general: 105, // 자격/면허(70) + 출결(20) + 가산점(15)
  specialized: 115 // 자격/면허(50) + 전공(40) + 출결(10) + 가산점(15)
}; 