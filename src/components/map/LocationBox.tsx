import React from 'react';

// material-ui
import { Box, ButtonBase, Stack, Typography } from '@mui/material';
import RoomIcon from '@mui/icons-material/Room';

// types
import { PlaceT } from '@/types';

/**
 * LocationBox Component
 * @param place
 * @param activeMarker
 * @param moveToLocation
 * @constructor
 */
export default function LocationBox({
  place,
  activeMarker,
  moveToLocation
}: {
  place: PlaceT;
  activeMarker: string | null;
  moveToLocation: (lat: number, lng: number, name: string) => void;
}) {
  const { name, address, coordinates, description, theme } = place;
  return (
    <ButtonBase
      sx={{
        width: '100%',
        textAlign: 'left',
        borderRadius: '8px',
        p: 1,
        backgroundColor: activeMarker === name ? 'rgba(255, 135, 23, 0.2)' : 'transparent'
      }}
      onClick={() => moveToLocation(coordinates.lat, coordinates.lng, name)}
    >
      <Stack width="100%" direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {name}
          </Typography>
          <Typography variant="subtitle2">{address}</Typography>
          <Typography variant="caption">{description}</Typography>
          {theme && (
            <Typography variant="inherit" color="primary" mt={1}>
              {theme}
            </Typography>
          )}
        </Box>
        <RoomIcon />
      </Stack>
    </ButtonBase>
  );
}
