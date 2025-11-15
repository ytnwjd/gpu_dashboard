import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFileExplorer = (user_id = 'yusujeong') => {
    const [currentPath, setCurrentPath] = useState(''); // 현재 경로
    const [pathHistory, setPathHistory] = useState(['']); // 경로 히스토리 (뒤로가기용)
    const [explorerData, setExplorerData] = useState({ '': [] }); // 경로별 파일 목록
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedPath, setSelectedPath] = useState(''); // 선택된 파일 또는 폴더 경로

    const fetchFolderContents = useCallback(async (path) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`/user/${user_id}/file/list`, {
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
    }, [user_id]);

    const navigateTo = useCallback(async (path) => {
        setCurrentPath(path);
        setPathHistory(prev => [...prev, path]);
        setSelectedPath(path);
        
        if (!explorerData[path]) {
            await fetchFolderContents(path);
        }
    }, [explorerData, fetchFolderContents]);

    const goBack = useCallback(async () => {
        if (pathHistory.length > 1) {
            const newHistory = pathHistory.slice(0, -1);
            const previousPath = newHistory[newHistory.length - 1];
            
            setPathHistory(newHistory);
            setCurrentPath(previousPath);
            setSelectedPath(previousPath);
            
            if (!explorerData[previousPath]) {
                await fetchFolderContents(previousPath);
            }
        }
    }, [pathHistory, explorerData, fetchFolderContents]);

    const selectItem = useCallback(async (item) => {
        setSelectedPath(item.path);

        if (item.is_directory) {
            await navigateTo(item.path);
        }
    }, [navigateTo]);

    useEffect(() => {
        fetchFolderContents('');
    }, [fetchFolderContents]);

    return {
        currentPath,
        pathHistory,
        explorerData,
        loading,
        error,
        navigateTo,
        selectItem,
        selectedPath,
        goBack,
        canGoBack: pathHistory.length > 1,
    };
};

export default useFileExplorer;