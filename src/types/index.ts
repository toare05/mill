// 군인 유형
export type SoldierType = 'general' | 'specialized';

// 특기 유형
export type SpecialtyType = 
  | 'general'        // 일반(기술)
  | 'electronic'     // 전자계산(일반)
  | 'chemical'       // 화생방(전문기술)
  | 'medical'        // 의무(전문기술)
  | 'mechanical'     // 기계(전문기술)
  | 'driving'        // 차량운전(전문기술)
  | 'maintenance'    // 차량정비(전문기술)
  | 'communication'; // 통신전자전기(전문기술)

// 자격증 유형
export type CertificateType = 
  | 'nationalEngineer' // 기사 이상
  | 'nationalIndustrial' // 산업기사
  | 'nationalTechnician' // 기능사
  | 'learningL6L5' // 일학습병행 L6, L5
  | 'learningL4L3' // 일학습병행 L4, L3
  | 'learningL2' // 일학습병행 L2
  | 'certified' // 공인
  | 'uncertified' // 비공인
  | 'largeSpecial' // 대형/특수 (차량운전 직종만)
  | 'type1Manual' // 1종보통(수동) (차량운전 직종만)
  | 'type2Manual' // 2종보통(수동) (차량운전 직종만)
  | 'none'; // 미소지

// 전공 유형
export type MajorType = 
  | 'university4YearCompleted' // 4년제 대학 수료
  | 'university4YearInProgress' // 4년제 대학 재학
  | 'university3YearCompleted' // 3년제 대학 수료
  | 'university3YearInProgress' // 3년제 대학 재학
  | 'university2YearCompleted' // 2년제 대학 수료
  | 'university2YearInProgress' // 2년제 대학 재학
  | 'university1YearCompleted' // 1년제 대학 수료
  | 'university1YearInProgress' // 1년제 대학 재학
  | 'highSchoolRelated' // 고졸 전공
  | 'highSchoolUnrelated' // 고졸 비전공
  | 'polytechnic2Year' // 한국폴리텍대학 2년 이상 수료
  | 'polytechnic1Year' // 한국폴리텍대학 1년 이상 수료
  | 'polytechnic6Month' // 한국폴리텍대학 6개월 이상 수료
  | 'creditBank40' // 학점은행제 40학점 이상
  | 'creditBank80' // 학점은행제 80학점 이상
  | 'creditBank120' // 학점은행제 120학점 이상
  | 'creditBank140' // 학점은행제 140학점 이상
  | 'nonMajor'; // 비전공/고퇴이하

// 출결 상황
export type AttendanceType = 
  | 'absence0' // 0일
  | 'absence1to2' // 1~2일
  | 'absence3to4' // 3~4일
  | 'absence5to6' // 5~6일
  | 'absence7plus'; // 7일 이상

// 가산점 유형
export type BonusPointType = 
  | 'nationalMerit' // 국가 유공자 자녀, 독립유공자 자녀/손자녀
  | 'voluntaryEnlistment' // 질병치유 자진입대
  | 'overseasResident' // 국외이주자 중 현역복무지원자
  | 'multiChild3' // 다자녀(3명 이상) 가정자녀
  | 'multiChild2' // 다자녀(2인) 가정자녀
  | 'economicDisadvantage' // 경제적 약자 지원대상(생계급여 수급자)
  | 'volunteerHours8' // 사회봉사 8시간 이상
  | 'volunteerHours16' // 사회봉사 16시간 이상
  | 'volunteerHours24' // 사회봉사 24시간 이상
  | 'volunteerHours32' // 사회봉사 32시간 이상
  | 'volunteerHours40' // 사회봉사 40시간 이상
  | 'volunteerHours48' // 사회봉사 48시간 이상
  | 'volunteerHours56' // 사회봉사 56시간 이상
  | 'volunteerHours64' // 사회봉사 64시간 이상
  | 'bloodDonation1' // 헌혈 1회
  | 'bloodDonation2' // 헌혈 2회
  | 'bloodDonation3' // 헌혈 3회
  | 'bloodDonation4' // 헌혈 4회
  | 'bloodDonation5' // 헌혈 5회
  | 'bloodDonation6' // 헌혈 6회
  | 'bloodDonation7' // 헌혈 7회
  | 'bloodDonation8' // 헌혈 8회
  | 'designatedSpecialty' // 지정특기(방공포, 군사경찰, 조리)
  | 'chemicalDriverLicense' // 화생방 직종(2종 보통 이상 운전면허소지자)
  | 'aircraftMaintenance' // 항공정비사(기사급) 또는 항공정비 기초인력 인증서 소지자
  | 'careerDesignRecommendation' // 병역진로설계 군 추천특기 지원자
  | 'koreanHistory34' // 한국사능력검정 3, 4급
  | 'koreanHistory12' // 한국사능력검정 1, 2급
  | 'koreanLanguage34' // 한국어능력시험 3, 4급
  | 'koreanLanguage12' // 한국어능력시험 1, 2급
  | 'englishToeic520to729' // TOEIC 520 ~ 729
  | 'englishToeic730plus' // TOEIC 730 이상
  | 'englishToefl59to81' // TOEFL 59 ~ 81
  | 'englishToefl82plus' // TOEFL 82 이상
  | 'englishTeps201to276' // New TEPS 201 ~ 276
  | 'englishTeps277plus'; // New TEPS 277 이상

// 사용자 입력 데이터
export interface UserInputData {
  soldierType: SoldierType;
  certificate: CertificateType;
  major: MajorType;
  attendance: AttendanceType;
  bonusPoints: BonusPointType[];
  recruitmentMonth: string;
  specialty: SpecialtyType;
}

// 점수 결과
export interface ScoreResult {
  certificateScore: number;
  majorScore: number;
  attendanceScore: number;
  bonusPointsScore: number;
  totalScore: number;
} 