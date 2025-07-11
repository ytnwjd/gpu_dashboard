import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button, {
    shouldForwardProp: (prop) =>
        prop !== 'width' && prop !== 'height' && prop !== 'isEnabled',
})(({ width, height, isEnabled }) => ({
    width: width,
    height: height,
    borderRadius: '100px',
    fontFamily: "'Fira Sans', Helvetica",
    fontWeight: 600,
    fontSize: '15px',
    letterSpacing: '0.1px',
    lineHeight: '20px',
    textTransform: 'none',
    color: '#fff',
    backgroundColor: isEnabled ? '#143d60' : '#5f8bb0',
    '&:hover': {
        backgroundColor: isEnabled ? '#0f2e48' : '#4a79ad',
    },
}));

export default StyledButton;
