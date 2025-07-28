import { styled } from '@mui/material/styles';

export const StyledFileItemContainer = styled('div')(({ theme }) => ({ 
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper || '#fff', 
    transition: 'background-color 0.2s',

    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
}));

export const StyledIconSpan = styled('span')({
    marginRight: '10px',
});

export const StyledNameSpan = styled('span')({
    flexGrow: 1,
});

export const StyledMetaSpan = styled('span')({
    marginRight: '10px',
    color: '#666',
    fontSize: '0.8em',
});

export const StyledDownloadButton = styled('button')(({ theme }) => ({
    padding: '5px 10px',
    backgroundColor: theme.palette.primary.main || '#007bff',
    color: theme.palette.primary.contrastText || 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',

    '&:hover': {
        backgroundColor: theme.palette.primary.dark || '#0056b3',
    },
}));