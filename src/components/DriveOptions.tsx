'use client';

import React from 'react';
import { Box, Button } from '@mui/material';
import SelectableChips from '@/components/common/SelectableChips';
import { RecommendOptionsT } from '@/types';

// 선택 옵션 데이터
const optionsData = [
  { key: 'schedule', label: '📅 일정 선택', options: ['랜덤', '당일치기', '1박 2일', '2박 3일'] },
  { key: 'region', label: '📍 지역 선택', options: ['랜덤', '서울', '경기', '강원', '충청', '전라', '경상', '제주'] },
  { key: 'theme', label: '🎨 테마 선택', options: ['랜덤', '바다', '산', '도심', '시골'] }
];

// 선택된 옵션 타입
type SelectedOptionsType = {
  schedule: string | null;
  region: string | null;
  theme: string | null;
};

// API 요청을 위한 타입
interface RecommendOptions {
  schedule: string;
  region: string;
  theme: string;
}

// 부모에서 전달받는 props 타입
type DriveOptionsProps = {
  onOptionsChange: (options: RecommendOptionsT) => void;
  isLoading: boolean;
};

/**
 * 🚗 DriveOptions - 사용자 드라이브 선택 컴포넌트
 */
export default function DriveOptions({ onOptionsChange, isLoading }: DriveOptionsProps) {
  // 선택된 옵션 상태
  const [selectedOptions, setSelectedOptions] = React.useState<RecommendOptionsT>({
    schedule: null,
    region: null,
    theme: null
  });

  // 옵션 선택 핸들러
  const handleSelectOption = (key: string, value: string) => {
    const newOptions = { ...selectedOptions, [key]: value };
    setSelectedOptions(newOptions);
    onOptionsChange(newOptions); // 부모(Home.tsx)로 전달
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, mt: 3 }}>
      {optionsData.map(({ key, label, options }) => (
        <SelectableChips
          key={key}
          label={label}
          options={options}
          selected={selectedOptions[key as keyof SelectedOptionsType]}
          onSelectAction={(val) => handleSelectOption(key as keyof SelectedOptionsType, val)}
          isDisabled={isLoading}
        />
      ))}
    </Box>
  );
}
