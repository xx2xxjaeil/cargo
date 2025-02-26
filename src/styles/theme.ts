import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF8717' // 포인트 색상 (오렌지)
    },
    background: {
      default: '#FFFFFF', // 배경색 (흰색)
      paper: '#F8F9FA' // 카드 등의 배경 (밝은 회색 느낌)
    },
    text: {
      primary: '#333333', // 기본 텍스트 색 (어두운 회색)
      secondary: '#666666' // 서브 텍스트 색
    },
    secondary: {
      main: '#2A9D8F' // 보조 컬러 (청록)
    }
  }
});

export default theme;
