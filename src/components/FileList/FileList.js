import React from 'react';
import FileTreeItem from '../FileTreeItem/FileTreeItem';

import {
    StyledFileListContainer,
    StyledEmptyMessage
} from './FileList.styled'; 

const FileList = ({ items, onNavigate, onDownload }) => {
    return (
        <StyledFileListContainer>
            {items.length === 0 ? (
                <StyledEmptyMessage>현재 디렉토리가 비어있습니다.</StyledEmptyMessage>
            ) : (
                items.map((item) => (
                    <FileTreeItem 
                        key={item.path}
                        item={item}
                        onNavigate={onNavigate}
                        onDownload={onDownload}
                    />
                ))
            )}
        </StyledFileListContainer>
    );
};

export default FileList;