import React from 'react';
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
    StyledErrorMessage
} from './FileBrowserModal.styled';


const FileBrowserModal = ({ isOpen, onClose, title = "파일 탐색기" }) => {
    const {
        currentPath,
        paginatedItems,
        loading,
        error,
        navigateTo,
        downloadFile,
        currentPage,
        totalPages,
        handlePageChange,
    } = useFileExplorer();

    if (!isOpen) return null;

    const handleItemClick = (item) => {
        console.log('FileBrowserModal: handleItemClick이 받은 아이템:', item);
        if (item.is_directory) {
            // console.log('FileBrowserModal: 디렉토리입니다. navigateTo를 path로 호출합니다:', item.path);
            navigateTo(item.path);
        } else {
            // console.log('FileBrowserModal: 파일입니다.');
            // 파일 선택 로직 
        }
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
                                onDownload={downloadFile}
                            />
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </>
                    )}
                </StyledModalBody>
            </StyledModal>
        </StyledOverlay>,
        document.getElementById('modal-root')
    );
};

export default FileBrowserModal;