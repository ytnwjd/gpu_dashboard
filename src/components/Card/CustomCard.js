import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider
} from '@mui/material';
import RoundedButton from '../Button/RoundedButton';
import './CustomCard.css';

const CustomCard = ({
                        title = null,
                        content = null,
                        label= null,
                        width = 'auto',
                        height = 'auto',
                        onButtonClick = () => {}
                    }) => {
    return (
        <Card 
            className="custom-card"
            style={{ width, height }}
        >
            {title && (
                <CardHeader 
                    className="custom-card-header"
                    title={title} 
                />
            )}

            <Divider className="custom-header-content-divider" />

            {content && (
                <CardContent className="custom-card-content">
                    {content}
                </CardContent>
            )}

            {label && (
                <>
                    <Divider className="custom-content-actions-divider" />

                    <CardActions className="custom-card-actions">
                        <RoundedButton
                            label={label}
                            width="80px"
                            height="40px"
                            state="enable"
                            onClick={onButtonClick}
                            icon={<CheckIcon sx={{ fontSize: 20, marginRight: 1 }} />}
                        />
                    </CardActions>
                </>
            )}

        </Card>
    );
};

export default CustomCard;