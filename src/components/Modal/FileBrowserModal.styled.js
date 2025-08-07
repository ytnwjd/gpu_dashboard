import { styled } from '@mui/material/styles';
import { Button } from '@mui/material';

export const StyledOverlay = styled('div')({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(224, 224, 224, .7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
});

export const StyledModal = styled('div')({
    backgroundColor: '#fefefe', 
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
    width: '90%',
    maxWidth: '1000px',
    maxHeight: '90%',
    overflowY: 'auto',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
});

export const StyledModalHeader = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '10px',
    marginBottom: '15px',
    '& h2': {
        margin: 0,
    },
});

export const StyledModalBody = styled('div')({
    flexGrow: 1,
    overflowY: 'auto',
    display: 'flex',
});

export const StyledCloseButton = styled('button')({
    background: 'none',
    border: 'none',
    fontSize: '2em',
    cursor: 'pointer',
    color: '#666',
    '&:hover': {
        color: '#333',
    },
});

export const StyledMessage = styled('p')({
    textAlign: 'center',
    padding: '20px',
    fontSize: '1.1em',
    color: '#555',
});

export const StyledErrorMessage = styled(StyledMessage)({ 
    color: '#d32f2f', 
});

export const StyledModalActions = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderTop: '1px solid #eee',
    marginTop: '15px',
});

export const StyledConfirmButton = styled(Button)({
    backgroundColor: '#143d60',
    color: 'white',
    '&:hover': {
        backgroundColor: '#082238',
    },
    '&:disabled': {
        backgroundColor: '#e0e0e0',
    }
});