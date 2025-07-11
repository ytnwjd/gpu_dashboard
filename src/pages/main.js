import React from 'react';
import CustomCard from '../components/CustomCard';

const MainPage = () => {
    return (
        <div style={{ padding: 10 }}>
            <CustomCard
                title="React + MUI Card"
                content="이것은 커스텀 카드 컴포넌트입니다. MUI를 기반으로 구성되었습니다."
                label= {"저장"}
                width = '420px'
                height = '520px'
            />
        </div>
    );
};

export default MainPage;
