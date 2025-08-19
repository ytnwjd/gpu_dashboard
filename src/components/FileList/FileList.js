import React from 'react';
import { FaFolder, FaFile, FaChevronRight } from 'react-icons/fa';
import './FileList.css';

const FileList = ({ items, onNavigate, selectedPath, disableFileSelection = false }) => {
    return (
        <ul className="file-list">
            {items && items.map(item => {
                const isSelected = item.path === selectedPath || `/${item.path}` === selectedPath;
                const isFileDisabled = !item.is_directory && disableFileSelection;

                return (
                    <div key={item.path}>
                        {item.is_directory ? (
                            <div
                                className={`folder-item ${isSelected ? 'selected' : ''}`}
                                onClick={() => onNavigate(item)}
                            >
                                <span className="file-icon">
                                    <FaFolder />
                                </span>
                                <span className="file-name">{item.name}</span>
                                <span className="folder-arrow">
                                    <FaChevronRight />
                                </span>
                            </div>
                        ) : (
                            <li
                                className={`file-item ${isSelected ? 'selected' : ''} ${isFileDisabled ? 'disabled' : ''}`}
                                onClick={() => !isFileDisabled && onNavigate(item)}
                            >
                                <span className="file-icon">
                                    <FaFile />
                                </span>
                                <span className="file-name">{item.name}</span>
                            </li>
                        )}
                    </div>
                );
            })}
        </ul>
    );
};

export default FileList;