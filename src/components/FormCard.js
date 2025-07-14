import React from 'react';
import CustomCard from './Card/CustomCard'
import { IconButton, InputAdornment } from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

import {
    StyledForm,
    StyledTextField
} from './FormCard.style';

const FormCard = () => {

    const [jobName, setJobName] = React.useState('first job');
    const [projectPath, setProjectPath] = React.useState('/home/workspace');
    const [venvPath, setVenvPath] = React.useState('/home/workspace/.venv');
    const [mainFile, setMainFile] = React.useState('/home/workspace/index.py');

    const handleClear = (setter) => () => {
        setter('');
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
        <CustomCard
            title="GPU 사용 신청"
            content={formContent}
            label="저장"
            width='420px'
            height='570px'
        />
    );
}

export default FormCard;