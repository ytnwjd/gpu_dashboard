import React, { useState } from 'react';
import CustomCard from './CustomCard';
import { IconButton, InputAdornment } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

import {
    StyledForm,
    StyledTextField
} from './FormCard.style';

import ConfirmModal from '../Modal/ConfirmModal';

const FormCard = ({ onJobSubmitSuccess }) => {

    const [jobName, setJobName] = useState('first job');
    const [projectPath, setProjectPath] = useState('/home/workspace');
    const [venvPath, setVenvPath] = useState('/home/workspace/.venv');
    const [mainFile, setMainFile] = useState('/home/workspace/index.py');

    const [openModal, setOpenModal] = useState(false);
    const [gpuStatus, setGpuStatus] = useState({
        gpu24gbActive: 0,
        gpu8gbActive: 0,
        gpu24gbAvailable: 0,
        gpu8gbAvailable: 0,
        jobsInQueue: 0,
    });

    const handleClear = (setter) => () => {
        setter('');
    };

    const handleSaveButtonClick = async () => {
        try {
            const response = await fetch("/api/gpu", { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const result = await response.json();

            if (response.ok && result.code === 200) {
                setGpuStatus(result.data);
            } else {
                console.error("GPU 상태 가져오기 실패:", result.message || "알 수 없는 오류");
                
                setGpuStatus({
                    gpu24gbActive: 0,
                    gpu8gbActive: 0,
                    gpu24gbAvailable: 0,
                    gpu8gbAvailable: 0,
                    jobsInQueue: 0,
                });
            }
        } catch (error) {
            console.error("GPU 상태 가져오기 중 네트워크 오류:", error);
            
            setGpuStatus({
                gpu24gbActive: 0,
                gpu8gbActive: 0,
                gpu24gbAvailable: 0,
                gpu8gbAvailable: 0,
                jobsInQueue: 0,
            });
        } finally {
            setOpenModal(true); // GPU 상태를 가져온 후 모달 open
        }
    };

    const handleConfirm = async () => {
        console.log("Job 제출 시도...");

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

            if (response.ok && result.code === 200) {
                console.log("Job 생성 성공:", result.message, "Job ID:", result.data.id);
                setOpenModal(false);
                if (onJobSubmitSuccess) {
                    onJobSubmitSuccess(result.message);
                }
                window.location.reload();
            } else {
                const errorMessage = result.message || `Job 생성에 실패했습니다. (코드: ${result.code})`;
                console.error("Job 생성 실패:", errorMessage);
                setOpenModal(false);
                if (onJobSubmitSuccess) {
                    onJobSubmitSuccess(errorMessage);
                }
            }
        } catch (error) {
            console.error("Job 생성 중 네트워크 오류 또는 예외 발생:", error);
            setOpenModal(false);
            if (onJobSubmitSuccess) {
                onJobSubmitSuccess("Job 생성 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.");
            }
        }
    };

    const handleCancel = () => {
        console.log("Job 제출 취소");
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
                gpuStatus={gpuStatus}
            />
        </>
    );
}

export default FormCard;