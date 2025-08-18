import { useState, useEffect, useCallback } from 'react';

const useJobData = () => {
    const [gpuInfo, setGpuInfo] = useState(null);
    const [jobList, setJobList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchJobs = useCallback(async () => {
        try {
            const jobsResponse = await fetch('/api/jobs/');
            if (jobsResponse.ok) {
                const jobsData = await jobsResponse.json();
                if (jobsData.code === 200 && jobsData.data) {                
                    setJobList(jobsData.data);
                } else {
                    setJobList([]);
                }
            } else {
                throw new Error(`HTTP error! status: ${jobsResponse.status}`);
            }
        } catch (error) {
            setJobList([]);
            setError('Job 목록을 불러오는데 실패했습니다.');
        }
    }, []);

    const fetchGpuInfo = useCallback(async () => {
        try {
            const gpuResponse = await fetch('/api/gpu/');
            if (gpuResponse.ok) {
                const gpuData = await gpuResponse.json();
                if (gpuData.code === 200 && gpuData.data) {
                    setGpuInfo(gpuData.data);
                } else {
                    console.error("API response error (GPU):", gpuData.message);
                }
            } else {
                throw new Error(`HTTP error! status: ${gpuResponse.status}`);
            }
        } catch (error) {
            console.error("GPU 정보를 불러오는데 실패했습니다.:", error);
            setError('GPU 정보를 불러오는데 실패했습니다.');
        }
    }, []);

    const refreshData = useCallback(async () => {
        await Promise.all([fetchJobs(), fetchGpuInfo()]);
    }, [fetchJobs, fetchGpuInfo]);

    const addNewJob = useCallback((newJob) => {
        setJobList(prevJobList => [newJob, ...prevJobList]);
    }, []);

    // 초기 데이터 로딩
    useEffect(() => {
        const loadInitialData = async () => {
            setLoading(true);
            await refreshData();
            setLoading(false);
        };
        
        loadInitialData();
    }, [refreshData]);

    return {
        gpuInfo,
        jobList,
        loading,
        error,
        refreshData,
        addNewJob
    };
};

export default useJobData; 