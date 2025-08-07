import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFileExplorer = () => {
    const [pathStack, setPathStack] = useState(['']); // 경로 스택
    const [explorerData, setExplorerData] = useState({ '': [] }); // 경로별 파일 목록
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPath, setSelectedPath] = useState(''); // 선택된 파일 또는 폴더 경로

    const fetchFolderContents = useCallback(async (path) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`api/files/list-contents`, {
                params: { path: path }
            });
            const items = response.data.items;
            setExplorerData(prev => ({
                ...prev,
                [path]: items
            }));
        } catch (err) {
            console.error('Failed to fetch file list:', err);
            setError('파일 목록을 불러오는데 실패했습니다.');
        } finally {
            setLoading(false);
        }
    }, []);

    const navigateTo = useCallback(async (path, index) => {
        setPathStack(pathStack.slice(0, index + 1));
        setSelectedPath(path);
        
        if (!explorerData[path]) {
            await fetchFolderContents(path);
        }
    }, [pathStack, explorerData, fetchFolderContents]);

    const selectItem = useCallback(async (item, index) => {
        setSelectedPath(item.path);

        if (item.is_directory) {
            // 새 폴더를 클릭하면, 기존 스택에서 해당 레벨 이후의 경로를 제거
            const newStack = pathStack.slice(0, index + 1);
            setPathStack([...newStack, item.path]);
            
            if (!explorerData[item.path]) {
                await fetchFolderContents(item.path);
            }
        }
    }, [pathStack, explorerData, fetchFolderContents]);

    useEffect(() => {
        fetchFolderContents('');
    }, [fetchFolderContents]);

    return {
        pathStack,
        explorerData,
        loading,
        error,
        navigateTo,
        selectItem,
        selectedPath,
    };
};

export default useFileExplorer;