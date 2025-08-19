import React from 'react';
import { Button } from '@mui/material';
import './RoundedButton.css';

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
        <Button
            className="rounded-button"
            style={{ width, height }}
            disabled={!isEnabled}
            onClick={onClick}
        >
            {icon && icon}
            {label}
        </Button>
    );
};

export default RoundedButton;
