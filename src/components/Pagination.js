import React from 'react';
import { StyledPaginationContainer, StyledButton } from './Pagination.styled'; 

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <StyledPaginationContainer>
            <StyledButton
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                이전
            </StyledButton>
            {pageNumbers.map(number => (
                <StyledButton
                    key={number}
                    onClick={() => onPageChange(number)}
                    $isActive={number === currentPage} // `$isActive` prop 전달
                >
                    {number}
                </StyledButton>
            ))}
            <StyledButton
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                다음
            </StyledButton>
        </StyledPaginationContainer>
    );
};

export default Pagination;