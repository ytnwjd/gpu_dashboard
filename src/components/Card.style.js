import { styled } from '@mui/material/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider
} from '@mui/material';

export const StyledCard = styled(Card)(({ width, height }) => ({
    width: width,
    height: height,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#fefefe",
    borderRadius: "20px",
    boxShadow: 3,
}));

export const StyledCardHeader = styled(CardHeader)({
    backgroundColor: "#E5F3A3",
    padding: '12px 30px',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
});

export const StyledHeaderContentDivider = styled(Divider)({
    backgroundColor: '#83A000',
    height: '1px',
    width: '100%',
    alignSelf: 'center',
});

export const StyledCardContent = styled(CardContent)({
    flexGrow: 1,
    padding: '15px 20px',
});

export const StyledContentActionsDivider = styled(Divider)({
    backgroundColor: '#e0e0e0',
    height: '1px',
    width: '100%',
    alignSelf: 'center',
});

export const StyledCardActions = styled(CardActions)({
    padding: '10px',
    justifyContent: 'flex-end',
});