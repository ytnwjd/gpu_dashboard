import React from 'react';
import {
    StyledFileItemContainer,
    StyledIconSpan,
    StyledNameSpan,
    StyledMetaSpan,
    StyledDownloadButton
} from './FileItem.style'; 

const FileItem = ({ item, onNavigate, onDownload }) => {
    const icon = item.is_directory ? '📁' : '📄';
    const size = item.size ? `${(item.size / 1024).toFixed(2)} KB` : '';
    const lastModified = item.last_modified ?
        new Date(item.last_modified * 1000).toLocaleString() : '';

    const handleClick = () => {
        // console.log('FileItem: Clicked item:', item);
        onNavigate(item);
    };

    const handleDownload = (e) => {
        e.stopPropagation(); 
        if (!item.is_directory) {
            onDownload(item.path, item.name);
        }
    };

    return (
        <StyledFileItemContainer onClick={handleClick}>
            <StyledIconSpan>{icon}</StyledIconSpan>
            <StyledNameSpan>{item.name}</StyledNameSpan>
            {!item.is_directory && <StyledMetaSpan>{size}</StyledMetaSpan>}
            <StyledMetaSpan>{lastModified}</StyledMetaSpan>            
            {!item.is_directory && (
                <StyledDownloadButton onClick={handleDownload}>다운로드</StyledDownloadButton>
            )}
        </StyledFileItemContainer>
    );
};

export default FileItem;