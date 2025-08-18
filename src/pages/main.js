import React, { useState, useEffect } from 'react';
import JobListCard from "../components/Card/JobListCard";
import InfoCard from "../components/Card/InfoCard";
import FormCard from "../components/Card/FormCard";
import './mainPage.css';

const MainPage = () => {
    const [gpuInfo, setGpuInfo] = useState(null);
    const [jobList, setJobList] = useState([]);
    const [showDescription, setShowDescription] = useState(false);
    const [descriptionText, setDescriptionText] = useState('');

    const fetchJobs = async () => {
        try {
            // console.log('fetchJobs 호출됨');
            const jobsResponse = await fetch('/api/jobs/');
            if (jobsResponse.ok) {
                const jobsData = await jobsResponse.json();
                // console.log('받은 jobs 데이터:', jobsData);
                if (jobsData.code === 200 && jobsData.data) {                
                    setJobList(jobsData.data);
                    // console.log('jobList 업데이트됨:', jobsData.data);
                } else {
                    setJobList([]);
                }
            } else {
                throw new Error(`HTTP error! status: ${jobsResponse.status}`);
            }
        } catch (error) {
            // console.error('fetchJobs 오류:', error);
            setJobList([]);
        }
    };

    const fetchGpuInfo = async () => {
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
        }
    };

    useEffect(() => {
        fetchJobs();
        fetchGpuInfo();
    }, []);

    const handleJobSubmitSuccess = ({message, data}) => {
        //console.log('handleJobSubmitSuccess 호출됨:', {message, data});
        setShowDescription(true);
        if (data && typeof data === 'object' && (data.id !== undefined || data._id !== undefined)) {
            setJobList(prevJobList => [data, ...prevJobList]);
            // console.log('Job 생성 성공');
            fetchJobs();
            fetchGpuInfo();
        } 
        setDescriptionText(message);
    };

    return (
        <div className="main-page-container">
            <div className="left-section">
                <FormCard onJobSubmitSuccess={handleJobSubmitSuccess} gpuInfo={gpuInfo}/>
                {showDescription && (
                    <p className="description-text">{descriptionText}</p>
                )}
            </div>

            <div className="right-section">
                <InfoCard gpuInfo={gpuInfo} />
                <JobListCard jobList={jobList} />
            </div>
        </div>
    );
};

export default MainPage;