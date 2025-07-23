import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, InputAdornment} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { Clear as ClearIcon } from '@mui/icons-material';

import {
    StyledForm,
    StyledTextField
} from '../Card/FormCard.style'; 

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
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle sx={{ m: 0, p: 2 }}>
                작업 수정
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
                {initialData ? (
                    <div style={{ padding: '10px' }}> 
                        <StyledForm>
                            <StyledTextField
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
                            <StyledTextField
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
                            <StyledTextField
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
                            <StyledTextField
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
                        </StyledForm>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
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