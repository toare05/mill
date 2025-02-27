import { SpecialtyType } from "@/types";

// 년도와 월별로 정리된 커트라인 점수 데이터 타입
export interface CutoffScoresByMonth {
  [specialty: string]: number | null;
}

export interface CutoffScoresByYear {
  [month: number]: CutoffScoresByMonth;
}

export interface CutoffScores {
  [year: number]: CutoffScoresByYear;
}

// 커트라인 점수 데이터
export const CUTOFF_SCORES: CutoffScores = {
  24: {
    2: {
      "일반기술": 97.0,
      "전자계산": 95.0,
      "화생방": 76.0,
      "의무": 105.0,
      "기계": 71.0,
      "차량운전": 91.0,
      "차량정비": 70.0,
      "통신전자전기": 72.0
    },
    4: {
      "일반기술": 95.0,
      "전자계산": 85.0,
      "화생방": 76.0,
      "의무": 111.0,
      "기계": 69.0,
      "차량운전": 89.0,
      "차량정비": 57.0,
      "통신전자전기": 70.0
    },
    5: {
      "일반기술": 95.0,
      "전자계산": 93.0,
      "화생방": 75.0,
      "의무": 111.0,
      "기계": 64.0,
      "차량운전": 88.0,
      "차량정비": 56.0,
      "통신전자전기": 71.0
    },
    6: {
      "일반기술": 95.0,
      "전자계산": 91.0,
      "화생방": 75.0,
      "의무": 109.0,
      "기계": 69.0,
      "차량운전": 87.0,
      "차량정비": 70.0,
      "통신전자전기": 70.0
    },
    7: {
      "일반기술": 95.0,
      "전자계산": 92.0,
      "화생방": 75.0,
      "의무": 109.0,
      "기계": 66.0,
      "차량운전": 88.0,
      "차량정비": 63.0,
      "통신전자전기": 71.0
    },
    8: {
      "일반기술": 95.0,
      "전자계산": 92.0,
      "화생방": 74.0,
      "의무": 113.0,
      "기계": 62.0,
      "차량운전": 90.0,
      "차량정비": 55.0,
      "통신전자전기": 67.0
    },
    9: {
      "일반기술": 96.0,
      "전자계산": 93.0,
      "화생방": 85.0,
      "의무": 113.0,
      "기계": 69.0,
      "차량운전": 91.0,
      "차량정비": 63.0,
      "통신전자전기": 81.0
    },
    11: {
      "일반기술": 99.0,
      "전자계산": 98.0,
      "화생방": 82.0,
      "의무": 115.0,
      "기계": 86.0,
      "차량운전": 92.0,
      "차량정비": 83.0,
      "통신전자전기": 92.0
    },
    12: {
      "일반기술": 99.0,
      "전자계산": 91.0,
      "화생방": 82.0,
      "의무": 115.0,
      "기계": 92.0,
      "차량운전": 92.0,
      "차량정비": 83.0,
      "통신전자전기": 93.0
    }
  },
  25: {
    1: {
      "일반기술": 99.0,
      "전자계산": 92.0,
      "화생방": 85.0,
      "의무": 115.0,
      "기계": 90.0,
      "차량운전": 93.0,
      "차량정비": 75.0,
      "통신전자전기": 94.0
    },
    3: {
      "일반기술": 99.0,
      "전자계산": 96.0,
      "화생방": 77.0,
      "의무": 115.0,
      "기계": 89.0,
      "차량운전": 93.0,
      "차량정비": 72.0,
      "통신전자전기": 93.0
    }
  }
};

// 특기별 표시 이름 매핑 (간소화됨)
export const SPECIALTY_DISPLAY_NAMES: Record<SpecialtyType, string> = {
  "general": "일반기술",
  "electronic": "전자계산",
  "chemical": "화생방",
  "medical": "의무",
  "mechanical": "기계",
  "driving": "차량운전",
  "maintenance": "차량정비",
  "communication": "통신전자전기"
};

// 특기 타입과 표시 이름 매핑 (역방향)
export const SPECIALTY_TYPE_MAP: Record<string, SpecialtyType> = {
  "일반기술": "general",
  "전자계산": "electronic",
  "화생방": "chemical",
  "의무": "medical",
  "기계": "mechanical",
  "차량운전": "driving",
  "차량정비": "maintenance",
  "통신전자전기": "communication"
};

// 모집 월 옵션 생성
export const RECRUITMENT_MONTH_OPTIONS = (() => {
  const options = [];
  const currentYear = 25; // 2025년을 기본값으로 설정
  
  // 1월부터 12월까지 모든 월 추가
  for (let month = 1; month <= 12; month++) {
    options.push({
      value: `${currentYear}.${month}`,
      label: `${currentYear}.${month}월`
    });
  }
  
  // 기존 데이터에서 옵션 추가 (2024년 데이터)
  for (const year in CUTOFF_SCORES) {
    if (parseInt(year) !== currentYear) { // 현재 년도(2025)가 아닌 경우에만 추가
      for (const month in CUTOFF_SCORES[year]) {
        options.push({
          value: `${year}.${month}`,
          label: `${year}.${month}월`
        });
      }
    }
  }
  
  // 날짜 순으로 정렬
  options.sort((a, b) => {
    const [yearA, monthA] = a.value.split('.').map(Number);
    const [yearB, monthB] = b.value.split('.').map(Number);
    
    if (yearA !== yearB) {
      return yearB - yearA; // 년도 내림차순 (최신 년도가 먼저)
    }
    return monthA - monthB; // 월 오름차순
  });
  
  return options;
})();

// 특정 년도와 월의 커트라인 점수 가져오기
export function getCutoffScore(year: number, month: number, specialty: string): number | null {
  if (CUTOFF_SCORES[year] && CUTOFF_SCORES[year][month]) {
    return CUTOFF_SCORES[year][month][specialty] || null;
  }
  return null;
}

// 이전 달의 커트라인 점수 가져오기 (정확히 한 달 전)
export function getPreviousMonthCutoffScore(year: number, month: number, specialty: string): { year: number, month: number, score: number | null } | null {
  let prevYear = year;
  let prevMonth = month - 1;
  
  if (prevMonth === 0) {
    prevYear--;
    prevMonth = 12;
  }
  
  const score = getCutoffScore(prevYear, prevMonth, specialty);
  
  // 이전 달 정보 반환 (데이터가 없어도 이전 달 정보는 반환)
  return { year: prevYear, month: prevMonth, score };
}

// 작년 같은 달의 커트라인 점수 가져오기
export function getLastYearSameMonthCutoffScore(year: number, month: number, specialty: string): { year: number, month: number, score: number | null } | null {
  const lastYear = year - 1;
  const score = getCutoffScore(lastYear, month, specialty);
  
  // 작년 같은 달 정보 반환 (데이터가 없어도 작년 같은 달 정보는 반환)
  return { year: lastYear, month: month, score };
} 