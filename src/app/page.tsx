'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

// material-ui
import { Box, Button, Typography } from '@mui/material';

// components
import DriveOptions from '@/components/DriveOptions';
import { usePlaceStore } from '@/store/usePlacesStore';
import { PlaceT, RecommendOptionsT } from '@/types';
import './loader.css';
import RecentSwiper from '@/components/swiper/RecentSwiper';

/**
 * Home
 * @constructor
 */
export default function Home() {
  const router = useRouter();

  const { recentSearches } = usePlaceStore();
  console.log('###### recent: ', recentSearches);

  // 로딩 상태
  const [loading, setLoading] = React.useState<boolean>(false);

  // 선택된 옵션 상태
  const [selectedOptions, setSelectedOptions] = React.useState<RecommendOptionsT>({
    schedule: null,
    region: null,
    theme: null
  });

  // 추천 요청 핸들러
  const handleRecommend = async () => {
    try {
      setLoading(true);
      console.log('📌 추천 요청 데이터:', selectedOptions);

      const response = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedOptions)
      });

      if (!response.ok) {
        console.error('❌ 추천 요청 실패:', response.statusText);
        window.alert('추천 요청에 실패했습니다.\n잠시 후 다시 시도해주세요.');
        return;
      }

      const data = await response.json();
      console.log('✅ 추천 결과:', data);

      // 추천 결과 세션 저장
      if (data?.places && Array.isArray(data.places)) {
        sessionStorage.setItem('places', JSON.stringify(data.places));

        // zustand 스토어에 저장
        usePlaceStore.getState().addSearch(data.places, selectedOptions);

        // 지도 페이지로 이동
        router.push('/map');
      } else {
        console.warn('❌ 추천 결과 없음:', data);
        window.alert('추천 결과를 가져오는 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요');
      }
    } catch (error) {
      console.error('❌ 추천 요청 에러:', error);
      window.alert('추천 요청에 실패했습니다.\n잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  // DriveOptions에서 선택한 옵션을 업데이트하는 핸들러
  const handleSelectOptions = (options: RecommendOptionsT) => {
    console.log('📌 선택된 옵션:', options);
    setSelectedOptions(options);
  };

  // 버튼 비활성화 여부
  const isButtonDisabled = React.useMemo(() => {
    if (loading) return true;
    return !selectedOptions || !selectedOptions.schedule || !selectedOptions.region || !selectedOptions.theme;
  }, [selectedOptions, loading]);

  // 최근 검색 목록 클릭 이벤트
  const handleRecentSearch = (places: PlaceT[]) => {
    sessionStorage.setItem('places', JSON.stringify(places));
    router.push('/map');
  };

  return (
    <Box>
      {recentSearches && recentSearches.length > 0 && (
        <RecentSwiper recentSearches={recentSearches} isLoading={loading} handleRecent={(places) => handleRecentSearch(places)} />
      )}

      <DriveOptions onOptionsChange={handleSelectOptions} isLoading={loading} />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleRecommend}
        disabled={isButtonDisabled}
        sx={{ mt: 2, height: 42 }}
      >
        {loading ? <Box className="loader" /> : '🚗 추천받기'}
      </Button>
    </Box>
  );
}
