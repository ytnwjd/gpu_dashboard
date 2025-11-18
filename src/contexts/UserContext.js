import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
    const [user_id] = useState('yusujeong');

    return (
        <UserContext.Provider value={{ user_id }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser는 UserProvider 내부에서 사용되어야 합니다.');
    }
    return context;
};

