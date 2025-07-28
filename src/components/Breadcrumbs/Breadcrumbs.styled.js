import { styled } from '@mui/material/styles'; 

export const StyledBreadcrumbsContainer = styled('div')`
    padding: 10px 0;
    font-size: 1.1em;
    color: #555;
    display: flex;
    align-items: center;
    flex-wrap: wrap; /* 경로가 길어지면 줄 바꿈되도록 */
`;

export const StyledBreadcrumbItem = styled('span')`
    cursor: pointer;
    font-weight: bold;
    color: #007bff;
    text-decoration: none;
    white-space: nowrap; /* 세그먼트가 너무 길어도 줄 바꿈되지 않도록 */

    &:hover {
        text-decoration: underline;
    }
`;

export const StyledSeparator = styled('span')`
    margin: 0 5px;
    color: #888; /* 구분선 색상 약간 어둡게 */
`;