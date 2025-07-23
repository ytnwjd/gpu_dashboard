import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close';
import { Clear as ClearIcon } from '@mui/icons-material';

import {
    StyledForm,
    StyledTextField
} from '../Card/FormCard.style'; 

import RoundedButton from "../Button/RoundedButton";

import {
    StyledDialog,
    StyledDialogTitle,
    StyledDialogContent,
    StyledCloseIconButton,
    StyledButtonContainer,
    StyledInputAdornment
} from './EditJobFormModal.style'; 

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
        <StyledDialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
        >
            <StyledDialogTitle>
                작업 수정
                <StyledCloseIconButton
                    aria-label="close"
                    onClick={onClose}
                >
                    <CloseIcon />
                </StyledCloseIconButton>
            </StyledDialogTitle>
            <StyledDialogContent dividers> 
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
                                        <StyledInputAdornment position="end"> 
                                            <IconButton
                                                aria-label="clear job name"
                                                onClick={handleClear(setJobName)}
                                                size="small"
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </StyledInputAdornment>
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
                                        <StyledInputAdornment position="end">
                                            <IconButton
                                                aria-label="clear project path"
                                                onClick={handleClear(setProjectPath)}
                                                edge="end"
                                                size="small"
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </StyledInputAdornment>
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
                                        <StyledInputAdornment position="end">
                                            <IconButton
                                                aria-label="clear venv path"
                                                onClick={handleClear(setVenvPath)}
                                                edge="end"
                                                size="small"
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </StyledInputAdornment>
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
                                        <StyledInputAdornment position="end">
                                            <IconButton
                                                aria-label="clear main file"
                                                onClick={handleClear(setMainFile)}
                                                edge="end"
                                                size="small"
                                            >
                                                <ClearIcon />
                                            </IconButton>
                                        </StyledInputAdornment>
                                    ),
                                }}
                                onChange={(e) => setMainFile(e.target.value)}
                            />
                        </StyledForm>
                        <StyledButtonContainer>
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
                        </StyledButtonContainer>
                    </div>
                ) : (
                    <p>작업 데이터를 불러오는 중...</p>
                )}
            </StyledDialogContent>
        </StyledDialog>
    );
}

export default EditJobFormModal;