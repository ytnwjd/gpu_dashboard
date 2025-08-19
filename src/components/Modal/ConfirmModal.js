import React from 'react';
import { Dialog, Typography, DialogContent, DialogActions } from '@mui/material';
import './ConfirmModal.css';

const ConfirmModal = ({ open, onClose, onConfirm, gpuInfo }) => {
    const { gpu24gbAvailable = 0, gpu8gbAvailable = 0, jobsInQueue = 0 } = gpuInfo || {};
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
            <DialogContent className="confirm-dialog-content">
                <Typography className="confirm-dialog-text" variant="body1" id="confirm-dialog-description">
                    {dialogMessage}
                    <br />
                </Typography>
                <Typography variant="body2" sx={{ color: '#0A1A28', marginTop: '10px' }}>
                    현재 대기 중인 job은 {jobsInQueue}개입니다.
                </Typography>
            </DialogContent>
            <DialogActions className="confirm-dialog-actions">
                <button className="confirm-button" onClick={onConfirm}>
                    네
                </button>
                <button className="cancel-button" onClick={onClose}>
                    아니오
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmModal;