import { styled } from '@mui/material/styles';
import { TextField } from '@mui/material';

export const StyledForm = styled('form')({
    display: 'flex',
    flexDirection: 'column',
    padding: '10px',
    margin: 'auto',
});

export const StyledTextField = styled(TextField)(({ theme }) => ({
    marginBottom: theme.spacing(4),
    position: 'relative',

    '& .MuiInputBase-root': {
        backgroundColor: '#EEF7FF',
        color: '#0A1A28',
        borderRadius: "4px 4px 0 0",

        '&:before': {
            borderBottom: '1px solid #0A1A28',
        },
        '&:after': { // 포커스 시 밑줄
            borderBottom: '2px solid black !important',
        },
    },
    '& .MuiInputBase-input': {
        padding: '12px 14px',
    },
    '& .MuiInputLabel-root': {
        color: '#A0A0A0',
        fontSize: '0.875rem',
        position: 'absolute',
        top: '100%',
        left: '0',
        paddingLeft: '14px',
        marginTop: '4px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: 'calc(100% - 28px)', // 입력 필드 폭에 맞추고 양쪽 패딩 고려
    },
    '& .MuiInputLabel-shrink': {
        transform: 'none', // 기본 축소 변형을 제거하여 고정 위치 유지
    },
    '& .MuiIconButton-root': {
        color: '#A0A0A0',
    },
}));