import React from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Button
} from '@mui/material';

const CustomCard = ({
                                 title,
                                 content,
                                 actions = [],
                                 onClick
                             }) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }} onClick={onClick}>
            {title && (
                <CardHeader
                    title={title}
                />
            )}

            {content && (
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {content}
                    </Typography>
                </CardContent>
            )}

            {actions.length > 0 && (
                <CardActions>
                    {actions.map((action, index) => (
                        <Button
                            key={index}
                            size="small"
                            onClick={action.onClick}
                            color={action.color || 'primary'}
                        >
                            {action.label}
                        </Button>
                    ))}
                </CardActions>
            )}
        </Card>
    );
};

export default CustomCard;
