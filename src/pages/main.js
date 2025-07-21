import React, {useState} from 'react';
import JobListCard from "../components/Card/JobListCard";
import InfoCard from "../components/Card/InfoCard";
import FormCard from "../components/Card/FormCard";
import './mainPage.css';

const MainPage = () => {
    const [showDescription, setShowDescription] = useState(false);
    const [descriptionText, setDescriptionText] = useState('');

    const handleJobSubmitSuccess = (message) => {
        setDescriptionText(message);
        setShowDescription(true);
    };

    return (
        <div className="main-page-container">

            <div className="left-section">
                <FormCard onJobSubmitSuccess={handleJobSubmitSuccess} />
    
                {showDescription && (
                    <p className="description-text">
                        {descriptionText}
                    </p>
                )}
            </div>

            <div className="right-section">
                <InfoCard />
                <JobListCard />
            </div>

        </div>
    );
};

export default MainPage;