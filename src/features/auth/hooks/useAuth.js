import { useState, useEffect } from 'react';
import { authService } from '../services';

/**
 * Hook personalizado para gestionar autenticación
 * @returns {Object} Estado y funciones de autenticación
 */
export const useAuth = () => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Verificar autenticación al montar el componente
    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            setIsLoading(true);
            const token = authService.getToken();

            if (token) {
                // Intentar obtener usuario actual
                const userData = await authService.getCurrentUser();
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                // No hay token, obtener de localStorage
                const storedUser = authService.getStoredUser();
                if (storedUser) {
                    setUser(storedUser);
                    setIsAuthenticated(true);
                }
            }
        } catch (err) {
            console.error('Error verificando autenticación:', err);
            setIsAuthenticated(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email, password) => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await authService.login(email, password);
            setUser(data.usuario);
            setIsAuthenticated(true);
            return data;
        } catch (err) {
            const errorMessage = err.response?.data?.error || 'Error al iniciar sesión';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            setIsLoading(true);
            await authService.logout();
            setUser(null);
            setIsAuthenticated(false);
        } catch (err) {
            console.error('Error al cerrar sesión:', err);
        } finally {
            setIsLoading(false);
        }
    };

    const refreshUser = async () => {
        try {
            const userData = await authService.getCurrentUser();
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (err) {
            console.error('Error actualizando usuario:', err);
        }
    };

    return {
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        logout,
        refreshUser,
        checkAuth
    };
};
