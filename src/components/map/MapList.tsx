import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import { Box, Container } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerBleeding = 56;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

// const Root = styled('div')(({ theme }) => ({
//   height: '100%',
//   backgroundColor: grey[100],
//   ...theme.applyStyles('dark', {
//     backgroundColor: theme.palette.background.default
//   })
// }));
//
// const StyledBox = styled('div')(({ theme }) => ({
//   backgroundColor: '#fff',
//   ...theme.applyStyles('dark', {
//     backgroundColor: grey[800]
//   })
// }));

const Puller = styled('div')(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: grey[300],
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
  ...theme.applyStyles('dark', {
    backgroundColor: grey[900]
  })
}));

export default function MapList(props: Props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  // This is used only for the example
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <Container maxWidth="xs" sx={{ px: 0 }}>
        <CssBaseline />

        {/* 매거진 내용 */}
        {/*<Box>
          {wineDiscovery.loaded ? (
            <Box ref={contentRef} sx={{ pb: `${drawerBleeding + 20}px` }} />
          ) : (
            <Box display="flex" justifyContent="center" mt="12px" minHeight="100px" pt="16px">
              <CircularProgress size={30} color="brand" />
            </Box>
          )}
        </Box>
      </Container>
*/}
        <CssBaseline />
        <Global
          styles={{
            '.MuiDrawer-root > .MuiPaper-root': {
              height: `calc(100% - ${drawerBleeding}px - 56px)`,
              overflow: 'visible'
            }
          }}
        />
      </Container>

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{ keepMounted: true }}
      >
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
        </Box>
      </SwipeableDrawer>
    </Box>
  );
}
