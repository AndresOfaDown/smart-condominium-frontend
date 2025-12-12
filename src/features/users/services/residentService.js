import api from '../../../shared/services/api';

/**
 * Servicio para gestión de residentes
 */
const residentService = {
    /**
     * Obtener todos los residentes
     * @returns {Promise} Lista de residentes
     */
    getAllResidents: async () => {
        const response = await api.get('/users/residentes/');
        return response.data;
    },

    /**
     * Obtener residente por ID
     * @param {number} id - ID del residente
     * @returns {Promise} Datos del residente
     */
    getResidentById: async (id) => {
        const response = await api.get(`/users/residentes/${id}/`);
        return response.data;
    },

    /**
     * Crear nuevo residente
     * @param {Object} residentData - Datos del residente
     * @returns {Promise} Residente creado
     */
    createResident: async (residentData) => {
        const response = await api.post('/users/residentes/', residentData);
        return response.data;
    },

    /**
     * Actualizar residente
     * @param {number} id - ID del residente
     * @param {Object} residentData - Datos a actualizar
     * @returns {Promise} Residente actualizado
     */
    updateResident: async (id, residentData) => {
        const response = await api.put(`/users/residentes/${id}/`, residentData);
        return response.data;
    },

    /**
     * Actualizar parcialmente residente
     * @param {number} id - ID del residente
     * @param {Object} residentData - Datos a actualizar
     * @returns {Promise} Residente actualizado
     */
    patchResident: async (id, residentData) => {
        const response = await api.patch(`/users/residentes/${id}/`, residentData);
        return response.data;
    },

    /**
     * Eliminar residente
     * @param {number} id - ID del residente
     * @returns {Promise} Respuesta del servidor
     */
    deleteResident: async (id) => {
        const response = await api.delete(`/users/residentes/${id}/`);
        return response.data;
    },

    /**
     * Obtener solo residentes activos
     * @returns {Promise} Lista de residentes activos
     */
    getActiveResidents: async () => {
        const response = await api.get('/users/residentes/activos/');
        return response.data;
    },

    /**
     * Filtrar residentes por tipo
     * @param {string} tipo - Tipo (PROPIETARIO_RESIDENTE, INQUILINO, FAMILIAR, AUTORIZADO)
     * @returns {Promise} Lista de residentes filtrados
     */
    getResidentsByType: async (tipo) => {
        const response = await api.get('/users/residentes/por_tipo/', {
            params: { tipo }
        });
        return response.data;
    },

    /**
     * Terminar residencia
     * @param {number} id - ID del residente
     * @param {string} fechaSalida - Fecha de salida (YYYY-MM-DD)
     * @returns {Promise} Respuesta del servidor
     */
    endResidency: async (id, fechaSalida) => {
        const response = await api.post(`/users/residentes/${id}/terminar_residencia/`, {
            fecha_salida: fechaSalida
        });
        return response.data;
    },

    /**
     * Obtener mis residencias (del usuario actual)
     * @returns {Promise} Lista de residencias
     */
    getMyResidencies: async () => {
        const response = await api.get('/users/residentes/mis_residencias/');
        return response.data;
    },

    /**
     * Buscar residentes
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Promise} Lista de residentes encontrados
     */
    searchResidents: async (searchTerm) => {
        const response = await api.get('/users/residentes/', {
            params: { search: searchTerm }
        });
        return response.data;
    }
};

export default residentService;
