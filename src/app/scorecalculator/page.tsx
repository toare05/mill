"use client";

import { useCallback, useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  AttendanceType, 
  BonusPointType, 
  CertificateType, 
  MajorType, 
  SoldierType, 
  SpecialtyType,
  UserInputData 
} from "@/types";
import { calculateScore } from "@/utils/calculateScore";
import { MAX_SCORES } from "@/constants/scores";
import ScoreForm from "@/components/features/score-calculator/ScoreForm";
import ScoreResultComponent from "@/components/features/score-calculator/ScoreResult";
import { RECRUITMENT_MONTH_OPTIONS } from "@/constants/cutoffScores";
import Link from "next/link";

export default function ScoreCalculator() {
  // 초기 사용자 입력 데이터
  const initialUserData: UserInputData = {
    soldierType: "general",
    certificate: "none",
    major: "nonMajor",
    attendance: "absence0",
    bonusPoints: [],
    recruitmentMonth: "2025년 10월", // 기본값을 2025년 8월로 설정
    specialty: "general" // 기본값은 일반(기술)
  };

  // 사용자 입력 데이터 상태
  const [userData, setUserData] = useState<UserInputData>(initialUserData);
  
  // 점수 계산 결과
  const scoreResult = useMemo(() => calculateScore(userData), [userData]);
  
  // 군인 유형 변경 핸들러
  const handleSoldierTypeChange = useCallback((type: SoldierType) => {
    let specialty: SpecialtyType = "general";
    
    // 군인 유형에 따라 기본 특기 설정
    if (type === "general") {
      specialty = "general"; // 일반기술병은 일반기술 하나만 있음
    } else if (type === "specialized") {
      specialty = "electronic"; // 전문기술병의 경우 전자계산을 기본값으로
    }
    
    setUserData(prevData => ({
      ...prevData,
      soldierType: type,
      specialty
    }));
  }, []);
  
  // 자격/면허 변경 핸들러
  const handleCertificateChange = useCallback((cert: CertificateType) => {
    setUserData(prevData => ({
      ...prevData,
      certificate: cert
    }));
  }, []);
  
  // 전공 변경 핸들러
  const handleMajorChange = useCallback((major: MajorType) => {
    setUserData(prevData => ({
      ...prevData,
      major
    }));
  }, []);
  
  // 출결 상황 변경 핸들러
  const handleAttendanceChange = useCallback((attendance: AttendanceType) => {
    setUserData(prevData => ({
      ...prevData,
      attendance
    }));
  }, []);
  
  // 가산점 변경 핸들러
  const handleBonusPointsChange = useCallback((bonusPoints: BonusPointType[]) => {
    setUserData(prevData => ({
      ...prevData,
      bonusPoints
    }));
  }, []);
  
  // 지원 월 변경 핸들러
  const handleRecruitmentMonthChange = useCallback((month: string) => {
    setUserData(prevData => ({
      ...prevData,
      recruitmentMonth: month
    }));
  }, []);
  
  // 특기 변경 핸들러
  const handleSpecialtyChange = useCallback((specialty: SpecialtyType) => {
    setUserData(prevData => ({
      ...prevData,
      specialty
    }));
  }, []);
  
  // 특기 옵션 생성
  const specialtyOptions = useMemo(() => {
    if (userData.soldierType === "general") {
      return [
        { value: "general" as SpecialtyType, label: "일반기술" }
      ];
    } else {
      return [
        { value: "electronic" as SpecialtyType, label: "전자계산" },
        { value: "chemical" as SpecialtyType, label: "화생방" },
        { value: "medical" as SpecialtyType, label: "의무" },
        { value: "mechanical" as SpecialtyType, label: "기계" },
        { value: "driving" as SpecialtyType, label: "차량운전" },
        { value: "maintenance" as SpecialtyType, label: "차량정비" },
        { value: "communication" as SpecialtyType, label: "통신전자전기" }
      ];
    }
  }, [userData.soldierType]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">공군 지원 1차 점수 계산기</h1>
          <p className="text-gray-600">자격/면허, 전공, 출결, 가산점을 입력하여 1차 점수를 계산해보세요.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 입력 폼 */}
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
              <CardContent className="p-6">
                {/* 지원 월 선택 */}
                <div className="mb-6">
                  <Label htmlFor="recruitmentMonth" className="text-base font-medium text-gray-700 block mb-3">지원 월 선택</Label>
                  <Select
                    value={userData.recruitmentMonth}
                    onValueChange={handleRecruitmentMonthChange}
                  >
                    <SelectTrigger id="recruitmentMonth">
                      <SelectValue placeholder="지원 월을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {RECRUITMENT_MONTH_OPTIONS.map((option: { value: string; label: string }) => (
                        <SelectItem key={option.value} value={option.value} className="cursor-pointer">
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Tabs defaultValue="general" onValueChange={(value) => handleSoldierTypeChange(value as SoldierType)}>
                  <TabsList className="mb-6 w-full">
                    <TabsTrigger value="general" className="flex-1">일반기술병</TabsTrigger>
                    <TabsTrigger value="specialized" className="flex-1">전문기술병</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general">
                    {/* 일반기술병은 특기 선택 칸 없음 - 자동으로 "일반기술" 특기 선택됨 */}
                    <ScoreForm
                      userData={userData}
                      onCertificateChange={handleCertificateChange}
                      onMajorChange={handleMajorChange}
                      onAttendanceChange={handleAttendanceChange}
                      onBonusPointsChange={handleBonusPointsChange}
                    />
                  </TabsContent>
                  <TabsContent value="specialized">
                    {/* 특기 선택 (전문기술병) */}
                    <div className="form-section p-4 bg-gray-50 rounded-lg border border-gray-200 mb-6">
                      <Label htmlFor="specialty" className="text-base font-medium text-blue-700 block mb-3">특기 선택</Label>
                      <Select
                        value={userData.specialty}
                        onValueChange={(value) => handleSpecialtyChange(value as SpecialtyType)}
                      >
                        <SelectTrigger id="specialty">
                          <SelectValue placeholder="특기를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {specialtyOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <ScoreForm
                      userData={userData}
                      onCertificateChange={handleCertificateChange}
                      onMajorChange={handleMajorChange}
                      onAttendanceChange={handleAttendanceChange}
                      onBonusPointsChange={handleBonusPointsChange}
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          {/* 점수 결과 */}
          <div className="lg:col-span-1">
            <ScoreResultComponent 
              scoreResult={scoreResult} 
              soldierType={userData.soldierType}
              maxScore={MAX_SCORES[userData.soldierType]}
              recruitmentMonth={userData.recruitmentMonth}
              specialty={userData.specialty}
            />
          </div>
        </div>

        {/* 다른 계산기로 이동하는 링크 */}
        <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-100 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">장병내일준비적금 계산기도 이용해보세요</h3>
          <p className="text-gray-600 mb-4">
            군 복무 중 받는 월급으로 장병내일준비적금에 가입하면 얼마를 모을 수 있을까요?<br />
            매월 적립액, 복무기간, 이자율을 입력하여 만기 시 예상 수령액을 계산해보세요.
          </p>
          <Link href="/moneycalculator" className="inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
            장병내일준비적금 계산기로 이동
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
} 