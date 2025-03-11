import { SpecialtyType } from "@/types";

// 모집 월 옵션
export const RECRUITMENT_MONTH_OPTIONS = (() => {
  const options = [];
  
  // 2024년 5월부터 2025년 12월까지
  for (let year = 2024; year <= 2025; year++) {
    const startMonth = year === 2024 ? 5 : 1;
    const endMonth = 12;
    
    for (let month = startMonth; month <= endMonth; month++) {
      options.push({
        value: `${year}년 ${month}월`,
        label: `${year}년 ${month}월`
      });
    }
  }
  
  return options;
})(); 