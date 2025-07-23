import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography, Box} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';

const JobDetailModal = ({ open, onClose, jobDetail }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                Job 상세 정보
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                {jobDetail ? (
                    <Box sx={{ p: 2 }}>
                        <Typography variant="body1" gutterBottom>
                            <strong>타임스탬프:</strong> {jobDetail.timestamp}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Job 이름:</strong> {jobDetail.jobName}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>프로젝트 경로:</strong> {jobDetail.projectPath}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>Venv 경로:</strong> {jobDetail.venvPath}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>메인 파일:</strong> {jobDetail.mainFile}
                        </Typography>
                        <Typography variant="body1" gutterBottom>
                            <strong>상태:</strong> {jobDetail.status}
                        </Typography>
                    </Box>
                ) : (
                    <Typography>상세 정보를 불러오는 중입니다...</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default JobDetailModal;