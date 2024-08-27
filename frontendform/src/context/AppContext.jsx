import React, { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();

// Create a provider component
export const AppProvider = ({ children }) => {
    // State that you want to share globally
const [token,setToken]=useState(localStorage.getItem('token'));


    return (
        <AppContext.Provider value={{token,setToken}}>
            {children}
        </AppContext.Provider>
    );
};
