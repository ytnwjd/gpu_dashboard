import { styled } from '@mui/material/styles';

export const StyledPaginationContainer = styled('div')`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 5px;
`;

export const StyledButton = styled('button')(({ theme, $isActive }) => ({ 
    padding: '8px 15px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: '#f8f8f8',
    cursor: 'pointer',
    fontSize: '1em',
    color: '#333',
    transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',

    '&:hover': {
        backgroundColor: '#e0e0e0',
        borderColor: '#c0c0c0',
    },

    '&:disabled': {
        cursor: 'not-allowed',
        opacity: 0.6,
        backgroundColor: '#f1f1f1',
        color: '#999',
    },

    ...($isActive && {
        backgroundColor: '#007bff', 
        color: 'white',
        borderColor: '#007bff',

        '&:hover': {
            backgroundColor: '#0056b3',
            borderColor: '#0056b3',
        },
    }),
}));