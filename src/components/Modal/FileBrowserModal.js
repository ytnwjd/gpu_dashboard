import React from 'react';
import ReactDOM from 'react-dom';
import { FaArrowLeft } from 'react-icons/fa';
import useFileExplorer from '../../hooks/useFileExplorer';
import FileList from '../FileList/FileList';
import './Modal.css';

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
        <div className="file-browser-overlay" onClick={onClose}>
            <div className="file-browser-modal" onClick={e => e.stopPropagation()}>
                <div className="file-browser-modal-header">
                    <h2>{title}</h2>
                    <button className="file-browser-close-button" onClick={onClose}>&times;</button>
                </div>
                
                <div className="file-browser-path-display">
                    <button className="file-browser-back-button" onClick={goBack} disabled={!canGoBack}>
                        <FaArrowLeft />
                    </button>
                    <span>현재 경로: {formatPath(currentPath)}</span>
                </div>

                <div className="file-browser-modal-body">
                    {loading && <p className="file-browser-message">파일 목록을 불러오는 중입니다...</p>}
                    {error && <p className="file-browser-error-message">오류 발생: {error}</p>}

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
                </div>
                
                <div className="file-browser-modal-actions">
                    <p>선택된 경로: {selectedPath ? formatPath(selectedPath) : '선택되지 않음'}</p>
                    <button className="file-browser-confirm-button" onClick={handleConfirm} disabled={!selectedPath}>완료</button>
                </div>
            </div>
        </div>,
        document.getElementById('modal-root')
    );
};

export default FileBrowserModal;