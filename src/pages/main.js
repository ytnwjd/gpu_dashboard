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
        setShowDescription(true);
        if (data && typeof data === 'object' && data.id !== undefined) {
            setJobList(prevJobList => [data, ...prevJobList]);
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