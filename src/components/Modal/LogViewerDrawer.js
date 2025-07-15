import React from 'react';
import { Drawer, IconButton, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

import {
    StyledDrawerPaper,
    StyledDrawerHeader,
    StyledDrawerTitle,
    StyledDrawerContent,
    StyledLogLine,
} from './LogViewerDrawer.style';

import { StyledHeaderContentDivider } from '../Card/CustomCard.style'

const LogViewerDrawer = ({ open, onClose, jobName, logs }) => {
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            PaperProps={{
                component: StyledDrawerPaper,
            }}
        >
            <StyledDrawerHeader>
                <StyledDrawerTitle variant="h6">
                    [{jobName}] logs
                </StyledDrawerTitle>
                <IconButton onClick={onClose} sx={{ color: '#0A1A28' }}>
                    <CloseIcon />
                </IconButton>
            </StyledDrawerHeader>
            <StyledHeaderContentDivider sx={{ margin: '0 20px'}}/>
            <StyledDrawerContent>
                {logs.length > 0 ? (
                    logs.map((logLine, index) => (
                        <StyledLogLine key={index} variant="body2">
                            {logLine}
                        </StyledLogLine>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ color: 'white', padding: '15px' }}>
                        로그 내용이 없습니다.
                    </Typography>
                )}
            </StyledDrawerContent>
        </Drawer>
    );
};

export default LogViewerDrawer;