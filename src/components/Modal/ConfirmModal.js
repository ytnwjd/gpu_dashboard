import React from 'react';
import { Dialog, Typography } from '@mui/material';

import {
    StyledDialogContent,
    StyledDialogText,
    StyledDialogActions,
    StyledConfirmButton,
    StyledCancelButton,
} from './ConfirmModal.style';

const ConfirmModal = ({ open, onClose, onConfirm, gpuStatus }) => {
    // gpuStatus에서 필요한 값들을 구조 분해 할당
    const { gpu24gbAvailable, gpu8gbAvailable, jobsInQueue } = gpuStatus;
    const totalAvailableGpus = gpu24gbAvailable + gpu8gbAvailable;

    // 조건부 메시지 생성
    let dialogMessage = "";
    if (totalAvailableGpus > 0) {
        dialogMessage = `현재 사용 가능한 GPU가 ${totalAvailableGpus}개 있습니다. Job을 제출하시겠습니까?`;
    } else {
        dialogMessage = "사용 가능한 GPU가 없습니다.";
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
            PaperProps={{
                sx: {
                    backgroundColor: 'white',
                    borderRadius: '10px',
                    width: '320px',
                    height: '200px',
                    padding: '20px',
                }
            }}
        >
            <StyledDialogContent>
                <StyledDialogText variant="body1" id="confirm-dialog-description">
                    {dialogMessage}
                    <br />
                </StyledDialogText>
                <Typography variant="body2" sx={{ color: '#0A1A28', marginTop: '10px' }}>
                    현재 대기 중인 job은 {jobsInQueue}개입니다.
                </Typography>
            </StyledDialogContent>
            <StyledDialogActions>
                <StyledConfirmButton onClick={onConfirm}>
                    네
                </StyledConfirmButton>
                <StyledCancelButton onClick={onClose}>
                    아니오
                </StyledCancelButton>
            </StyledDialogActions>
        </Dialog>
    );
};

export default ConfirmModal;