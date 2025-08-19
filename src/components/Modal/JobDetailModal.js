import React from 'react';
import { Typography, Dialog, DialogTitle, DialogContent, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './JobDetailModal.css';

const JobDetailModal = ({ open, onClose, jobDetail }) => {
    return (
        <Dialog
            className="job-detail-dialog"
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle className="job-detail-dialog-title">
                Job 상세 정보
                <IconButton
                    className="job-detail-close-icon-button"
                    aria-label="close"
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className="job-detail-dialog-content" dividers>
                {jobDetail ? (
                    <div className="job-detail-box">
                        <Typography className="job-detail-typography" variant="body1">
                            <strong>타임스탬프:</strong> {jobDetail.timestamp}
                        </Typography>
                        <Typography className="job-detail-typography" variant="body1">
                            <strong>Job 이름:</strong> {jobDetail.jobName}
                        </Typography>
                        <Typography className="job-detail-typography" variant="body1">
                            <strong>프로젝트 경로:</strong> {jobDetail.projectPath}
                        </Typography>
                        <Typography className="job-detail-typography" variant="body1">
                            <strong>Venv 경로:</strong> {jobDetail.venvPath}
                        </Typography>
                        <Typography className="job-detail-typography" variant="body1">
                            <strong>메인 파일:</strong> {jobDetail.mainFile}
                        </Typography>
                        <Typography className="job-detail-typography" variant="body1">
                            <strong>상태:</strong> {jobDetail.status}
                        </Typography>
                    </div>
                ) : (
                    <Typography>상세 정보를 불러오는 중입니다...</Typography>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default JobDetailModal;