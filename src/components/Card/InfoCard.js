import React, { useState, useEffect } from 'react';
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
    const gpu24gbTotal = 6;
    const gpu8gbTotal = 12;

    const [gpuStatus, setGpuStatus] = useState({
        gpu24gbActive: gpu24gbTotal,
        gpu8gbActive: gpu8gbTotal,
        gpu24gbAvailable: 0,
        gpu8gbAvailable: 0,
        jobsInQueue: 0
    });

    

    useEffect(() => {
        if (gpuInfo) {
            setGpuStatus(gpuInfo);
        }
    }, [gpuInfo]);

    const gpu24gbIcons = Array.from({ length: gpu24gbTotal }, (_, index) => (
        <StyledGpuIcon
            key={`24gb-${index}`}
            active={index < gpuStatus.gpu24gbActive}
        />
    ));

    const gpu8gbIcons = Array.from({ length: gpu8gbTotal }, (_, index) => (
        <StyledGpuIcon
            key={`8gb-${index}`}
            active={index < gpuStatus.gpu8gbActive}
        />
    ));

    const cardContent = (
        <StyledInfoContentWrapper>
            <StyledLeftContent>
                <StyledAvailableGpuText variant="h6" sx={{ paddingLeft: '50px' }}>
                    Available GPU
                </StyledAvailableGpuText>

                <StyledGpuGroupWrapper>
                    <StyledGpuLabel variant="body2">24GB</StyledGpuLabel>
                    <StyledGpuGridContainer>
                        {gpu24gbIcons}
                    </StyledGpuGridContainer>
                </StyledGpuGroupWrapper>

                <StyledGpuGroupWrapper>
                    <StyledGpuLabel variant="body2">8GB</StyledGpuLabel>
                    <StyledGpuGridContainer>
                        {gpu8gbIcons}
                    </StyledGpuGridContainer>
                </StyledGpuGroupWrapper>
            </StyledLeftContent>

            <StyledTextContainer>
                <StyledInfoTypography variant="body1">
                    사용 중인 24GB GPU 개수: {gpuStatus.gpu24gbActive}/{gpu24gbTotal}
                </StyledInfoTypography>
                <StyledInfoTypography variant="body1">
                    사용 중인 8GB GPU 개수: {gpuStatus.gpu8gbActive}/{gpu8gbTotal}
                </StyledInfoTypography>
                <StyledInfoTypography variant="body1">
                    현재 {gpuStatus.jobsInQueue}개의 job이 대기 중입니다.
                </StyledInfoTypography>
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