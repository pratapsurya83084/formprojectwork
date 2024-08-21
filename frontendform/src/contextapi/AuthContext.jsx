// authContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            // You can also check the token validity here
            setAuth(true); // Set auth to true if token exists
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setAuth(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setAuth(false);
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
