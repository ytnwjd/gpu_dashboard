import styled from 'styled-components';

export const StyledPaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 5px;
`;

export const StyledButton = styled.button`
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background-color: #f8f8f8;
    cursor: pointer;
    font-size: 1em;
    color: #333;
    transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;

    &:hover {
        background-color: #e0e0e0;
        border-color: #c0c0c0;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        background-color: #f1f1f1;
        color: #999;
    }

    ${props =>
        props.$isActive &&
        `
        background-color: #007bff;
        color: white;
        border-color: #007bff;

        &:hover {
            background-color: #0056b3;
            border-color: #0056b3;
        }
    `}
`;