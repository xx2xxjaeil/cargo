import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

// material-ui
import { Box, ButtonBase, Stack, Typography } from '@mui/material';

// types
import { PlaceT, RecentSearchT, RecommendOptionsT } from '@/types';

// styles
import './swiperStyles.css';

interface RecentSwiperProps {
  recentSearches: RecentSearchT[];
  isLoading: boolean;
  handleRecent: (places: PlaceT[]) => void;
}

export default function RecentSwiper({ recentSearches, isLoading, handleRecent }: RecentSwiperProps) {
  return (
    <Box sx={{ mt: 2 }}>
      <strong>🔍 최근 검색 기록</strong>
      <Swiper
        className="swiper"
        slidesPerView="auto"
        loop={true}
        centeredSlides={true}
        spaceBetween={12}
        pagination={{
          dynamicBullets: true
        }}
        modules={[Pagination]}
      >
        {recentSearches.map((search, index) => {
          const { schedule, region, theme } = search.options;
          const { places } = search;
          return (
            <SwiperSlide key={`recent-search-${index}-slider`}>
              <ButtonBase className="swiper-button" onClick={() => handleRecent(places)} disabled={isLoading}>
                <Stack
                  direction="row"
                  spacing={1}
                  divider={
                    <Box display="flex" justifyContent="center" alignItems="center" width="4px" height="20px">
                      <Box height="13px" width="1.3px" bgcolor="darkgray" />
                    </Box>
                  }
                >
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#FF8717' }}>
                    📅 {schedule}
                  </Typography>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#008080' }}>
                    📍 {region}
                  </Typography>
                  <Typography variant="subtitle1" style={{ fontWeight: 'bold', color: '#6A5ACD' }}>
                    🎨 {theme}
                  </Typography>
                </Stack>
                <Stack mt={1.5} spacing={1}>
                  {places.map((place, idx) => {
                    if (idx > 2) return null;
                    return (
                      <Box key={`recent-search-${index}-place-${idx}`}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }} noWrap>
                          {place.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'gray' }} noWrap>
                          {place.address}
                        </Typography>
                      </Box>
                    );
                  })}
                </Stack>
              </ButtonBase>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}
