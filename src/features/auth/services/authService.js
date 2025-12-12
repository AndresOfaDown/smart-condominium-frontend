import api from '../../../shared/services/api';

/**
 * Servicio de autenticación para el sistema Smart Condominium
 */
const authService = {
    /**
     * Iniciar sesión
     * @param {string} email - Email del usuario
     * @param {string} password - Contraseña
     * @returns {Promise} Respuesta con tokens y datos del usuario
     */
    login: async (email, password) => {
        const response = await api.post('/users/login/', { email, password });

        // Guardar token y usuario en localStorage
        if (response.data.access) {
            localStorage.setItem('token', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            localStorage.setItem('user', JSON.stringify(response.data.usuario));
        }

        return response.data;
    },

    /**
     * Cerrar sesión
     * @returns {Promise} Respuesta del servidor
     */
    logout: async () => {
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            await api.post('/users/logout/', { refresh: refreshToken });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        } finally {
            // Limpiar localStorage siempre
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');
        }
    },

    /**
     * Refrescar token de acceso
     * @returns {Promise} Nuevo token de acceso
     */
    refreshToken: async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await api.post('/users/token/refresh/', { refresh: refreshToken });

        if (response.data.access) {
            localStorage.setItem('token', response.data.access);
        }

        return response.data;
    },

    /**
     * Obtener usuario actual
     * @returns {Promise} Datos del usuario actual
     */
    getCurrentUser: async () => {
        const response = await api.get('/users/usuarios/me/');
        return response.data;
    },

    /**
     * Obtener permisos del usuario actual
     * @returns {Promise} Permisos del usuario
     */
    getMyPermissions: async () => {
        const response = await api.get('/users/usuarios/mis_permisos/');
        return response.data;
    },

    /**
     * Verificar si el usuario está autenticado
     * @returns {boolean} True si está autenticado
     */
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    /**
     * Obtener usuario desde localStorage
     * @returns {Object|null} Datos del usuario o null
     */
    getStoredUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    /**
     * Obtener token desde localStorage
     * @returns {string|null} Token o null
     */
    getToken: () => {
        return localStorage.getItem('token');
    }
};

export default authService;
