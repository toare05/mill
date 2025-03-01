"use client";

import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";

// 은행별 금리 정보 타입 정의
interface BankInterestRate {
  bankName: string;         // 은행 이름
  baseRate: number;         // 기본 금리 (%)
  additionalRate: number;   // 우대 금리 (%)
  totalRate: number;        // 총 금리 (%)
  specialBenefits: string;  // 특별 혜택
  minDeposit?: number;      // 최소 납입액
  maxDeposit?: number;      // 최대 납입액 (별도 한도가 있는 경우)
  officialLink: string;     // 공식 웹사이트 링크
}

// 저축 입력 데이터 타입 정의
interface SavingsInputData {
  monthlySavings: number;          // 월 납입액
  serviceMonths: number;           // 복무 개월 수
  interestRate: number;            // 총 금리 (기본금리+우대금리)
  governmentMatch: boolean;        // 정부 매칭 지원금
  isYear2025: boolean;             // 2025년 이후 납입 여부 (한도 55만원)
  selectedBank: string;            // 선택한 은행
  militaryRank?: string;           // 군 계급 (선택사항)
  monthlySavings2024?: number;     // 2024년 월 납입액 (만원)
  monthlySavings2025?: number;     // 2025년 월 납입액 (만원)
}

interface SavingsFormProps {
  bankRates: BankInterestRate[];
  inputData: SavingsInputData;
  onMonthlySavingsChange: (value: number) => void;
  onServiceMonthsChange: (value: number) => void;
  onInterestRateChange: (value: number) => void;
  onGovernmentMatchChange: (value: boolean) => void;
  onIsYear2025Change: (value: boolean) => void;
  onSelectedBankChange: (value: string) => void;
  onMilitaryRankChange: (value: string) => void;
  onMonthlySavings2024Change: (value: number) => void;
  onMonthlySavings2025Change: (value: number) => void;
  showRateInfo: boolean;
  toggleRateInfo: () => void;
}

export default function SavingsForm({
  bankRates,
  inputData,
  onMonthlySavingsChange,
  onServiceMonthsChange,
  onInterestRateChange,
  onGovernmentMatchChange,
  onIsYear2025Change,
  onSelectedBankChange,
  onMilitaryRankChange,
  onMonthlySavings2024Change,
  onMonthlySavings2025Change,
  showRateInfo,
  toggleRateInfo
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

        {/* 은행 선택 */}
        <div className="mb-6">
          <Label htmlFor="selectedBank" className="text-base font-medium text-gray-700 block mb-2">
            은행 선택
          </Label>
          <Select
            value={inputData.selectedBank}
            onValueChange={onSelectedBankChange}
          >
            <SelectTrigger id="selectedBank">
              <SelectValue placeholder="은행 선택" />
            </SelectTrigger>
            <SelectContent>
              {bankRates.map((bank) => (
                <SelectItem key={bank.bankName} value={bank.bankName}>
                  {bank.bankName} ({bank.totalRate}%)
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <button
            type="button"
            onClick={toggleRateInfo}
            className="text-sm text-blue-600 hover:text-blue-800 mt-2 underline"
          >
            {showRateInfo ? "금리 정보 숨기기" : "금리 정보 보기"}
          </button>
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