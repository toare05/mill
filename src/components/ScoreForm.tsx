"use client";

import { 
  AttendanceType, 
  BonusPointType, 
  CertificateType, 
  MajorType, 
  UserInputData 
} from "@/types";
import { 
  ATTENDANCE_OPTIONS, 
  BONUS_POINT_OPTIONS, 
  CERTIFICATE_OPTIONS, 
  MAJOR_OPTIONS 
} from "@/constants/formOptions";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface ScoreFormProps {
  userData: UserInputData;
  onCertificateChange: (cert: CertificateType) => void;
  onMajorChange: (major: MajorType) => void;
  onAttendanceChange: (attendance: AttendanceType) => void;
  onBonusPointsChange: (bonusPoints: BonusPointType[]) => void;
}

export default function ScoreForm({
  userData,
  onCertificateChange,
  onMajorChange,
  onAttendanceChange,
  onBonusPointsChange
}: ScoreFormProps) {
  // 가산점 체크박스 변경 핸들러
  const handleBonusPointChange = (checked: boolean, value: BonusPointType) => {
    if (checked) {
      let newBonusPoints = [...userData.bonusPoints];
      
      // 같은 카테고리의 다른 항목 제거 (예: 한국사능력검정 3,4급과 1,2급은 중복 불가)
      if (value.startsWith('koreanHistory')) {
        newBonusPoints = newBonusPoints.filter(bp => !bp.startsWith('koreanHistory'));
      }
      if (value.startsWith('koreanLanguage')) {
        newBonusPoints = newBonusPoints.filter(bp => !bp.startsWith('koreanLanguage'));
      }
      if (value.startsWith('englishToeic')) {
        newBonusPoints = newBonusPoints.filter(bp => !bp.startsWith('englishToeic'));
      }
      if (value.startsWith('englishToefl')) {
        newBonusPoints = newBonusPoints.filter(bp => !bp.startsWith('englishToefl'));
      }
      if (value.startsWith('englishTeps')) {
        newBonusPoints = newBonusPoints.filter(bp => !bp.startsWith('englishTeps'));
      }
      
      // 같은 종류의 사회봉사활동 중복 선택 방지
      if (value.startsWith('volunteerHours')) {
        newBonusPoints = newBonusPoints.filter(bp => !bp.startsWith('volunteerHours'));
      }
      
      // 같은 종류의 헌혈 중복 선택 방지
      if (value.startsWith('bloodDonation')) {
        newBonusPoints = newBonusPoints.filter(bp => !bp.startsWith('bloodDonation'));
      }
      
      onBonusPointsChange([...newBonusPoints, value]);
    } else {
      onBonusPointsChange(userData.bonusPoints.filter(bp => bp !== value));
    }
  };

  // 자격/면허 옵션 필터링 함수
  const getFilteredCertificateOptions = () => {
    const options = [...CERTIFICATE_OPTIONS[userData.soldierType]];
    
    // 전문기술병이고 차량운전 특기가 아닌 경우 운전면허 관련 옵션 제거
    if (userData.soldierType === 'specialized' && userData.specialty !== 'driving') {
      return options.filter(option => 
        option.value !== 'largeSpecial' && 
        option.value !== 'type1Manual' && 
        option.value !== 'type2Manual'
      );
    }
    
    return options;
  };

  return (
    <div className="space-y-6">
      {/* 자격/면허 선택 */}
      <div className="form-section p-4 bg-gray-50 rounded-lg border border-gray-200">
        <Label htmlFor="certificate" className="text-base font-medium text-blue-700 block mb-3">자격/면허</Label>
        <Select 
          value={userData.certificate} 
          onValueChange={(value) => onCertificateChange(value as CertificateType)}
        >
          <SelectTrigger id="certificate">
            <SelectValue placeholder="자격/면허를 선택하세요" />
          </SelectTrigger>
          <SelectContent>
            {getFilteredCertificateOptions().map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* 전공 선택 (전문기술병만 해당) */}
      {userData.soldierType === 'specialized' && (
        <div className="form-section p-4 bg-gray-50 rounded-lg border border-gray-200">
          <Label htmlFor="major" className="text-base font-medium text-blue-700 block mb-3">전공</Label>
          <Select 
            value={userData.major} 
            onValueChange={(value) => onMajorChange(value as MajorType)}
          >
            <SelectTrigger id="major">
              <SelectValue placeholder="전공을 선택하세요" />
            </SelectTrigger>
            <SelectContent>
              {MAJOR_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* 출결 상황 선택 */}
      <div className="form-section p-4 bg-gray-50 rounded-lg border border-gray-200">
        <Label className="text-base font-medium text-blue-700 block mb-3">출결 상황 (고교 3년간 누계)</Label>
        <RadioGroup 
          value={userData.attendance} 
          onValueChange={(value) => onAttendanceChange(value as AttendanceType)}
          className="space-y-2"
        >
          {ATTENDANCE_OPTIONS[userData.soldierType].map((option) => (
            <div key={option.value} className="checkbox-option">
              <RadioGroupItem 
                value={option.value} 
                id={option.value}
              />
              <Label htmlFor={option.value} className="ml-2">{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* 가산점 선택 */}
      <div className="form-section p-4 bg-gray-50 rounded-lg border border-gray-200">
        <Label className="text-base font-medium text-blue-700 block mb-3">가산점 (최대 15점)</Label>
        
        {/* 신분 및 가족 관련 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-1 mb-2">신분 및 가족 관련</h4>
            <div className="space-y-2">
              {BONUS_POINT_OPTIONS.filter(cat => cat.category === '신분 관련' || cat.category === '가족 관련')
                .flatMap(cat => cat.options)
                .map((option) => (
                  <div key={option.value} className="checkbox-option">
                    <Checkbox 
                      id={option.value} 
                      checked={userData.bonusPoints.includes(option.value)}
                      onCheckedChange={(checked) => 
                        handleBonusPointChange(checked as boolean, option.value)
                      }
                    />
                    <Label htmlFor={option.value} className="ml-2">{option.label}</Label>
                  </div>
                ))}
            </div>
          </div>
          
          {/* 특기 관련 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-1 mb-2">특기 관련</h4>
            <div className="space-y-2">
              {BONUS_POINT_OPTIONS.find(cat => cat.category === '특기 관련')?.options.map((option) => (
                <div key={option.value} className="checkbox-option">
                  <Checkbox 
                    id={option.value} 
                    checked={userData.bonusPoints.includes(option.value)}
                    onCheckedChange={(checked) => 
                      handleBonusPointChange(checked as boolean, option.value)
                    }
                  />
                  <Label htmlFor={option.value} className="ml-2">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* 사회봉사 및 헌혈 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <p className="text-xs text-blue-600 mb-2 col-span-full">※ 사회봉사활동과 헌혈 점수의 합계는 최대 8점까지만 인정됩니다.</p>
          
          {/* 사회봉사활동 드롭다운 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-1 mb-2">사회봉사활동</h4>
            <div className="mt-1">
              <Select 
                value={userData.bonusPoints.find(bp => bp.startsWith('volunteerHours')) || "none"}
                onValueChange={(value) => {
                  if (value !== "none") {
                    handleBonusPointChange(true, value as BonusPointType);
                  } else {
                    const currentVolunteer = userData.bonusPoints.find(bp => bp.startsWith('volunteerHours'));
                    if (currentVolunteer) {
                      handleBonusPointChange(false, currentVolunteer);
                    }
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="사회봉사활동 시간 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">선택 안함</SelectItem>
                  {BONUS_POINT_OPTIONS.find(cat => cat.category === '사회봉사활동 (같은 종류 중복 불가)')?.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {/* 헌혈 드롭다운 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-1 mb-2">헌혈</h4>
            <div className="mt-1">
              <Select 
                value={userData.bonusPoints.find(bp => bp.startsWith('bloodDonation')) || "none"}
                onValueChange={(value) => {
                  if (value !== "none") {
                    handleBonusPointChange(true, value as BonusPointType);
                  } else {
                    const currentBlood = userData.bonusPoints.find(bp => bp.startsWith('bloodDonation'));
                    if (currentBlood) {
                      handleBonusPointChange(false, currentBlood);
                    }
                  }
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="헌혈 횟수 선택" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">선택 안함</SelectItem>
                  {BONUS_POINT_OPTIONS.find(cat => cat.category === '헌혈 (같은 종류 중복 불가)')?.options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        {/* 자격증 및 영어 성적 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* 자격증 관련 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-1 mb-2">자격증 관련</h4>
            <div className="space-y-2">
              {BONUS_POINT_OPTIONS.find(cat => cat.category === '자격증 관련')?.options.map((option) => (
                <div key={option.value} className="checkbox-option">
                  <Checkbox 
                    id={option.value} 
                    checked={userData.bonusPoints.includes(option.value)}
                    onCheckedChange={(checked) => 
                      handleBonusPointChange(checked as boolean, option.value)
                    }
                  />
                  <Label htmlFor={option.value} className="ml-2">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* 영어 성적 */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-1 mb-2">영어 성적</h4>
            <div className="space-y-2">
              {BONUS_POINT_OPTIONS.find(cat => cat.category === '영어 성적')?.options.map((option) => (
                <div key={option.value} className="checkbox-option">
                  <Checkbox 
                    id={option.value} 
                    checked={userData.bonusPoints.includes(option.value)}
                    onCheckedChange={(checked) => 
                      handleBonusPointChange(checked as boolean, option.value)
                    }
                  />
                  <Label htmlFor={option.value} className="ml-2">{option.label}</Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 