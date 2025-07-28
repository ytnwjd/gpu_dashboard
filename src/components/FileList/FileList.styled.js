import { styled } from '@mui/material/styles';

export const StyledFileListContainer = styled('div')(({ theme }) => ({
    border: `1px solid ${theme.palette.divider || '#ddd'}`, 
    borderRadius: '8px',
    marginTop: '20px',
    overflow: 'hidden',
}));

export const StyledEmptyMessage = styled('p')(({ theme }) => ({
    textAlign: 'center',
    padding: '20px',
    color: theme.palette.text.secondary || '#555', 
    fontSize: '1.1em',
}));