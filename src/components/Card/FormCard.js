import React, { useState } from 'react';
import CustomCard from './CustomCard';
import { IconButton, InputAdornment } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

import {
    StyledForm,
    StyledTextField
} from './FormCard.style';

import ConfirmModal from '../Modal/ConfirmModal';

const FormCard = ({ onJobSubmitSuccess, gpuInfo }) => {

    const [jobName, setJobName] = useState('first job');
    const [projectPath, setProjectPath] = useState('/home/workspace');
    const [venvPath, setVenvPath] = useState('/home/workspace/.venv');
    const [mainFile, setMainFile] = useState('/home/workspace/index.py');

    const [openModal, setOpenModal] = useState(false);

    const handleClear = (setter) => () => {
        setter('');
    };

    const handleSaveButtonClick = () => {
        setOpenModal(true);
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
                setOpenModal(false);
                if (onJobSubmitSuccess) {
                    onJobSubmitSuccess({ message: finalResult.message, data: finalResult.data });
                }
            } else {
                const errorMessage = finalResult.message || `Job 생성에 실패했습니다. (코드: ${finalResult.code || response.status})`;
                setOpenModal(false);
                if (onJobSubmitSuccess) {
                    onJobSubmitSuccess({ message: errorMessage, data: null });
                }
            }
        } catch (error) {
            setOpenModal(false);
            if (onJobSubmitSuccess) {
                onJobSubmitSuccess({ message: "Job 생성 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.", data: null });
            }
        }
    };

    const handleCancel = () => {
        setOpenModal(false);
    };

    const formContent = (
        <StyledForm>
            <StyledTextField
                label="job name"
                variant="standard"
                fullWidth
                value={jobName}
                InputLabelProps={{ shrink: true }} // 라벨 항상 보이게
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
                open={openModal}
                onClose={handleCancel}
                onConfirm={handleConfirm}
                gpuInfo={gpuInfo}
            />
        </>
    );
}

export default FormCard;