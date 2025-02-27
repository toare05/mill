"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  AttendanceType, 
  BonusPointType, 
  CertificateType, 
  MajorType, 
  SoldierType, 
  UserInputData 
} from "@/types";
import { calculateScore } from "@/utils/calculateScore";
import { MAX_SCORES } from "@/constants/scores";
import ScoreForm from "@/components/ScoreForm";
import ScoreResultComponent from "@/components/ScoreResult";

export default function Home() {
  // 초기 사용자 입력 데이터
  const initialUserData: UserInputData = {
    soldierType: "general",
    certificate: "none",
    major: "nonMajor",
    attendance: "absence0",
    bonusPoints: []
  };

  // 사용자 입력 데이터 상태
  const [userData, setUserData] = useState<UserInputData>(initialUserData);
  
  // 점수 계산 결과
  const scoreResult = calculateScore(userData);

  // 군인 유형 변경 핸들러
  const handleSoldierTypeChange = (type: SoldierType) => {
    setUserData({
      ...userData,
      soldierType: type,
      certificate: "none"
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
              <CardHeader className="border-b border-gray-100 p-6">
                <CardTitle>점수 계산 입력</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Tabs defaultValue="general" onValueChange={(value) => handleSoldierTypeChange(value as SoldierType)}>
                  <TabsList className="mb-6 w-full">
                    <TabsTrigger value="general" className="flex-1">일반기술병(일반직종)</TabsTrigger>
                    <TabsTrigger value="specialized" className="flex-1">전문기술병</TabsTrigger>
                  </TabsList>
                  <TabsContent value="general">
                    <ScoreForm
                      userData={userData}
                      onCertificateChange={handleCertificateChange}
                      onMajorChange={handleMajorChange}
                      onAttendanceChange={handleAttendanceChange}
                      onBonusPointsChange={handleBonusPointsChange}
                    />
                  </TabsContent>
                  <TabsContent value="specialized">
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
            />
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>※ 본 계산기는 공군 지원 1차 점수만 계산하며, 면접 점수는 포함되지 않습니다.</p>
          <p>※ 정확한 점수는 병무청 공식 홈페이지를 참고하시기 바랍니다.</p>
        </div>
      </div>
    </main>
  );
}
