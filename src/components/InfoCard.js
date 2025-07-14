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
    StyledInfoTypographyWithMargin
} from './InfoCard.style';

const InfoCard = () => {
    const totalGpuSlots = 18;
    const activeGpuCount = 7;
    const jobsInQueue = 0;
    const availableSlot = jobsInQueue + 1;

    const gpuIcons = Array.from({ length: totalGpuSlots }, (_, index) => (
        <StyledGpuIcon key={index} active={index < activeGpuCount} />
    ));

    const cardContent = (
        <StyledInfoContentWrapper>
            <StyledLeftContent>
                <StyledAvailableGpuText variant="h6">
                    Available GPU
                </StyledAvailableGpuText>
                <StyledGpuGridContainer>
                    {gpuIcons}
                </StyledGpuGridContainer>
            </StyledLeftContent>

            <StyledTextContainer>
                <StyledInfoTypography variant="body1">
                    내 앞에 {jobsInQueue}개의 job이 대기중입니다.
                </StyledInfoTypography>
                <StyledInfoTypographyWithMargin variant="body1">
                    {availableSlot}번째로 GPU 사용이 가능합니다.
                </StyledInfoTypographyWithMargin>
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