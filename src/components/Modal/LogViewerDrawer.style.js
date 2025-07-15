import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledDrawerPaper = styled(Box)(({ theme }) => ({
    width: '600px',
    color: '#0A1A28',
    display: 'flex',
    flexDirection: 'column',
}));

export const StyledDrawerHeader = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing(2, 2),
    backgroundColor: '#E5F3A3',
    minHeight: '30px',
}));

export const StyledDrawerTitle = styled(Typography)({
    color: '#0A1A28',
    marginLeft: '10px',
});

export const StyledDrawerContent = styled(Box)({
    backgroundColor: '#0A1A28',
    flexGrow: 1,
    padding: '15px',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word', // 긴 단어 줄바꿈
});

export const StyledLogLine = styled(Typography)({
    color: 'white',
    marginBottom: '2px',
    fontSize: '0.875rem',
});