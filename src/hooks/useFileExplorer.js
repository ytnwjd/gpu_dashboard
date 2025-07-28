import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ITEMS_PER_PAGE = 10;

const useFileExplorer = () => {
    const [currentPath, setCurrentPath] = useState('');
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchFileList = useCallback(async (path) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`api/files/list-contents/`, {
                params: { path: path }
            });
            const allItems = response.data.items;
            setFileList(allItems);
            setCurrentPath(response.data.current_path);

            // 페이지네이션 로직
            setTotalPages(Math.ceil(allItems.length / ITEMS_PER_PAGE));
            setCurrentPage(1); // 경로 변경 시 항상 첫 페이지로

        } catch (err) {
            console.error('Failed to fetch file list:', err);
            setError('파일 목록을 불러오는데 실패했습니다.');
            setFileList([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const navigateTo = useCallback((path) => {
        fetchFileList(path);
    }, [fetchFileList]);

    const downloadFile = useCallback(async (filePath, fileName) => {
        try {
            const response = await axios.get(`api/files/download-file`, {
                params: { path: filePath },
                responseType: 'blob', // 파일 다운로드를 위해 blob 타입으로 받음
            });

            // Blob을 사용하여 다운로드 링크 생성
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName); // 다운로드될 파일 이름 설정
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url); // 메모리 해제
        } catch (err) {
            console.error('Failed to download file:', err);
            setError('파일 다운로드에 실패했습니다.');
        }
    }, []);

    const handlePageChange = useCallback((page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    }, [totalPages]);

    // 컴포넌트 마운트 시 초기 파일 목록 로드
    useEffect(() => {
        fetchFileList(''); // 초기 경로 (루트) 로드
    }, [fetchFileList]);

    // 현재 페이지에 해당하는 항목만 반환
    const paginatedItems = fileList.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    return {
        currentPath,
        paginatedItems,
        loading,
        error,
        navigateTo,
        downloadFile,
        currentPage,
        totalPages,
        handlePageChange,
    };
};

export default useFileExplorer;