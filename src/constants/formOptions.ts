import { 
  AttendanceType, 
  BonusPointType, 
  CertificateType, 
  MajorType, 
  SoldierType 
} from "@/types";

// 군인 유형 옵션
export const SOLDIER_TYPE_OPTIONS = [
  { value: 'general' as SoldierType, label: '일반기술병(일반직종)' },
  { value: 'specialized' as SoldierType, label: '전문기술병(화생방, 의무, 기계, 통신전자전기, 차량정비, 차량운전, 전자계산)' }
];

// 자격/면허 옵션
export const CERTIFICATE_OPTIONS = {
  general: [
    { value: 'nationalEngineer' as CertificateType, label: '국가기술자격증 - 기사 이상 (70점)' },
    { value: 'nationalIndustrial' as CertificateType, label: '국가기술자격증 - 산업기사 (68점)' },
    { value: 'nationalTechnician' as CertificateType, label: '국가기술자격증 - 기능사 (66점)' },
    { value: 'learningL6L5' as CertificateType, label: '일학습병행 자격증 - L6, L5 (70점)' },
    { value: 'learningL4L3' as CertificateType, label: '일학습병행 자격증 - L4, L3 (68점)' },
    { value: 'learningL2' as CertificateType, label: '일학습병행 자격증 - L2 (66점)' },
    { value: 'certified' as CertificateType, label: '일반자격증 - 공인 (64점)' },
    { value: 'uncertified' as CertificateType, label: '일반자격증 - 비공인 (62점)' },
    { value: 'none' as CertificateType, label: '미소지 (60점)' }
  ],
  specialized: [
    { value: 'nationalEngineer' as CertificateType, label: '국가기술자격증 - 기사 이상 (50점)' },
    { value: 'nationalIndustrial' as CertificateType, label: '국가기술자격증 - 산업기사 (45점)' },
    { value: 'nationalTechnician' as CertificateType, label: '국가기술자격증 - 기능사 (40점)' },
    { value: 'learningL6L5' as CertificateType, label: '일학습병행 자격증 - L6, L5 (50점)' },
    { value: 'learningL4L3' as CertificateType, label: '일학습병행 자격증 - L4, L3 (45점)' },
    { value: 'learningL2' as CertificateType, label: '일학습병행 자격증 - L2 (40점)' },
    { value: 'certified' as CertificateType, label: '일반자격증 - 공인 (30점)' },
    { value: 'uncertified' as CertificateType, label: '일반자격증 - 비공인 (26점)' },
    { value: 'largeSpecial' as CertificateType, label: '운전면허증 - 대형/특수 (차량운전 직종만) (50점)' },
    { value: 'type1Manual' as CertificateType, label: '운전면허증 - 1종보통(수동) (차량운전 직종만) (45점)' },
    { value: 'type2Manual' as CertificateType, label: '운전면허증 - 2종보통(수동) (차량운전 직종만) (40점)' },
    { value: 'none' as CertificateType, label: '미소지 (20점)' }
  ]
};

// 전공 옵션
export const MAJOR_OPTIONS = [
  { value: 'university4YearCompleted' as MajorType, label: '4년제 대학 수료 (40점)' },
  { value: 'university4YearInProgress' as MajorType, label: '4년제 대학 재학 (38점)' },
  { value: 'university3YearCompleted' as MajorType, label: '3년제 대학 수료 (36점)' },
  { value: 'university3YearInProgress' as MajorType, label: '3년제 대학 재학 (34점)' },
  { value: 'university2YearCompleted' as MajorType, label: '2년제 대학 수료 (32점)' },
  { value: 'university2YearInProgress' as MajorType, label: '2년제 대학 재학 (30점)' },
  { value: 'university1YearCompleted' as MajorType, label: '1년제 대학 수료 (28점)' },
  { value: 'university1YearInProgress' as MajorType, label: '1년제 대학 재학 (26점)' },
  { value: 'highSchoolRelated' as MajorType, label: '고졸 전공 (34점)' },
  { value: 'highSchoolUnrelated' as MajorType, label: '고졸 비전공 (20점)' },
  { value: 'polytechnic2Year' as MajorType, label: '한국폴리텍대학/인력개발원 - 2년 이상 수료 (32점)' },
  { value: 'polytechnic1Year' as MajorType, label: '한국폴리텍대학/인력개발원 - 1년 이상 수료 (30점)' },
  { value: 'polytechnic6Month' as MajorType, label: '한국폴리텍대학/인력개발원 - 6개월 이상 수료 (26점)' },
  { value: 'creditBank40' as MajorType, label: '학점은행제 - 40학점 이상 (28점)' },
  { value: 'creditBank80' as MajorType, label: '학점은행제 - 80학점 이상 (32점)' },
  { value: 'creditBank120' as MajorType, label: '학점은행제 - 120학점 이상 (36점)' },
  { value: 'creditBank140' as MajorType, label: '학점은행제 - 140학점 이상 (40점)' },
  { value: 'nonMajor' as MajorType, label: '비전공/고퇴이하 (20점)' }
];

