import { styled } from '@mui/material/styles';
import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography,
    Card,
    CardContent,
} from '@mui/material';

export const StyledCard = styled(Card)(({ width, height, onClick }) => ({
    width: width || 'auto',
    height: height || 'auto',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
    boxShadow: 3,
    cursor: onClick ? 'pointer' : 'default',
}));

export const StyledCardContent = styled(CardContent)(() => ({
    flexGrow: 1,
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    '&.MuiCardContent-root': {
        padding: '0 !important',
    },
    '&:last-child': {
        paddingBottom: '0 !important',
    },
}));

export const StyledTableContainer = styled(Box)({
    width: '100%',
    height: '300px', 
    overflowY: 'scroll',
    overflowX: 'hidden',
    '&::-webkit-scrollbar': {
        width: '8px',
    },
    '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-thumb': {
        background: '#888',
        borderRadius: '4px',
        '&:hover': {
            background: '#555',
        },
    },
});

export const StyledTable = styled(Table)({
    minWidth: 650,
    tableLayout: 'fixed',
});

export const StyledTableHead = styled(TableHead)({

});

export const StyledHeaderTableCell = styled(TableCell)(({ theme }) => ({
    color: '#0A1A28',
    fontWeight: 'bold',
    padding: '8px 12px',
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily,
    borderBottom: '1px solid #3C4756',
}));

export const StyledTableRow = styled(TableRow)({

});

export const StyledTableBody = styled(TableBody)({
    color: '#0A1A28',
});

export const StyledMessageTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(13),
    paddingBottom: theme.spacing(13),
}));

export const StyledMessageTypography = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
}));

export const StyledBodyTableCell = styled(TableCell)(({ theme }) => ({
    color: '#0A1A28',
    fontFamily: theme.typography.fontFamily,
    padding: '2px 8px',
    textAlign: 'center',
}));

export const StyledTextButton = styled(Typography)({
    color: '#0A1A28',
    cursor: 'pointer',
    textDecoration: 'underline',
    '&:hover': {
        color: 'black',
    },
});