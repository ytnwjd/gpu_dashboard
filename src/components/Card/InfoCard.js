import React, { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import CustomCard from './CustomCard';
import './InfoCard.css';

const InfoCard = ({ gpuInfo }) => {
    const GPU_CONFIG = {
        gpu24gb: { total: 6, capacity: '24GB' },
        gpu8gb: { total: 12, capacity: '8GB' }
    };

    const defaultGpuStatus = {
        gpu24gbActive: 0,
        gpu8gbActive: 0,
        gpu24gbAvailable: GPU_CONFIG.gpu24gb.total,
        gpu8gbAvailable: GPU_CONFIG.gpu8gb.total,
        jobsInQueue: 0
    };

    const gpuStatus = gpuInfo || defaultGpuStatus;

    const createGpuIcons = (total, activeCount, capacity) => {
        return Array.from({ length: total }, (_, index) => (
            <Box
                key={`${capacity}-${index}`}
                className={`info-gpu-icon ${index < activeCount ? 'active' : ''}`}
            />
        ));
    };

    const gpu24gbIcons = useMemo(() => 
        createGpuIcons(GPU_CONFIG.gpu24gb.total, gpuStatus.gpu24gbActive, '24gb'),
        [gpuStatus.gpu24gbActive, GPU_CONFIG.gpu24gb.total]
    );

    const gpu8gbIcons = useMemo(() => 
        createGpuIcons(GPU_CONFIG.gpu8gb.total, gpuStatus.gpu8gbActive, '8gb'),
        [gpuStatus.gpu8gbActive, GPU_CONFIG.gpu8gb.total]
    );

    const GpuGroup = ({ capacity, total, activeCount, icons }) => (
        <Box className="info-gpu-group-wrapper">
            <Typography className="info-gpu-label" variant="body2">{capacity}</Typography>
            <Box className="info-gpu-grid-container">
                {icons}
            </Box>
        </Box>
    );

    const InfoText = ({ label, value, total, unit = '' }) => (
        <Typography className="info-typography" variant="body1">
            {label}: {value}{total ? `/${total}` : ''}{unit}
        </Typography>
    );

    const cardContent = (
        <Box className="info-content-wrapper">
            <Box className="info-main-content">
                <Box className="info-left-content">
                    <Typography className="info-available-gpu-text" variant="h6" sx={{ paddingLeft: '50px', marginBottom: '10px' }}>
                        Available GPU
                    </Typography>

                    <GpuGroup
                        capacity={GPU_CONFIG.gpu24gb.capacity}
                        total={GPU_CONFIG.gpu24gb.total}
                        activeCount={gpuStatus.gpu24gbActive}
                        icons={gpu24gbIcons}
                    />

                    <GpuGroup
                        capacity={GPU_CONFIG.gpu8gb.capacity}
                        total={GPU_CONFIG.gpu8gb.total}
                        activeCount={gpuStatus.gpu8gbActive}
                        icons={gpu8gbIcons}
                    />
                </Box>

                <Box className="info-text-container">
                    <InfoText
                        label="사용 중인 24GB GPU 개수"
                        value={gpuStatus.gpu24gbActive}
                        total={GPU_CONFIG.gpu24gb.total}
                    />
                    <InfoText
                        label="사용 중인 8GB GPU 개수"
                        value={gpuStatus.gpu8gbActive}
                        total={GPU_CONFIG.gpu8gb.total}
                    />
                    <InfoText
                        label="현재 대기 중인 job"
                        value={gpuStatus.jobsInQueue}
                        unit="개"
                    />
                </Box>
            </Box>
        </Box>
    );

    return (
        <CustomCard
            title="Wait Information"
            content={cardContent}
            width='740px'
            height='290px'
        />
    );
}

export default InfoCard;