// 출결 상황 옵션
export const ATTENDANCE_OPTIONS = {
  general: [
    { value: 'absence0' as AttendanceType, label: '결석 0일 (20점)' },
    { value: 'absence1to2' as AttendanceType, label: '결석 1~2일 (19점)' },
    { value: 'absence3to4' as AttendanceType, label: '결석 3~4일 (18점)' },
    { value: 'absence5to6' as AttendanceType, label: '결석 5~6일 (17점)' },
    { value: 'absence7plus' as AttendanceType, label: '결석 7일 이상 (16점)' }
  ],
  specialized: [
    { value: 'absence0' as AttendanceType, label: '결석 0일 (10점)' },
    { value: 'absence1to2' as AttendanceType, label: '결석 1~2일 (9점)' },
    { value: 'absence3to4' as AttendanceType, label: '결석 3~4일 (8점)' },
    { value: 'absence5to6' as AttendanceType, label: '결석 5~6일 (7점)' },
    { value: 'absence7plus' as AttendanceType, label: '결석 7일 이상 (6점)' }
  ]
};

// 가산점 옵션
export const BONUS_POINT_OPTIONS = [
  { 
    category: '신분 관련',
    options: [
      { value: 'nationalMerit' as BonusPointType, label: '국가 유공자 자녀, 독립유공자 자녀/손자녀 (4점)' },
      { value: 'voluntaryEnlistment' as BonusPointType, label: '질병치유 자진입대 (4점)' },
      { value: 'overseasResident' as BonusPointType, label: '국외이주자 중 현역복무지원자 (4점)' }
    ]
  },
  {
    category: '가족 관련',
    options: [
      { value: 'multiChild3' as BonusPointType, label: '다자녀(3명 이상) 가정자녀 (4점)' },
      { value: 'multiChild2' as BonusPointType, label: '다자녀(2인) 가정자녀 (2점)' },
      { value: 'economicDisadvantage' as BonusPointType, label: '경제적 약자 지원대상(생계급여 수급자) (4점)' }
    ]
  },
  {
    category: '사회봉사활동 (같은 종류 중복 불가)',
    options: [
      { value: 'volunteerHours8' as BonusPointType, label: '사회봉사 8시간 이상 (1점)' },
      { value: 'volunteerHours16' as BonusPointType, label: '사회봉사 16시간 이상 (2점)' },
      { value: 'volunteerHours24' as BonusPointType, label: '사회봉사 24시간 이상 (3점)' },
      { value: 'volunteerHours32' as BonusPointType, label: '사회봉사 32시간 이상 (4점)' },
      { value: 'volunteerHours40' as BonusPointType, label: '사회봉사 40시간 이상 (5점)' },
      { value: 'volunteerHours48' as BonusPointType, label: '사회봉사 48시간 이상 (6점)' },
      { value: 'volunteerHours56' as BonusPointType, label: '사회봉사 56시간 이상 (7점)' },
      { value: 'volunteerHours64' as BonusPointType, label: '사회봉사 64시간 이상 (8점)' }
    ]
  },
  {
    category: '헌혈 (같은 종류 중복 불가)',
    options: [
      { value: 'bloodDonation1' as BonusPointType, label: '헌혈 1회 (1점)' },
      { value: 'bloodDonation2' as BonusPointType, label: '헌혈 2회 (2점)' },
      { value: 'bloodDonation3' as BonusPointType, label: '헌혈 3회 (3점)' },
      { value: 'bloodDonation4' as BonusPointType, label: '헌혈 4회 (4점)' },
      { value: 'bloodDonation5' as BonusPointType, label: '헌혈 5회 (5점)' },
      { value: 'bloodDonation6' as BonusPointType, label: '헌혈 6회 (6점)' },
      { value: 'bloodDonation7' as BonusPointType, label: '헌혈 7회 (7점)' },
      { value: 'bloodDonation8' as BonusPointType, label: '헌혈 8회 (8점)' }
    ]
  },
  {
    category: '특기 관련',
    options: [
      { value: 'designatedSpecialty' as BonusPointType, label: '지정특기(방공포, 군사경찰, 조리) (4점)' },
      { value: 'chemicalDriverLicense' as BonusPointType, label: '화생방 직종(2종 보통 이상 운전면허소지자) (4점)' },
      { value: 'aircraftMaintenance' as BonusPointType, label: '항공정비사(기사급) 또는 항공정비 기초인력 인증서 소지자 (4점)' },
      { value: 'careerDesignRecommendation' as BonusPointType, label: '병역진로설계 군 추천특기 지원자 (1점)' }
    ]
  },
  {
    category: '자격증 관련',
    options: [
      { value: 'koreanHistory34' as BonusPointType, label: '한국사능력검정 3, 4급 (1점)' },
      { value: 'koreanHistory12' as BonusPointType, label: '한국사능력검정 1, 2급 (2점)' },
      { value: 'koreanLanguage34' as BonusPointType, label: '한국어능력시험 3, 4급 (1점)' },
      { value: 'koreanLanguage12' as BonusPointType, label: '한국어능력시험 1, 2급 (2점)' }
    ]
  },
  {
    category: '영어 성적',
    options: [
      { value: 'englishToeic520to729' as BonusPointType, label: 'TOEIC 520 ~ 729 (1점)' },
      { value: 'englishToeic730plus' as BonusPointType, label: 'TOEIC 730 이상 (2점)' },
      { value: 'englishToefl59to81' as BonusPointType, label: 'TOEFL 59 ~ 81 (1점)' },
      { value: 'englishToefl82plus' as BonusPointType, label: 'TOEFL 82 이상 (2점)' },
      { value: 'englishTeps201to276' as BonusPointType, label: 'New TEPS 201 ~ 276 (1점)' },
      { value: 'englishTeps277plus' as BonusPointType, label: 'New TEPS 277 이상 (2점)' }
    ]
  }
]; 