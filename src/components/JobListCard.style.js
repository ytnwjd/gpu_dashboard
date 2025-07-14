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
    backgroundColor: "#0A1A2",
    borderRadius: '20px',
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
    overflowX: 'auto',
});

export const StyledTable = styled(Table)({

});

export const StyledTableHead = styled(TableHead)({

});

export const StyledHeaderTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#0A1A28',
    color: 'white',
    fontWeight: 'bold',
    padding: '8px 12px',
    textAlign: 'center',
    fontFamily: theme.typography.fontFamily,
    borderBottom: '1px solid #3C4756',
}));

export const StyledTableRow = styled(TableRow)({

});

export const StyledTableBody = styled(TableBody)({
    backgroundColor: '#0A1A28',
    color: 'white',
});

export const StyledMessageTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: 'center',
    paddingTop: theme.spacing(13),
    paddingBottom: theme.spacing(13),
    color: 'white',
}));

export const StyledMessageTypography = styled(Typography)(({ theme }) => ({
    fontFamily: theme.typography.fontFamily,
}));

export const StyledBodyTableCell = styled(TableCell)(({ theme }) => ({
    color: 'white',
    fontFamily: theme.typography.fontFamily,
    padding: '8px 12px',
    borderBottom: '1px solid #3C4756',
}));