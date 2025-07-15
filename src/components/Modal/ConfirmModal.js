import React from 'react';
import { Dialog, Typography} from '@mui/material';

import {
    StyledDialogContent,
    StyledDialogText,
    StyledDialogActions,
    StyledConfirmButton,
    StyledCancelButton,
} from './ConfirmModal.style'

const ConfirmModal = ({ open, onClose, onConfirm, pendingJobsCount }) => {
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
                    사용 가능한 GPU가 없습니다.
                    <br />
                    대기하시겠습니까?
                </StyledDialogText>
                <Typography variant="body2" sx={{ color: '#0A1A28', marginTop: '10px' }}>
                    현재 대기 중인 job은 {pendingJobsCount}개입니다.
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