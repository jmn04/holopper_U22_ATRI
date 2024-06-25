// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState(null);
    const [userID, setUserID] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUserName(JSON.parse(storedUser)["name"]);
            setUserID(JSON.parse(storedUser)["user_id"]);
            setIsLoggedIn(true);
        }
    }, []);
    
    const login = (userData) => {
        setIsLoggedIn(true);
        setUserName(userData["name"]);
        setUserID(userData["user_id"]);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserName(null);
        setUserID(null);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userName, userID, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
