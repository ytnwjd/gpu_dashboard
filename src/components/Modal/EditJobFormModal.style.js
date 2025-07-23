import { styled } from '@mui/material/styles'; 
import { Dialog, DialogTitle, DialogContent, IconButton, InputAdornment } from '@mui/material'; 

export const StyledDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialog-paper': {
      borderRadius: theme.shape.borderRadius, 
      boxShadow: theme.shadows[3],
    },
}));

export const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
    margin: 0,
    padding: theme.spacing(2),
    position: 'relative',
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
    padding: theme.spacing(2),
}));

export const StyledCloseIconButton = styled(IconButton)(({ theme }) => ({
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
}));

export const StyledButtonContainer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    gap: theme.spacing(1.25),   // 10px
    marginTop: theme.spacing(2.5),  // 20px
}));

export const StyledInputAdornment = styled(InputAdornment)(() => ({
    
}));