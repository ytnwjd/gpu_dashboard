import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import RoundedButton from '../Button/RoundedButton';

import {
    StyledCard,
    StyledCardHeader,
    StyledHeaderContentDivider,
    StyledCardContent,
    StyledContentActionsDivider,
    StyledCardActions,
} from './CustomCard.style';

const CustomCard = ({
                        title = null,
                        content = null,
                        label= null,
                        width = 'auto',
                        height = 'auto',
                        onButtonClick = () => {}
                    }) => {
    return (
        <StyledCard width={width} height={height}>
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
                            height="40px"
                            state="enable"
                            onClick={onButtonClick}
                            icon={<CheckIcon sx={{ fontSize: 20, marginRight: 1 }} />}
                        />
                    </StyledCardActions>
                </>
            )}

        </StyledCard>
    );
};

export default CustomCard;