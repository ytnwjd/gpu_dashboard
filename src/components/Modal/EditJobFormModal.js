import React, { useState, useEffect, useCallback } from 'react';
import { IconButton, Dialog, DialogTitle, DialogContent, InputAdornment, TextField } from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close';
import { Clear as ClearIcon, FolderOpen as FolderOpenIcon } from '@mui/icons-material';
import './Modal.css';
import '../../components/Card/Card.css';

import RoundedButton from "../Button/RoundedButton";
import FileBrowserModal from './FileBrowserModal';

const EditJobFormModal = ({ initialData, open, onClose, onSave }) => { 
    
    const [jobName, setJobName] = useState(initialData?.jobName || '');
    const [projectPath, setProjectPath] = useState(initialData?.projectPath || '');
    const [venvPath, setVenvPath] = useState(initialData?.venvPath || '');
    const [mainFile, setMainFile] = useState(initialData?.mainFile || '');
    
    const [isFileBrowserOpen, setIsFileBrowserOpen] = useState(false);
    const [currentPathField, setCurrentPathField] = useState(null);

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
    
    const handleOpenFileBrowser = useCallback((field) => () => {
        setCurrentPathField(field);
        setIsFileBrowserOpen(true);
    }, []);
    
    const handleCloseFileBrowser = useCallback(() => {
        setIsFileBrowserOpen(false);
        setCurrentPathField(null);
    }, []);
    
    const handlePathSelect = useCallback((selectedPath) => {
        const fieldMap = {
            'project': 'projectPath',
            'venv': 'venvPath',
            'main': 'mainFile'
        };
        
        const field = fieldMap[currentPathField];
        if (field === 'projectPath') {
            setProjectPath(selectedPath);
        } else if (field === 'venvPath') {
            setVenvPath(selectedPath);
        } else if (field === 'mainFile') {
            setMainFile(selectedPath);
        }
        
        setIsFileBrowserOpen(false);
        setCurrentPathField(null);
    }, [currentPathField]);

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
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="open file browser"
                                                onClick={handleOpenFileBrowser('project')}
                                                edge="end"
                                                size="small"
                                            >
                                                <FolderOpenIcon />
                                            </IconButton>
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
                            />
                            <TextField
                                className="form-card-text-field"
                                label="venv folder path"
                                variant="standard"
                                fullWidth
                                value={venvPath}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="open file browser"
                                                onClick={handleOpenFileBrowser('venv')}
                                                edge="end"
                                                size="small"
                                            >
                                                <FolderOpenIcon />
                                            </IconButton>
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
                            />
                            <TextField
                                className="form-card-text-field"
                                label="main file (ex. index.py)"
                                variant="standard"
                                fullWidth
                                value={mainFile}
                                InputLabelProps={{ shrink: true }}
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="open file browser"
                                                onClick={handleOpenFileBrowser('main')}
                                                edge="end"
                                                size="small"
                                            >
                                                <FolderOpenIcon />
                                            </IconButton>
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
            
            <FileBrowserModal
                isOpen={isFileBrowserOpen}
                onClose={handleCloseFileBrowser}
                onSelectPath={handlePathSelect}
                currentPathField={currentPathField}
                title={currentPathField === 'project' ? '프로젝트 폴더 선택' :
                       currentPathField === 'venv' ? '가상환경 폴더 선택' :
                       currentPathField === 'main' ? '메인 파일 선택' : '파일 탐색기'}
            />
        </Dialog>
    );
}

export default EditJobFormModal;