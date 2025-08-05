import React from 'react';
import { FaFolder, FaFile, FaChevronRight, FaChevronDown } from 'react-icons/fa';
import { StyledList, StyledFileItem, StyledFolderItem, StyledFileName, StyledFileIcon } from './FileList.styled';

const FileList = ({ items, onToggle, onSelect, expandedFolders }) => {
    return (
        <StyledList>
            {items && items.map(item => (
                <div key={item.path}>
                    {item.is_directory ? (
                        <>
                            <StyledFolderItem onClick={() => onToggle(item.path)}>
                                <StyledFileIcon>
                                    {expandedFolders[item.path] ? <FaChevronDown /> : <FaChevronRight />}
                                    <FaFolder />
                                </StyledFileIcon>
                                <StyledFileName>{item.name}</StyledFileName>
                            </StyledFolderItem>
                            {expandedFolders[item.path] && item.children && (
                                // 하위 폴더의 children이 있을 때만 재귀적으로 렌더링
                                <div style={{ paddingLeft: '20px' }}>
                                    <FileList
                                        items={item.children}
                                        onToggle={onToggle}
                                        onSelect={onSelect}
                                        expandedFolders={expandedFolders}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        <StyledFileItem onClick={() => onSelect(item)}>
                            <StyledFileIcon>
                                <FaFile />
                            </StyledFileIcon>
                            <StyledFileName>{item.name}</StyledFileName>
                        </StyledFileItem>
                    )}
                </div>
            ))}
        </StyledList>
    );
};

export default FileList;