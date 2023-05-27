"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

// Create a context
const AuthContext = createContext({
    isLoggedIn: false,
    setIsLoggedIn: () => {},
});

// Create a provider component
export function AuthProvider({
  children
}: {
    children: React.ReactNode
}) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the token exists in the cookie
        const token = Cookies.get('access_token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
}

// Create a hook to use the auth context
export function useAuth() {
    return useContext(AuthContext);
}