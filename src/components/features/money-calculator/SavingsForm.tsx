"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { SavingsInputData } from "@/types";

interface SavingsFormProps {
  inputData: SavingsInputData;
  onMonthlySavingsChange: (value: number) => void;
  onServiceMonthsChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onGovernmentMatchChange: (value: boolean) => void;
  onIsYear2025Change: (value: boolean) => void;
  onMilitaryRankChange: (value: string) => void;
  onMonthlySavings2024Change: (value: number) => void;
  onMonthlySavings2025Change: (value: number) => void;
}

export default function SavingsForm({
  inputData,
  onMonthlySavingsChange,
  onServiceMonthsChange,
  onInterestRateChange,
  onGovernmentMatchChange,
  onIsYear2025Change,
  onMilitaryRankChange,
  onMonthlySavings2024Change,
  onMonthlySavings2025Change
}: SavingsFormProps) {
  return (
    <Card className="bg-white rounded-xl shadow-sm border border-gray-100">
      <CardContent className="p-6">
        {/* 월 납입액 입력 */}
        <div className="mb-6">
          <Label htmlFor="monthlySavings" className="text-base font-medium text-gray-700 block mb-2">
            월 납입액 (만원)
          </Label>
          <Input
            id="monthlySavings"
            type="number"
            min="1"
            max="55"
            value={inputData.monthlySavings}
            onChange={(e) => onMonthlySavingsChange(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-500 mt-1">
            최소 1만원부터 최대 55만원까지 입력 가능합니다.
          </p>
        </div>

        {/* 복무 개월 수 선택 */}
        <div className="mb-6">
          <Label htmlFor="serviceMonths" className="text-base font-medium text-gray-700 block mb-2">
            복무 개월 수
          </Label>
          <Select
            value={String(inputData.serviceMonths)}
            onValueChange={(value) => onServiceMonthsChange(Number(value))}
          >
            <SelectTrigger id="serviceMonths">
              <SelectValue placeholder="복무 개월 수 선택" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => i + 1).map((month) => (
                <SelectItem key={month} value={String(month)}>
                  {month}개월
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 정부 매칭 지원금 체크박스 */}
        <div className="mb-6 flex items-start space-x-2">
          <Checkbox
            id="governmentMatch"
            checked={inputData.governmentMatch}
            onCheckedChange={(checked) => onGovernmentMatchChange(checked as boolean)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="governmentMatch"
              className="text-base font-medium text-gray-700"
            >
              정부 매칭 지원금 포함
            </Label>
            <p className="text-sm text-gray-500">
              매월 납입액의 1/3(최대 15만원)을 정부가 추가 지원합니다.
            </p>
          </div>
        </div>

        {/* 2025년 이후 납입 여부 체크박스 */}
        <div className="mb-6 flex items-start space-x-2">
          <Checkbox
            id="isYear2025"
            checked={inputData.isYear2025}
            onCheckedChange={(checked) => onIsYear2025Change(checked as boolean)}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="isYear2025"
              className="text-base font-medium text-gray-700"
            >
              2025년 이후 납입 여부
            </Label>
            <p className="text-sm text-gray-500">
              2025년부터는 월 최대 55만원까지 납입 가능합니다.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 