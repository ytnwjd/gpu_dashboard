import React, { useState, useEffect } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, InputAdornment, TextField } from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close';
import { Clear as ClearIcon } from '@mui/icons-material';
import './EditJobFormModal.css';
import '../../components/Card/Card.css';

import RoundedButton from "../Button/RoundedButton";

const EditJobFormModal = ({ initialData, open, onClose, onSave }) => { 
    
    const [jobName, setJobName] = useState(initialData?.jobName || '');
    const [projectPath, setProjectPath] = useState(initialData?.projectPath || '');
    const [venvPath, setVenvPath] = useState(initialData?.venvPath || '');
    const [mainFile, setMainFile] = useState(initialData?.mainFile || '');

    useEffect(() => {
        if (initialData) {
            setJobName(initialData.jobName || '');
            setProjectPath(initialData.projectPath || '');
            setVenvPath(initialData.venvPath || '');
            setMainFile(initialData.mainFile || '');
        }
    }, [initialData]);

    const handleClear = (setter) => () => {
        setter('');
    };

    const handleSubmit = () => {
        const updatedData = {
            jobName,
            projectPath,
            venvPath,
            mainFile
        };
       
        onSave(updatedData); 
        onClose();
    };

    return (
        <Dialog
            className="edit-job-dialog"
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle className="edit-job-dialog-title">
                작업 수정
                <IconButton
                    className="edit-job-close-icon-button"
                    aria-label="close"
                    onClick={onClose}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className="edit-job-dialog-content" dividers> 
                {initialData ? (
                    <div style={{ padding: '10px' }}> 
                        <form className="form-card-form">
                            <TextField
                                className="form-card-text-field"
                                label="job name"
                                variant="standard"
                                fullWidth
                                value={jobName}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end"> 
                                            <IconButton
                                                aria-label="clear job name"
                                                onClick={handleClear(setJobName)}
                                                size="small"
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setJobName(e.target.value)}
                            />
                            <TextField
                                className="form-card-text-field"
                                label="프로젝트 folder path"
                                variant="standard"
                                fullWidth
                                value={projectPath}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="clear project path"
                                                onClick={handleClear(setProjectPath)}
                                                edge="end"
                                                size="small"
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setProjectPath(e.target.value)}
                            />
                            <TextField
                                className="form-card-text-field"
                                label="venv folder path"
                                variant="standard"
                                fullWidth
                                value={venvPath}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="clear venv path"
                                                onClick={handleClear(setVenvPath)}
                                                edge="end"
                                                size="small"
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setVenvPath(e.target.value)}
                            />
                            <TextField
                                className="form-card-text-field"
                                label="main file (ex. index.py)"
                                variant="standard"
                                fullWidth
                                value={mainFile}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="clear main file"
                                                onClick={handleClear(setMainFile)}
                                                edge="end"
                                                size="small"
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                onChange={(e) => setMainFile(e.target.value)}
                            />
                        </form>
                        <div className="edit-job-button-container">
                            <RoundedButton
                                label="취소" 
                                state="enable"
                                onClick={onClose} 
                            />
                            <RoundedButton
                                label="저장"
                                state="enable"
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                ) : (
                    <p>작업 데이터를 불러오는 중...</p>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default EditJobFormModal;