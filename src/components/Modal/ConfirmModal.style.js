import { styled } from '@mui/material/styles';
import { Button, DialogContent, DialogActions, Typography } from '@mui/material';

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '30px 20px 5px 20px',
    backgroundColor: 'white',
    color: 'white',
}));

export const StyledDialogText = styled(Typography)({
    color: '#0A1A28',
    textAlign: 'center',
    lineHeight: 1.5,
    marginBottom: '5px',
});

export const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'white',
}));

export const StyledConfirmButton = styled(Button)({
    backgroundColor: '#0A1A28',
    color: 'white',
    borderRadius: '8px',
    padding: '8px 25px',
});

export const StyledCancelButton = styled(Button)({
    backgroundColor: '#0A1A28',
    color: 'white',
    borderRadius: '8px',
    padding: '8px 25px',
});