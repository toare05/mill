"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalculationBreakdown } from "@/types";

interface SavingsResultProps {
  totalAmount: number;
  breakdown: CalculationBreakdown;
  interestRate: number;
}

export default function SavingsResult({
  totalAmount,
  breakdown,
  interestRate
}: SavingsResultProps) {
  // 금액을 원화 형식으로 포맷팅하는 함수
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-green-700">예상 수령액</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <p className="text-4xl font-bold text-green-700">
            {formatCurrency(totalAmount)}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            금리 {interestRate}% 기준
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">총 납입액</span>
            <span className="font-medium">{formatCurrency(breakdown.totalDeposit)}</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-600">기본 이자</span>
            <span className="font-medium">{formatCurrency(breakdown.baseInterest)}</span>
          </div>
          {breakdown.additionalInterest > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">추가 이자</span>
              <span className="font-medium">{formatCurrency(breakdown.additionalInterest)}</span>
            </div>
          )}
          {breakdown.governmentMatch > 0 && (
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-600">정부 매칭 지원금</span>
              <span className="font-medium">{formatCurrency(breakdown.governmentMatch)}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-2 font-bold">
            <span className="text-gray-800">총 수령액</span>
            <span className="text-green-700">{formatCurrency(totalAmount)}</span>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600">
          <p className="mb-2 font-medium">참고 사항:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>실제 수령액은 은행 정책 및 금리 변동에 따라 달라질 수 있습니다.</li>
            <li>정부 매칭 지원금은 매월 납입액의 1/3(최대 15만원)이 추가됩니다.</li>
            <li>이자 소득세는 계산에서 제외되었습니다.</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
} 