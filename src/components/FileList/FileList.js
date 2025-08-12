import React from 'react';
import { FaFolder, FaFile, FaChevronRight } from 'react-icons/fa';
import { StyledList, StyledFileItem, StyledFolderItem, StyledFileName, StyledFileIcon, StyledFolderArrow } from './FileList.styled';

const FileList = ({ items, onNavigate, selectedPath, disableFileSelection = false }) => {
    return (
        <StyledList>
            {items && items.map(item => {
                const isSelected = item.path === selectedPath || `/${item.path}` === selectedPath;
                const isFileDisabled = !item.is_directory && disableFileSelection;

                return (
                    <div key={item.path}>
                        {item.is_directory ? (
                            <StyledFolderItem
                                onClick={() => onNavigate(item)}
                                isSelected={isSelected}
                            >
                                <StyledFileIcon>
                                    <FaFolder />
                                </StyledFileIcon>
                                <StyledFileName>{item.name}</StyledFileName>
                                <StyledFolderArrow>
                                    <FaChevronRight />
                                </StyledFolderArrow>
                            </StyledFolderItem>
                        ) : (
                            <StyledFileItem
                                onClick={() => !isFileDisabled && onNavigate(item)}
                                isSelected={isSelected}
                                style={{
                                    opacity: isFileDisabled ? 0.5 : 1,
                                    cursor: isFileDisabled ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <StyledFileIcon>
                                    <FaFile />
                                </StyledFileIcon>
                                <StyledFileName>{item.name}</StyledFileName>
                            </StyledFileItem>
                        )}
                    </div>
                );
            })}
        </StyledList>
    );
};

export default FileList;