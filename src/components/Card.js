import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import RoundedButton from "./RoundedButton";

import {
    StyledCard,
    StyledCardHeader,
    StyledHeaderContentDivider,
    StyledCardContent,
    StyledContentActionsDivider,
    StyledCardActions,
} from './Card.style';

const Card = ({
                        title = null,
                        content = null,
                        label= null,
                        width = 'auto',
                        height = 'auto',
                        onClick = () => {}
                    }) => {
    return (
        <StyledCard width={width} height={height} onClick={onClick}>
            {title && (
                <StyledCardHeader title={title} />
            )}

            <StyledHeaderContentDivider />

            {content && (
                <StyledCardContent>
                    {content}
                </StyledCardContent>
            )}

            {label && (
                <>
                    <StyledContentActionsDivider />

                    <StyledCardActions>
                        <RoundedButton
                            label={label}
                            width="80px"
                            height="48px"
                            state="disable"
                            onClick={onClick}
                            icon={<CheckIcon sx={{ fontSize: 20, marginRight: 1 }} />}
                        />
                    </StyledCardActions>
                </>
            )}

        </StyledCard>
    );
};

export default Card;