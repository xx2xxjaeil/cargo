'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// material-ui
import { Box, ButtonBase, Divider, Stack, Typography } from '@mui/material';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CssBaseline from '@mui/material/CssBaseline';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import ExploreIcon from '@mui/icons-material/Explore';
import ExploreOffIcon from '@mui/icons-material/ExploreOff';

// types
import { PlaceT } from '@/types';

// components
import LocationBox from '@/components/map/LocationBox';

// 서울 중심 좌표
const SEOUL_CENTER = { lat: 37.5665, lng: 126.978 };
const drawerBleeding = 52;

// Drawer의 손잡이 스타일
const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[200]
  })
}));

// IconButton 스타일
const IconButtonWrapper = styled(ButtonBase, {
  shouldForwardProp: (prop) => prop !== 'active'
})<{ active?: boolean; position: 'left' | 'right' }>(({ active, position }) => ({
  position: 'absolute',
  top: 12,
  [position]: 12,
  zIndex: 1,
  borderRadius: '50%',
  backgroundColor: active ? '#FFA500' : '#FFF',
  color: active ? '#FFF' : '#000',
  boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.15)',
  padding: '4px',
  transition: 'box-shadow 0.2s ease-in-out, transform 0.2s ease-in-out'
}));

/**
 * Map Component
 */
export default function Map() {
  const router = useRouter();

  const mapRef = React.useRef<HTMLDivElement>(null);
  const mapInstance = React.useRef<naver.maps.Map | null>(null);
  const trafficLayerRef = React.useRef<naver.maps.TrafficLayer | null>(null);

  // 지도 로드 상태
  const [isMapLoaded, setIsMapLoaded] = React.useState(false);
  // Drawer 열기/닫기 상태
  const [open, setOpen] = React.useState<boolean>(false);
  // 활성화된 마커 이름
  const [activeMarker, setActiveMarker] = React.useState<string | null>(null);
  // 교통상황 활성화 상태
  const [trafficEnabled, setTrafficEnabled] = React.useState<boolean>(false);

  const places = React.useMemo((): PlaceT[] => {
    if (typeof window === 'undefined') return []; // 서버 환경이면 빈 배열 반환

    const mapData = sessionStorage.getItem('places');
    return mapData ? JSON.parse(mapData) : [];
  }, []);

  // 네이버 지도 초기화
  React.useEffect(() => {
    const initializeMap = (): void => {
      if (!window.naver || !mapRef.current) return;

      setIsMapLoaded(true);

      const map = new window.naver.maps.Map(mapRef.current, {
        center: new window.naver.maps.LatLng(SEOUL_CENTER.lat, SEOUL_CENTER.lng),
        zoom: 11
      });
      mapInstance.current = map; // 지도 객체 저장

      // 장소별 마커 생성
      places.forEach((place) => {
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(place.coordinates.lat, place.coordinates.lng),
          map,
          title: place.name
        });
      });

      // 장소가 있으면 첫 번째 장소로 지도 중심 이동
      if (places.length > 0) {
        map.setCenter(new window.naver.maps.LatLng(places[0].coordinates.lat, places[0].coordinates.lng));
      }

      // 지도 교통상황 레이어 추가
      trafficLayerRef.current = new naver.maps.TrafficLayer();
    };

    if (window.naver) {
      initializeMap();
    } else {
      const script = document.createElement('script');
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;
      script.async = true;
      script.onload = () => initializeMap();
      document.head.appendChild(script);
    }
  }, []);

  // 교통상황 레이어 토글 함수
  const toggleTrafficLayer = () => {
    if (!mapInstance.current || !trafficLayerRef.current) return;

    if (trafficEnabled) {
      trafficLayerRef.current.setMap(null);
    } else {
      trafficLayerRef.current.setMap(mapInstance.current);
    }

    setTrafficEnabled((prev) => !prev);
  };

  // 지도 중심 이동 함수
  const moveToLocation = React.useCallback((lat: number, lng: number, name: string) => {
    if (!mapInstance.current) return;

    mapInstance.current.setCenter(new window.naver.maps.LatLng(lat, lng));

    const drawerHeight = 266 + 52;
    mapInstance.current.panBy(new window.naver.maps.Point(0, drawerHeight / 2));

    setActiveMarker(name);
  }, []);

  // Drawer 열기/닫기 함수
  const toggleDrawer = React.useCallback((newOpen: boolean) => () => setOpen(newOpen), []);

  return (
    <Box>
      {/* 교통상황 토글 */}
      <IconButtonWrapper active={trafficEnabled} onClick={toggleTrafficLayer} position="left">
        {trafficEnabled ? <ExploreIcon /> : <ExploreOffIcon />}
      </IconButtonWrapper>

      {/* 뒤로가기 */}
      <IconButtonWrapper onClick={() => router.back()} position="right">
        <CloseIcon sx={{ color: 'gray' }} />
      </IconButtonWrapper>

      {/* 지도 영역 */}
      <Box ref={mapRef} sx={{ width: '100%', height: `calc(100vh - ${drawerBleeding}px)`, background: '#eee' }}>
        {!isMapLoaded && <p style={{ textAlign: 'center', paddingTop: '20px' }}>지도 로딩 중...</p>}
      </Box>

      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `min(40vh, 400px)`,
            maxHeight: '40vh',
            overflow: 'visible'
          }
        }}
      />

      {/* 장소 목록 Drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        disableScrollLock={true}
        ModalProps={{ keepMounted: true }}
        hideBackdrop
        sx={{ height: open ? 0 : '100%' }}
      >
        {/* Drawer 상단 손잡이 */}
        <Box
          bgcolor="background.paper"
          sx={{
            position: 'absolute',
            top: -drawerBleeding,
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            boxShadow: '0px -15px 10px 0 rgb(0 0 0 / 16%)',
            visibility: 'visible',
            height: drawerBleeding,
            right: 0,
            left: 0,
            overflow: 'hidden'
          }}
        >
          <Puller />
          <Box height="100%" display="flex" pt="30px">
            <Typography
              noWrap
              fontSize="18px"
              fontWeight={800}
              color="text.primary"
              sx={{
                textAlign: 'center',
                width: '100%',
                position: 'absolute',
                top: '66%',
                left: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              장소 목록
            </Typography>
          </Box>
        </Box>

        {/* 장소 목록 */}
        <Box sx={{ px: 2, pb: 2, height: '100%', overflow: 'auto' }}>
          <Stack direction="column" divider={<Divider />} spacing="16px" sx={{ pt: '16px' }}>
            {places.map((place, index) => (
              <LocationBox
                key={`location-${index}-box`}
                place={place}
                activeMarker={activeMarker}
                moveToLocation={(lat, lng, name) => moveToLocation(lat, lng, name)}
              />
            ))}
          </Stack>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
