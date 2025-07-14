import React, {useState} from 'react';
import JobListCard from "../components/JobListCard";
import InfoCard from "../components/InfoCard";
import FormCard from "../components/FormCard";
import { Check as CheckIcon, PlayArrow as PlayArrowIcon } from '@mui/icons-material';
import RoundedButton from "../components/Button/RoundedButton";

import './mainPage.css';

const MainPage = () => {
    const [showDescription, setShowDescription] = useState(false);
    const [descriptionText, setDescriptionText] = useState('');

    const handleRunOrWait = () => {
        console.log("실행 또는 대기하기 버튼 클릭됨");
        setDescriptionText("남은 GPU가 없는 경우 대기열로 들어갑니다.");
        setShowDescription(true);
    };

    const handleCheck = () => {
        console.log("검사하기 버튼 클릭됨");
        setDescriptionText("검사에 성공하였습니다.");
        setShowDescription(true);
    };

    return (
        <div className="main-page-container">

            <div className="left-section">
                <FormCard />
                <div className="btns-container">
                    <RoundedButton
                        label="실행 또는 대기하기"
                        width="180px"
                        height="40px"
                        state="enable"
                        onClick={handleRunOrWait}
                        icon={<PlayArrowIcon sx={{ fontSize: 20, marginRight: 1 }} />}
                    />
                    <RoundedButton
                        label="검사하기"
                        width="100px"
                        height="40px"
                        state="enable"
                        onClick={handleCheck}
                        icon={<CheckIcon sx={{ fontSize: 20, marginRight: 1 }} />}
                    />
                </div>

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
