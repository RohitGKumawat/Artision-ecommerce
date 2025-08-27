import { createContext, useState } from 'react';
import { login as loginService } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    // Login function
    const login = async (email, password) => {
        try {
            const data = await loginService(email, password);
            setToken(data.token);
            setUser(data.user);
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
