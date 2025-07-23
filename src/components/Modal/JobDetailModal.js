import React from 'react';
import { Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import {
    StyledDialog,
    StyledDialogTitle,
    StyledDialogContent,
    StyledCloseIconButton,
    StyledDetailBox,
    StyledDetailTypography
} from './JobDetailModal.style'; 

const JobDetailModal = ({ open, onClose, jobDetail }) => {
    return (
        <StyledDialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <StyledDialogTitle>
                Job 상세 정보
                <StyledCloseIconButton
                    aria-label="close"
                    onClick={onClose}
                >
                    <CloseIcon />
                </StyledCloseIconButton>
            </StyledDialogTitle>
            <StyledDialogContent dividers>
                {jobDetail ? (
                    <StyledDetailBox>
                        <StyledDetailTypography variant="body1">
                            <strong>타임스탬프:</strong> {jobDetail.timestamp}
                        </StyledDetailTypography>
                        <StyledDetailTypography variant="body1">
                            <strong>Job 이름:</strong> {jobDetail.jobName}
                        </StyledDetailTypography>
                        <StyledDetailTypography variant="body1">
                            <strong>프로젝트 경로:</strong> {jobDetail.projectPath}
                        </StyledDetailTypography>
                        <StyledDetailTypography variant="body1">
                            <strong>Venv 경로:</strong> {jobDetail.venvPath}
                        </StyledDetailTypography>
                        <StyledDetailTypography variant="body1">
                            <strong>메인 파일:</strong> {jobDetail.mainFile}
                        </StyledDetailTypography>
                        <StyledDetailTypography variant="body1">
                            <strong>상태:</strong> {jobDetail.status}
                        </StyledDetailTypography>
                    </StyledDetailBox>
                ) : (
                    <Typography>상세 정보를 불러오는 중입니다...</Typography>
                )}
            </StyledDialogContent>
        </StyledDialog>
    );
}

export default JobDetailModal;