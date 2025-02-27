"use client";

import { useState } from "react";
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
import ScoreForm from "@/components/ScoreForm";
import ScoreResultComponent from "@/components/ScoreResult";
import { RECRUITMENT_MONTH_OPTIONS } from "@/constants/cutoffScores";

export default function Home() {
  // 초기 사용자 입력 데이터
  const initialUserData: UserInputData = {
    soldierType: "general",
    certificate: "none",
    major: "nonMajor",
    attendance: "absence0",
    bonusPoints: [],
    recruitmentMonth: "2025년 6월", // 기본값을 2025년 6월로 설정
    specialty: "general" // 기본값은 일반(기술)
  };

  // 사용자 입력 데이터 상태
  const [userData, setUserData] = useState<UserInputData>(initialUserData);
  
  // 점수 계산 결과
  const scoreResult = calculateScore(userData);
  
  // 군인 유형 변경 핸들러
  const handleSoldierTypeChange = (type: SoldierType) => {
    let specialty: SpecialtyType = "general";
    
    // 군인 유형에 따라 기본 특기 설정
    if (type === "general") {
      specialty = "general"; // 일반기술병은 일반기술 하나만 있음
    } else if (type === "specialized") {
      specialty = "electronic"; // 전문기술병의 경우 전자계산을 기본값으로
    }
    
    setUserData({
      ...userData,
      soldierType: type,
      certificate: "none",
      major: "nonMajor",
      attendance: "absence0",
      bonusPoints: [],
      specialty
    });
  };
  
  // 자격/면허 변경 핸들러
  const handleCertificateChange = (cert: CertificateType) => {
    setUserData({
      ...userData,
      certificate: cert
    });
  };
  
  // 전공 변경 핸들러
  const handleMajorChange = (major: MajorType) => {
    setUserData({
      ...userData,
      major
    });
  };
  
  // 출결 상황 변경 핸들러
  const handleAttendanceChange = (attendance: AttendanceType) => {
    setUserData({
      ...userData,
      attendance
    });
  };
  
  // 가산점 변경 핸들러
  const handleBonusPointsChange = (bonusPoints: BonusPointType[]) => {
    setUserData({
      ...userData,
      bonusPoints
    });
  };
  
  // 지원 월 변경 핸들러
  const handleRecruitmentMonthChange = (month: string) => {
    setUserData({
      ...userData,
      recruitmentMonth: month
    });
  };
  
  // 특기 변경 핸들러
  const handleSpecialtyChange = (specialty: SpecialtyType) => {
    let updatedCertificate = userData.certificate;
    
    // 차량운전 특기에서 다른 특기로 변경될 때 운전면허 관련 자격증을 선택한 상태라면 자격증을 'none'으로 변경
    if (userData.specialty === 'driving' && specialty !== 'driving') {
      if (
        userData.certificate === 'largeSpecial' || 
        userData.certificate === 'type1Manual' || 
        userData.certificate === 'type2Manual'
      ) {
        updatedCertificate = 'none';
      }
    }
    
    setUserData({
      ...userData,
      specialty,
      certificate: updatedCertificate
    });
  };
  
  // 특기 옵션 생성
  const getSpecialtyOptions = () => {
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
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 md:py-12 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* 상단 광고 */}
        <div className="mb-8">
          {/* 
            구글 애드센스 대시보드에서 생성한 실제 광고 단위의 슬롯 ID로 교체하세요.
            예: <GoogleAdsense slot="1234567890" /> -> <GoogleAdsense slot="5678901234" />
          */}
          {/* 임시 광고 위치 표시 */}
          <div className="w-full h-[250px] bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-600 font-bold rounded-lg">
            <div className="text-center">
              <p>광고가 표시될 위치 (상단)</p>
              <p className="text-sm mt-2">728x90 또는 반응형 광고</p>
            </div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">공군 지원 1차 점수 계산기</h1>
          <p className="text-gray-600">자격/면허, 전공, 출결, 가산점을 입력하여 1차 점수를 계산해보세요.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 입력 폼 */}
          <div className="lg:col-span-2">
            <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
              <CardHeader className="border-b border-gray-100 p-6">
                <CardTitle>점수 계산 입력</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {/* 지원 월 선택 */}
                <div className="mb-6">
                  <Label htmlFor="recruitmentMonth" className="text-base font-medium text-blue-700 block mb-3">지원 월 선택</Label>
                  <Select
                    value={userData.recruitmentMonth}
                    onValueChange={handleRecruitmentMonthChange}
                  >
                    <SelectTrigger id="recruitmentMonth">
                      <SelectValue placeholder="지원 월을 선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {RECRUITMENT_MONTH_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
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
                          {getSpecialtyOptions().map((option) => (
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

        {/* 하단 광고 */}
        <div className="mt-8">
          {/* 
            구글 애드센스 대시보드에서 생성한 실제 광고 단위의 슬롯 ID로 교체하세요.
            예: <GoogleAdsense slot="0987654321" /> -> <GoogleAdsense slot="9876543210" />
          */}
          {/* 임시 광고 위치 표시 */}
          <div className="w-full h-[250px] bg-green-100 border-2 border-green-300 flex items-center justify-center text-green-600 font-bold rounded-lg">
            <div className="text-center">
              <p>광고가 표시될 위치 (하단)</p>
              <p className="text-sm mt-2">728x90 또는 반응형 광고</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>※ 본 계산기는 공군 지원 1차 점수만 계산하며, 면접 점수는 포함되지 않습니다.</p>
          <p>※ 정확한 점수는 병무청 공식 홈페이지를 참고하시기 바랍니다.</p>
          <p className="mt-2">
            <a href="/privacy-policy" className="text-blue-500 hover:underline">개인정보 처리방침</a>
          </p>
        </div>
      </div>
    </main>
  );
}
