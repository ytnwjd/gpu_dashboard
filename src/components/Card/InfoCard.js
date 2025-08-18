import React, { useMemo } from 'react';
import CustomCard from './CustomCard';

import {
    StyledGpuIcon,
    StyledInfoContentWrapper,
    StyledLeftContent,
    StyledAvailableGpuText,
    StyledGpuGridContainer,
    StyledTextContainer,
    StyledInfoTypography,
    StyledGpuGroupWrapper,
    StyledGpuLabel,
} from './InfoCard.style';

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
            <StyledGpuIcon
                key={`${capacity}-${index}`}
                active={index < activeCount}
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
        <StyledGpuGroupWrapper>
            <StyledGpuLabel variant="body2">{capacity}</StyledGpuLabel>
            <StyledGpuGridContainer>
                {icons}
            </StyledGpuGridContainer>
        </StyledGpuGroupWrapper>
    );

    const InfoText = ({ label, value, total, unit = '' }) => (
        <StyledInfoTypography variant="body1">
            {label}: {value}{total ? `/${total}` : ''}{unit}
        </StyledInfoTypography>
    );

    const cardContent = (
        <StyledInfoContentWrapper>
            <StyledLeftContent>
                <StyledAvailableGpuText variant="h6" sx={{ paddingLeft: '50px' }}>
                    Available GPU
                </StyledAvailableGpuText>

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
            </StyledLeftContent>

            <StyledTextContainer>
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
            </StyledTextContainer>
        </StyledInfoContentWrapper>
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