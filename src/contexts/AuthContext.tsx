import { useEffect, useState, ReactNode } from 'react';
import { createContext } from 'use-context-selector';
import { api } from '../lib/axios';

interface AuthContextType {
    isAuthenticated: boolean;
    configLogin: (token: string) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: AuthProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await api.get('/validate-token');
                if (response.status === 200) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
            } catch (error) {
                setIsAuthenticated(false)
            }
        }

        checkAuthStatus();
    }, [])



    function configLogin() {
        setIsAuthenticated(true)
    }

    function logout() {
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, configLogin, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

