import React from 'react';
import { StyledBreadcrumbsContainer, StyledBreadcrumbItem, StyledSeparator } from './Breadcrumbs.styled';

const Breadcrumbs = ({ currentPath, onNavigate }) => {
    // currentPath가 '/'로 시작하는 경우를 위해 filter 전에 split을 조정합니다.
    // 또는 currentPath.replace(/^\//, '') 로 시작 슬래시를 제거한 후 split 합니다.
    const cleanPath = currentPath.replace(/^\//, ''); // 맨 앞 슬래시 제거
    const pathSegments = cleanPath.split('/').filter(segment => segment !== '');

    const handleSegmentClick = (index) => {
        let clickedPathSegments = [];
        for (let i = 0; i <= index; i++) {
            clickedPathSegments.push(pathSegments[i]);
        }

        onNavigate(clickedPathSegments.join('/')); 
    };

    return (
        <StyledBreadcrumbsContainer>
            <StyledBreadcrumbItem onClick={() => onNavigate('')}>Root</StyledBreadcrumbItem>
            {pathSegments.map((segment, index) => (
                <React.Fragment key={index}>
                    <StyledSeparator>/</StyledSeparator>
                    <StyledBreadcrumbItem
                        onClick={() => handleSegmentClick(index)}
                    >
                        {segment}
                    </StyledBreadcrumbItem>
                </React.Fragment>
            ))}
        </StyledBreadcrumbsContainer>
    );
};

export default Breadcrumbs;