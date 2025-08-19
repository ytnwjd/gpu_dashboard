import React, { useState, useCallback } from 'react';
import CustomCard from './CustomCard';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Clear as ClearIcon, FolderOpen as FolderOpenIcon } from '@mui/icons-material';
import './FormCard.css';

import ConfirmModal from '../Modal/ConfirmModal';
import FileBrowserModal from '../Modal/FileBrowserModal';

const FormCard = ({ onJobSubmitSuccess, gpuInfo }) => {
    const [formData, setFormData] = useState({
        jobName: '',
        projectPath: '',
        venvPath: '',
        mainFile: ''
    });

    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const [isFileBrowserOpen, setIsFileBrowserOpen] = useState(false);
    const [currentPathField, setCurrentPathField] = useState(null);

    const updateFormData = useCallback((field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    }, []);

    const handleClear = useCallback((field) => () => {
        updateFormData(field, '');
    }, [updateFormData]);

    const handleSaveButtonClick = useCallback(() => {
        setOpenConfirmModal(true);
    }, []);

    const handleConfirm = useCallback(async () => {
        try {
            const response = await fetch("/api/jobs/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            
            if (response.ok && result.code === 200) {
                setFormData({
                    jobName: '',
                    projectPath: '',
                    venvPath: '',
                    mainFile: ''
                });
                
                if (onJobSubmitSuccess) {
                    onJobSubmitSuccess({ 
                        message: result.message, 
                        data: result.data 
                    });
                }
            } else {
                const errorMessage = result.message || `Job 생성에 실패했습니다. (코드: ${result.code || response.status})`;
                if (onJobSubmitSuccess) {
                    onJobSubmitSuccess({ message: errorMessage, data: null });
                }
            }
        } catch (error) {
            if (onJobSubmitSuccess) {
                onJobSubmitSuccess({ 
                    message: "네트워크 오류가 발생했습니다. 연결을 확인해주세요.", 
                    data: null 
                });
            }
        } finally {
            setOpenConfirmModal(false);
        }
    }, [formData, onJobSubmitSuccess]);

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
        if (field) {
            updateFormData(field, selectedPath);
        }
        
        setIsFileBrowserOpen(false);
        setCurrentPathField(null);
    }, [currentPathField, updateFormData]);

    const handleCancelConfirmModal = useCallback(() => {
        setOpenConfirmModal(false);
    }, []);

    const formContent = (
        <form className="form-card-form">
            <TextField
                className="form-card-text-field"
                label="job name"
                variant="outlined"
                fullWidth
                value={formData.jobName}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="clear job name"
                                onClick={handleClear('jobName')}
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => updateFormData('jobName', e.target.value)}
            />
            <TextField
                className="form-card-text-field"
                label="프로젝트 folder path"
                variant="outlined"
                fullWidth
                value={formData.projectPath}
                InputLabelProps={{ shrink: true }}
                InputProps={{
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
                                onClick={handleClear('projectPath')}
                                edge="end"
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => updateFormData('projectPath', e.target.value)}
            />
            <TextField
                className="form-card-text-field"
                label="venv folder path"
                variant="outlined"
                fullWidth
                value={formData.venvPath}
                InputLabelProps={{ shrink: true }}
                InputProps={{
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
                                onClick={handleClear('venvPath')}
                                edge="end"
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => updateFormData('venvPath', e.target.value)}
            />
            <TextField
                className="form-card-text-field"
                label="main file (ex. index.py)"
                variant="outlined"
                fullWidth
                value={formData.mainFile}
                InputLabelProps={{ shrink: true }}
                InputProps={{
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
                                onClick={handleClear('mainFile')}
                                edge="end"
                                size="small"
                            >
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                onChange={(e) => updateFormData('mainFile', e.target.value)}
            />
        </form>
    );

    return (
        <>
            <CustomCard
                title="GPU 사용 신청"
                content={formContent}
                label="저장"
                width='420px'
                height='500px'
                onButtonClick={handleSaveButtonClick}
            />

            <ConfirmModal
                open={openConfirmModal}
                onClose={handleCancelConfirmModal}
                onConfirm={handleConfirm}
                gpuInfo={gpuInfo}
                jobData={formData}
            />

            <FileBrowserModal
                isOpen={isFileBrowserOpen}
                onClose={handleCloseFileBrowser}
                onSelectPath={handlePathSelect}
                currentPathField={currentPathField}
                title={currentPathField === 'project' ? '프로젝트 폴더 선택' :
                       currentPathField === 'venv' ? '가상환경 폴더 선택' :
                       currentPathField === 'main' ? '메인 파일 선택' : '파일 탐색기'}
            />
        </>
    );
}

export default FormCard;