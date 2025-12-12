import api from '../../../shared/services/api';

/**
 * Servicio para gestión de usuarios
 */
const userService = {
    /**
     * Obtener todos los usuarios
     * @returns {Promise} Lista de usuarios
     */
    getAllUsers: async () => {
        const response = await api.get('/users/usuarios/', {
            params: { page_size: 1000 } // Obtener hasta 1000 usuarios
        });
        return response.data;
    },

    /**
     * Obtener usuario por ID
     * @param {number} id - ID del usuario
     * @returns {Promise} Datos del usuario
     */
    getUserById: async (id) => {
        const response = await api.get(`/users/usuarios/${id}/`);
        return response.data;
    },

    /**
     * Crear nuevo usuario
     * @param {Object} userData - Datos del usuario
     * @returns {Promise} Usuario creado
     */
    createUser: async (userData) => {
        const response = await api.post('/users/usuarios/', userData);
        return response.data;
    },

    /**
     * Actualizar usuario
     * @param {number} id - ID del usuario
     * @param {Object} userData - Datos a actualizar
     * @returns {Promise} Usuario actualizado
     */
    updateUser: async (id, userData) => {
        const response = await api.put(`/users/usuarios/${id}/`, userData);
        return response.data;
    },

    /**
     * Actualizar parcialmente usuario
     * @param {number} id - ID del usuario
     * @param {Object} userData - Datos a actualizar
     * @returns {Promise} Usuario actualizado
     */
    patchUser: async (id, userData) => {
        const response = await api.patch(`/users/usuarios/${id}/`, userData);
        return response.data;
    },

    /**
     * Eliminar usuario
     * @param {number} id - ID del usuario
     * @returns {Promise} Respuesta del servidor
     */
    deleteUser: async (id) => {
        const response = await api.delete(`/users/usuarios/${id}/`);
        return response.data;
    },

    /**
     * Filtrar usuarios por rol
     * @param {string} rol - Rol a filtrar (ADMIN, RESIDENTE, SEGURIDAD, MANTENIMIENTO)
     * @returns {Promise} Lista de usuarios filtrados
     */
    getUsersByRole: async (rol) => {
        const response = await api.get('/users/usuarios/por_rol/', {
            params: { rol }
        });
        return response.data;
    },

    /**
     * Obtener todos los roles disponibles
     * @returns {Promise} Lista de roles
     */
    getRoles: async () => {
        const response = await api.get('/users/usuarios/roles/');
        return response.data;
    },

    /**
     * Cambiar rol de un usuario
     * @param {number} id - ID del usuario
     * @param {string} rol - Nuevo rol
     * @returns {Promise} Respuesta del servidor
     */
    changeUserRole: async (id, rol) => {
        const response = await api.post(`/users/usuarios/${id}/cambiar_rol/`, { rol });
        return response.data;
    },

    /**
     * Subir foto de usuario
     * @param {number} id - ID del usuario
     * @param {File} foto - Archivo de imagen
     * @returns {Promise} Respuesta del servidor
     */
    uploadUserPhoto: async (id, foto) => {
        const formData = new FormData();
        formData.append('foto', foto);

        const response = await api.post(`/users/usuarios/${id}/subir_foto/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    },

    /**
     * Buscar usuarios
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Promise} Lista de usuarios encontrados
     */
    searchUsers: async (searchTerm) => {
        const response = await api.get('/users/usuarios/', {
            params: { search: searchTerm }
        });
        return response.data;
    }
};

export default userService;
