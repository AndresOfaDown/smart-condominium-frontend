import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services';

const AuthContext = createContext(null);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is logged in on mount
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const token = authService.getToken();
            if (token) {
                // Try to get current user from backend
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } else {
                // Check localStorage for stored user
                const storedUser = authService.getStoredUser();
                if (storedUser) {
                    setUser(storedUser);
                }
            }
        } catch (error) {
            console.error('Error checking auth:', error);
            // If token is invalid, clear everything
            authService.logout();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (credentials) => {
        try {
            // Use real backend login
            const data = await authService.login(credentials.email || credentials.username, credentials.password);

            setUser(data.usuario);

            return { success: true, user: data.usuario };
        } catch (error) {
            console.error('Login error:', error);
            const errorMessage = error.response?.data?.error || error.message || 'Error al iniciar sesión';
            return { success: false, error: errorMessage };
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
        }
    };

    const value = {
        user,
        login,
        logout,
        loading,
        isAuthenticated: !!user,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
