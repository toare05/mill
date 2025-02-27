"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  SPECIALTY_DISPLAY_NAMES, 
  getCutoffScore,
  getPreviousMonthCutoffScore,
  getLastYearSameMonthCutoffScore
} from "@/constants/cutoffScores";
import { ScoreResult as ScoreResultType, SoldierType, SpecialtyType } from "@/types";

interface ScoreResultProps {
  scoreResult: ScoreResultType;
  soldierType: SoldierType;
  maxScore: number;
  recruitmentMonth: string;
  specialty: SpecialtyType;
}

export default function ScoreResult({ 
  scoreResult, 
  soldierType, 
  maxScore,
  recruitmentMonth,
  specialty
}: ScoreResultProps) {
  // 점수 퍼센트 계산
  const calculatePercent = (score: number, max: number) => {
    return Math.round((score / max) * 100);
  };

  // 총점 퍼센트
  const totalPercent = calculatePercent(scoreResult.totalScore, maxScore);

  // 점수 바 색상 결정
  const getScoreBarColor = (percent: number) => {
    if (percent >= 90) return "bg-green-500";
    if (percent >= 70) return "bg-blue-500";
    if (percent >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  // 커트라인 비교 관련 로직
  // 특기 표시 이름
  const specialtyDisplayName = SPECIALTY_DISPLAY_NAMES[specialty];
  
  // 모집월 파싱 (예: "24.5" -> { year: 24, month: 5 })
  const [yearStr, monthStr] = recruitmentMonth.split('.');
  const year = parseInt(yearStr);
  const month = parseInt(monthStr);
  
  // 이전 달 데이터
  const previousMonthData = getPreviousMonthCutoffScore(year, month, specialtyDisplayName);
  
  // 작년 같은 달 데이터
  const lastYearData = getLastYearSameMonthCutoffScore(year, month, specialtyDisplayName);
  
  // 현재 점수와 커트라인 비교
  const getComparisonResult = (cutoffScore: number | null) => {
    if (cutoffScore === null) return null;
    
    const diff = scoreResult.totalScore - cutoffScore;
    
    if (diff >= 0) {
      return {
        status: "pass",
        diff: diff,
        message: `커트라인보다 ${diff.toFixed(1)}점 높음`
      };
    } else {
      return {
        status: "fail",
        diff: Math.abs(diff),
        message: `커트라인보다 ${Math.abs(diff).toFixed(1)}점 낮음`
      };
    }
  };
  
  const previousComparison = previousMonthData && previousMonthData.score !== null 
    ? getComparisonResult(previousMonthData.score) 
    : null;
  
  const lastYearComparison = lastYearData && lastYearData.score !== null 
    ? getComparisonResult(lastYearData.score) 
    : null;
  
  // 상태에 따른 색상 클래스
  const getStatusColorClass = (status: string | null) => {
    if (status === "pass") return "text-green-600";
    if (status === "fail") return "text-red-600";
    return "text-gray-500";
  };

  return (
    <div className="sticky top-8">
      <Card className="apple-card">
        <CardHeader className="apple-card-header">
          <CardTitle>1차 점수 결과</CardTitle>
        </CardHeader>
        <CardContent className="apple-card-content">
          <div className="space-y-6">
            {/* 총점 */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">총점</h3>
                <span className="text-2xl font-bold">
                  {scoreResult.totalScore} / {maxScore}
                </span>
              </div>
              <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getScoreBarColor(totalPercent)}`}
                  style={{ width: `${totalPercent}%` }}
                ></div>
              </div>
              <p className="text-right text-sm text-gray-500">
                {totalPercent}%
              </p>
            </div>

            {/* 세부 점수 */}
            <div className="space-y-4">
              <h4 className="font-medium">세부 점수</h4>
              
              {/* 자격/면허 점수 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">자격/면허</span>
                  <span className="font-medium">
                    {scoreResult.certificateScore} / {soldierType === 'general' ? 70 : 50}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-400"
                    style={{ 
                      width: `${calculatePercent(
                        scoreResult.certificateScore, 
                        soldierType === 'general' ? 70 : 50
                      )}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              {/* 전공 점수 (전문기술병만) */}
              {soldierType === 'specialized' && (
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">전공</span>
                    <span className="font-medium">{scoreResult.majorScore} / 40</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-400"
                      style={{ width: `${calculatePercent(scoreResult.majorScore, 40)}%` }}
                    ></div>
                  </div>
                </div>
              )}
              
              {/* 출결 점수 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">출결</span>
                  <span className="font-medium">
                    {scoreResult.attendanceScore} / {soldierType === 'general' ? 20 : 10}
                  </span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400"
                    style={{ 
                      width: `${calculatePercent(
                        scoreResult.attendanceScore, 
                        soldierType === 'general' ? 20 : 10
                      )}%` 
                    }}
                  ></div>
                </div>
              </div>
              
              {/* 가산점 */}
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-sm">가산점</span>
                  <span className="font-medium">{scoreResult.bonusPointsScore} / 15</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-purple-400"
                    style={{ width: `${calculatePercent(scoreResult.bonusPointsScore, 15)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* 커트라인 비교 섹션 */}
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-medium mb-3">커트라인 비교</h4>
              
              <div className="space-y-4">
                {/* 이전 달 커트라인 */}
                {previousMonthData && (
                  <div className="border-b pb-3">
                    <h3 className="font-medium text-sm text-gray-700 mb-1">
                      {previousMonthData.year}.{previousMonthData.month}월 모집 (이전 달)
                    </h3>
                    {previousMonthData.score !== null ? (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm">커트라인: <span className="font-medium">{previousMonthData.score}점</span></p>
                        </div>
                        {previousComparison && (
                          <div className={`text-sm font-medium ${getStatusColorClass(previousComparison.status)}`}>
                            {previousComparison.message}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">모집 정보 없음</p>
                    )}
                  </div>
                )}
                
                {/* 작년 같은 달 커트라인 */}
                {lastYearData && (
                  <div>
                    <h3 className="font-medium text-sm text-gray-700 mb-1">
                      {lastYearData.year}.{lastYearData.month}월 모집 (작년 동월)
                    </h3>
                    {lastYearData.score !== null ? (
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm">커트라인: <span className="font-medium">{lastYearData.score}점</span></p>
                        </div>
                        {lastYearComparison && (
                          <div className={`text-sm font-medium ${getStatusColorClass(lastYearComparison.status)}`}>
                            {lastYearComparison.message}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">모집 정보 없음</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-500">
                ※ 면접 점수는 포함되지 않은 1차 점수입니다.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 