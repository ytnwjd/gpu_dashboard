import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export const StyledGpuIcon = styled(Box)(({ active }) => ({
    width: '24px',
    height: '32px',
    backgroundColor: active ? '#A0C878' : '#D9D9D9',
}));

export const StyledInfoContentWrapper = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    gap: '20px',
});

export const StyledGpuGridContainer = styled(Box)({
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '4px 4px',
    width: 'auto',
    minWidth: '200px',
    paddingLeft: '10px',
});

export const StyledTextContainer = styled(Box)({
    flexGrow: 1,
    textAlign: 'center',
});

export const StyledInfoTypography = styled(Typography)(({ theme }) => ({
    color: '#143D60',
    fontFamily: theme.typography.fontFamily,
}));

export const StyledInfoTypographyWithMargin = styled(StyledInfoTypography)({
    marginTop: '8px',
});