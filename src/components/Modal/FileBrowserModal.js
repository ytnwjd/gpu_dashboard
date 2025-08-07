import React from 'react';
import ReactDOM from 'react-dom';
import useFileExplorer from '../../hooks/useFileExplorer';
import FileList from '../FileList/FileList';
import {
    StyledOverlay, StyledModal, StyledModalHeader, StyledModalBody, StyledCloseButton,
    StyledMessage, StyledErrorMessage, StyledModalActions, StyledConfirmButton
} from './FileBrowserModal.styled';

const FileBrowserModal = ({ isOpen, onClose, title = "파일 탐색기", onSelectPath }) => {
    const {
        pathStack,
        explorerData,
        loading,
        error,
        selectItem,
        selectedPath,
    } = useFileExplorer();

    if (!isOpen) return null;

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
                    <h2>{title}</h2>
                    <StyledCloseButton onClick={onClose}>&times;</StyledCloseButton>
                </StyledModalHeader>
                <StyledModalBody>
                    {loading && <StyledMessage>파일 목록을 불러오는 중입니다...</StyledMessage>}
                    {error && <StyledErrorMessage>오류 발생: {error}</StyledErrorMessage>}

                    {!loading && !error && pathStack.map((path, index) => (
                        <div key={path} style={{ flex: '1 1 250px', borderRight: '1px solid #e0e0e0', overflowY: 'auto' }}>
                            <FileList
                                items={explorerData[path] || []}
                                onNavigate={(item) => selectItem(item, index)}
                                selectedPath={selectedPath}
                            />
                        </div>
                    ))}
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