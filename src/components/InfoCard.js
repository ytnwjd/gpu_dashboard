import React from 'react';
import CustomCard from './Card/CustomCard';

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

const InfoCard = () => {
    // GPU 구성
    const gpu24gbTotal = 6;
    const gpu8gbTotal = 12;

    const activeGpu24gb = 5;
    const activeGpu8gb = 1;

    const jobsInQueue = 0;
    const availableSlot = jobsInQueue + 1;

    const gpu24gbIcons = Array.from({ length: gpu24gbTotal }, (_, index) => (
        <StyledGpuIcon key={`24gb-${index}`} active={index < activeGpu24gb} />
    ));

    const gpu8gbIcons = Array.from({ length: gpu8gbTotal }, (_, index) => (
        <StyledGpuIcon key={`8gb-${index}`} active={index < activeGpu8gb} />
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
                    사용 중인 24GB GPU 개수: {activeGpu24gb}/{gpu24gbTotal}
                </StyledInfoTypography>
                <StyledInfoTypography variant="body1">
                    사용 중인 8GB GPU 개수: {activeGpu8gb}/{gpu8gbTotal}
                </StyledInfoTypography>
                <StyledInfoTypography variant="body1">
                    현재 {jobsInQueue}개의 job이 대기 중입니다.
                </StyledInfoTypography>
            </StyledTextContainer>
        </StyledInfoContentWrapper>
    );

    return (
        <CustomCard
            title="Wait Information"
            content={cardContent}
            width='740px'
            height='320px'
        />
    );
}

export default InfoCard;