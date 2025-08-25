import React from 'react';
import { Drawer, IconButton, Typography, Divider } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import './Modal.css';

const LogViewerDrawer = ({ open, onClose, jobName, logs }) => {
    return (
        <Drawer
            anchor="left"
            open={open}
            onClose={onClose}
            PaperProps={{
                className: 'log-drawer-paper',
            }}
        >
            <div className="log-drawer-header">
                <Typography className="log-drawer-title" variant="h6">
                    [{jobName}] logs
                </Typography>
                <IconButton onClick={onClose} sx={{ color: '#0A1A28' }}>
                    <CloseIcon />
                </IconButton>
            </div>
            <Divider sx={{ backgroundColor: '#83A000', margin: '0 20px' }} />
            <div className="log-drawer-content">
                {logs.length > 0 ? (
                    logs.map((logLine, index) => (
                        <Typography key={index} className="log-line" variant="body2">
                            {logLine}
                        </Typography>
                    ))
                ) : (
                    <Typography variant="body1" sx={{ color: 'white', padding: '15px' }}>
                        로그 내용이 없습니다.
                    </Typography>
                )}
            </div>
        </Drawer>
    );
};

export default LogViewerDrawer;