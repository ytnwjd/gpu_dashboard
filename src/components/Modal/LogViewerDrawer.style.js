import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledDrawerPaper = styled(Box)(({ theme }) => ({
    width: 600, // 이미지 와 유사하게 적절한 너비 설정
    backgroundColor: '#0A1A28', // 이미지 와 같은 배경색
    color: 'white', // 텍스트 색상
    display: 'flex',
    flexDirection: 'column',
    boxShadow: theme.shadows[8], // 그림자 추가 (선택 사항)
}));

export const StyledDrawerHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2), // 상하좌우 패딩
    backgroundColor: '#3C4756', // 헤더 배경색 (이미지 상단 색상)
    minHeight: '64px', // 헤더 최소 높이
}));

export const StyledDrawerTitle = styled(Typography)({
    color: 'white', // 제목 텍스트 색상
    fontWeight: 'bold',
    marginLeft: '10px', // 왼쪽 여백
});

export const StyledDrawerContent = styled(Box)({
    flexGrow: 1, // 남은 공간 채우기
    padding: '20px', // 로그 내용 패딩
    overflowY: 'auto', // 로그가 길어질 경우 스크롤
    whiteSpace: 'pre-wrap', // 공백 및 줄바꿈 유지
    wordBreak: 'break-word', // 긴 단어 줄바꿈
});

export const StyledLogLine = styled(Typography)({
    color: 'white', // 로그 텍스트 색상
    marginBottom: '4px', // 각 줄 사이 간격
    fontSize: '0.875rem', // 로그 텍스트 크기
});