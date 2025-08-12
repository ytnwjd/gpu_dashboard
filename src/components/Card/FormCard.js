import React, { useState } from 'react';
import CustomCard from './CustomCard';
import { IconButton, InputAdornment } from '@mui/material';
import { Clear as ClearIcon, FolderOpen as FolderOpenIcon } from '@mui/icons-material';

import {
    StyledForm,
    StyledTextField
} from './FormCard.style';

import ConfirmModal from '../Modal/ConfirmModal';
import FileBrowserModal from '../Modal/FileBrowserModal';

const FormCard = ({ onJobSubmitSuccess, gpuInfo }) => {

    const [jobName, setJobName] = useState('first job');
    const [projectPath, setProjectPath] = useState('/home/workspace');
    const [venvPath, setVenvPath] = useState('/home/workspace/.venv');
    const [mainFile, setMainFile] = useState('/home/workspace/index.py');

    const [openConfirmModal, setOpenConfirmModal] = useState(false); 
    
    // FileBrowserModal의 열림 상태 & 어떤 필드를 위한 모달인지 
    const [isFileBrowserOpen, setIsFileBrowserOpen] = useState(false);
    const [currentPathField, setCurrentPathField] = useState(null);

    const handleClear = (setter) => () => {
        setter('');
    };

    const handleSaveButtonClick = () => {
        setOpenConfirmModal(true);
    };

    const handleConfirm = async () => {    
        const jobData = {
            jobName: jobName,
            projectPath: projectPath,
            venvPath: venvPath,
            mainFile: mainFile
        };
    
        try {
            const response = await fetch("api/jobs/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(jobData),
            });
    
            const result = await response.json();
            const finalResult = response.ok ? result : result.detail;
    
            if (response.ok && finalResult.code === 200) {
                setOpenConfirmModal(false);
                if (onJobSubmitSuccess) {
                    onJobSubmitSuccess({ message: finalResult.message, data: finalResult.data });
                }
            } else {
                const errorMessage = finalResult.message || `Job 생성에 실패했습니다. (코드: ${finalResult.code || response.status})`;
                setOpenConfirmModal(false);
                if (onJobSubmitSuccess) {
                    onJobSubmitSuccess({ message: errorMessage, data: null });
                }
            }
        } catch (error) {
            setOpenConfirmModal(false);
            if (onJobSubmitSuccess) {
                onJobSubmitSuccess({ message: "Job 생성 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.", data: null });
            }
        }
    };

    const handleCancelConfirmModal = () => {
        setOpenConfirmModal(false);
    };

    const handleOpenFileBrowser = (field) => () => {
        setCurrentPathField(field);
        setIsFileBrowserOpen(true);
    };

    const handleCloseFileBrowser = () => {
        setIsFileBrowserOpen(false);
        setCurrentPathField(null);
    };

    const handlePathSelect = (selectedPath) => {
        if (currentPathField === 'project') {
            setProjectPath(selectedPath);
        } else if (currentPathField === 'venv') {
            setVenvPath(selectedPath);
        } else if (currentPathField === 'main') {
            setMainFile(selectedPath);
        }
        setIsFileBrowserOpen(false);
        setCurrentPathField(null);
    };

    const formContent = (
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
                                aria-label="open file browser"
                                onClick={handleOpenFileBrowser('project')} // FileBrowserModal 열기
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
                onChange={(e) => setMainFile(e.target.value)}
            />
        </StyledForm>
    );

    return (
        <>
            <CustomCard
                title="GPU 사용 신청"
                content={formContent}
                label="저장"
                width='420px'
                height='570px'
                onButtonClick={handleSaveButtonClick}
            />

            <ConfirmModal
                open={openConfirmModal}
                onClose={handleCancelConfirmModal}
                onConfirm={handleConfirm}
                gpuInfo={gpuInfo}
            />

            <FileBrowserModal
                isOpen={isFileBrowserOpen}
                onClose={handleCloseFileBrowser}
                onSelectPath={handlePathSelect} // 경로 선택 콜백 전달
                currentPathField={currentPathField}
                title={currentPathField === 'project' ? '프로젝트 폴더 선택' :
                       currentPathField === 'venv' ? '가상 환경 폴더 선택' :
                       currentPathField === 'main' ? '메인 파일 선택' : '파일 탐색기'}
            />
        </>
    );
}

export default FormCard;