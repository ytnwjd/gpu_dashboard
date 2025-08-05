import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useFileExplorer from '../../hooks/useFileExplorer';
import FileList from '../FileList/FileList';

import {
    StyledOverlay,
    StyledModal,
    StyledModalHeader,
    StyledModalBody,
    StyledCloseButton,
    StyledMessage,
    StyledErrorMessage,
    StyledModalActions,
    StyledConfirmButton,
} from './FileBrowserModal.styled';

const FileBrowserModal = ({ isOpen, onClose, title = "파일 탐색기", onSelectPath }) => {
    const [selectedPath, setSelectedPath] = useState(null);

    const {
        fileList,
        loading,
        error,
        toggleFolder,
        expandedFolders,
    } = useFileExplorer();

    if (!isOpen) return null;

    const handleItemSelect = (item) => {
        const formattedPath = item.path.startsWith('/') ? item.path : `/${item.path}`;
        setSelectedPath(formattedPath);
    };

    const handleConfirm = () => {
        if (selectedPath && onSelectPath) {
            onSelectPath(selectedPath);
        }
        onClose();
    };

    return ReactDOM.createPortal(
        <StyledOverlay onClick={onClose}>
            <StyledModal onClick={e => e.stopPropagation()}>
                <StyledModalHeader>
                    <h2 style={{ margin: 0 }}>{title}</h2>
                    <StyledCloseButton onClick={onClose}>&times;</StyledCloseButton>
                </StyledModalHeader>
                <StyledModalBody>
                    {loading && <StyledMessage>파일 목록을 불러오는 중입니다...</StyledMessage>}
                    {error && <StyledErrorMessage>오류 발생: {error}</StyledErrorMessage>}

                    {!loading && !error && (
                        <>
                            <FileList
                                items={fileList}
                                onToggle={toggleFolder}
                                onSelect={handleItemSelect}
                                expandedFolders={expandedFolders}
                            />
                        </>
                    )}
                </StyledModalBody>

                <StyledModalActions>
                    <p>선택된 경로: {selectedPath}</p>
                    <StyledConfirmButton onClick={handleConfirm} disabled={!selectedPath}>완료</StyledConfirmButton>
                </StyledModalActions>
            </StyledModal>
        </StyledOverlay>,
        document.getElementById('modal-root')
    );
};

export default FileBrowserModal;