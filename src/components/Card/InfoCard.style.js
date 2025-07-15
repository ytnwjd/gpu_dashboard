import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledInfoContentWrapper = styled(Box)({
    display: 'flex',
    padding: '10px 20px 20px 20px',
});

export const StyledLeftContent = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});

export const StyledAvailableGpuText = styled(Typography)({
    color: '#143D60',
    fontSize: '1.25rem',
    marginBottom: '10px',
    fontWeight: 'bold',
});

export const StyledGpuGroupWrapper = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
});

export const StyledGpuLabel = styled(Typography)({
    color: '#143D60',
    width: '50px',
    paddingRight: '8px',
    textAlign: 'right',
    flexShrink: 0,
});

export const StyledGpuGridContainer = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '10px',
    width: 'calc(10px * 6 + 40px * 6)',
});

export const StyledGpuIcon = styled(Box)(({ active }) => ({
    width: '24px',
    height: '32px',
    backgroundColor: active ? '#A0C878' : '#F84C4C',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.8rem',
    fontWeight: 'bold',
}));

export const StyledTextContainer = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    paddingTop: '25px',
    flexGrow: 1,
});

export const StyledInfoTypography = styled(Typography)({
    color: '#143D60',
});