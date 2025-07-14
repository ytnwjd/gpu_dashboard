import React from 'react';
import StyledButton from './Button.style';

const RoundedButton =  ({
                            label = null,
                            width = '65px',
                            height = '48px',
                            state = 'enable',
                            icon = null,
                            onClick = () => {}
                        }) => {
    const isEnabled = state === 'enable';

    return (
        <StyledButton
            width={width}
            height={height}
            disabled={!isEnabled}
            isEnabled={isEnabled}
            onClick={onClick}
        >
            {icon && icon}
            {label}
        </StyledButton>
    );
};

export default RoundedButton;
