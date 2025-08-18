import React, { useState } from 'react';
import JobListCard from "../components/Card/JobListCard";
import InfoCard from "../components/Card/InfoCard";
import FormCard from "../components/Card/FormCard";
import useJobData from "../hooks/useJobData";
import './mainPage.css';

const MainPage = () => {
    const { gpuInfo, jobList, refreshData, addNewJob } = useJobData();
    const [showDescription, setShowDescription] = useState(false);
    const [descriptionText, setDescriptionText] = useState('');

    const handleJobSubmitSuccess = ({message, data}) => {
        setShowDescription(true);
        if (data && typeof data === 'object' && (data.id !== undefined || data._id !== undefined)) {
            addNewJob(data);
            refreshData();
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