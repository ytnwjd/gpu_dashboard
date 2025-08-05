import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import useFileExplorer from '../../hooks/useFileExplorer';
import FileList from '../FileList/FileList';
import Pagination from '../Pagination';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

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
        currentPath,
        paginatedItems,
        loading,
        error,
        navigateTo,
        // downloadFile,
        currentPage,
        totalPages,
        handlePageChange,
    } = useFileExplorer();

    if (!isOpen) return null;

    const handleItemClick = (item) => {
        const path = item.path;
        const formattedPath = path.startsWith('/') ? path : `/${path}`;

        if (item.is_directory) {
            navigateTo(path);
            setSelectedPath(formattedPath);
        } else {
            setSelectedPath(formattedPath);
        }
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
                            <Breadcrumbs currentPath={currentPath} onNavigate={navigateTo} />
                            <FileList
                                items={paginatedItems}
                                onNavigate={handleItemClick}
                                // onDownload={downloadFile}
                            />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
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