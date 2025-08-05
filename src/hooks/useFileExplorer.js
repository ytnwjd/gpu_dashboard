import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useFileExplorer = () => {
    const [fileList, setFileList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedFolders, setExpandedFolders] = useState({});

    // 특정 폴더의 콘텐츠를 가져오는 함수 
    const fetchFolderContents = useCallback(async (path) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`api/files/list-contents`, {
                params: { path: path }
            });
            return response.data.items;
        } catch (err) {
            console.error('Failed to fetch file list:', err);
            setError('파일 목록을 불러오는데 실패했습니다.');
            return null;
        } finally {
            setLoading(false);
        }
    }, []);

    // 초기 파일 목록 로드
    useEffect(() => {
        const loadInitialFiles = async () => {
            const items = await fetchFolderContents('');
            if (items) {
                setFileList(items);
            }
        };
        loadInitialFiles();
    }, [fetchFolderContents]);

    const toggleFolder = useCallback(async (path) => {
        const isExpanded = !!expandedFolders[path];
        setExpandedFolders(prev => ({
            ...prev,
            [path]: !isExpanded
        }));

        if (!isExpanded) {
            // 폴더를 여는 경우에만 하위 콘텐츠를 로드
            const children = await fetchFolderContents(path);
            if (children) {
                setFileList(prev => {
                    const findAndInsertChildren = (items) => {
                        return items.map(item => {
                            if (item.path === path) {
                                return { ...item, children: children };
                            } else if (item.is_directory && item.children) {
                                // 재귀적으로 하위 폴더 탐색
                                return { ...item, children: findAndInsertChildren(item.children) };
                            }
                            return item;
                        });
                    };
                    return findAndInsertChildren(prev);
                });
            }
        }
    }, [expandedFolders, fetchFolderContents]);

    return {
        fileList,
        loading,
        error,
        toggleFolder,
        expandedFolders,
    };
};

export default useFileExplorer;