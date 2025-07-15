import React, {useState} from 'react';
import CustomCard from './CustomCard'
import { IconButton, InputAdornment } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

import {
    StyledForm,
    StyledTextField
} from './FormCard.style';

import ConfirmModal from '../Modal/ConfirmModal';

const FormCard = () => {

    const [jobName, setJobName] = useState('first job');
    const [projectPath, setProjectPath] = useState('/home/workspace');
    const [venvPath, setVenvPath] = useState('/home/workspace/.venv');
    const [mainFile, setMainFile] = useState('/home/workspace/index.py');

    const [openModal, setOpenModal] = useState(false);
    const [pendingJobsCount, setPendingJobsCount] = useState(7);

    const handleClear = (setter) => () => {
        setter('');
    };

    const handleSaveButtonClick = () => {
        setOpenModal(true);
    };

    const handleConfirm = () => {
        console.log("job 제출");
        // 실제 Job 제출 로직 (API 호출 등)
        setOpenModal(false);
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
                pendingJobsCount={pendingJobsCount}
            />
        </>
    );
}

export default FormCard;