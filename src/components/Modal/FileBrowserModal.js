import React from 'react';
import ReactDOM from 'react-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useFileExplorer from '../../hooks/useFileExplorer';
import FileList from '../FileList/FileList';
import {
    StyledOverlay, StyledModal, StyledModalHeader, StyledModalBody, StyledCloseButton,
    StyledMessage, StyledErrorMessage, StyledModalActions, StyledConfirmButton,
    StyledPathDisplay, StyledBackButton
} from './FileBrowserModal.styled';

const FileBrowserModal = ({ isOpen, onClose, title = "파일 탐색기", onSelectPath, currentPathField }) => {
    const {
        currentPath,
        explorerData,
        loading,
        error,
        selectItem,
        selectedPath,
        goBack,
        canGoBack,
    } = useFileExplorer();

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (selectedPath && onSelectPath) {
            onSelectPath(selectedPath);
        }
        onClose();
    };

    const formatPath = (path) => {
        if (!path) return '루트';
        return path.split('/').filter(Boolean).join(' / ');
    };

    // project 또는 venv 필드일 때 파일 선택 비활성화 (폴더만 선택 가능)
    const disableFileSelection = currentPathField === 'project' || currentPathField === 'venv';

    return ReactDOM.createPortal(
        <StyledOverlay onClick={onClose}>
            <StyledModal onClick={e => e.stopPropagation()}>
                <StyledModalHeader>
                    <h2>{title}</h2>
                    <StyledCloseButton onClick={onClose}>&times;</StyledCloseButton>
                </StyledModalHeader>
                
                <StyledPathDisplay>
                    <StyledBackButton onClick={goBack} disabled={!canGoBack}>
                        <FaArrowLeft />
                    </StyledBackButton>
                    <span>현재 경로: {formatPath(currentPath)}</span>
                </StyledPathDisplay>

                <StyledModalBody>
                    {loading && <StyledMessage>파일 목록을 불러오는 중입니다...</StyledMessage>}
                    {error && <StyledErrorMessage>오류 발생: {error}</StyledErrorMessage>}

                    {!loading && !error && (
                        <div style={{ width: '100%', overflowY: 'auto' }}>
                            <FileList
                                items={explorerData[currentPath] || []}
                                onNavigate={selectItem}
                                selectedPath={selectedPath}
                                disableFileSelection={disableFileSelection}
                            />
                        </div>
                    )}
                </StyledModalBody>
                
                <StyledModalActions>
                    <p>선택된 경로: {selectedPath ? formatPath(selectedPath) : '선택되지 않음'}</p>
                    <StyledConfirmButton onClick={handleConfirm} disabled={!selectedPath}>완료</StyledConfirmButton>
                </StyledModalActions>
            </StyledModal>
        </StyledOverlay>,
        document.getElementById('modal-root')
    );
};

export default FileBrowserModal;