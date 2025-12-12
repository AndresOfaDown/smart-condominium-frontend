import api from '../../../shared/services/api';

/**
 * Servicio para gestión de unidades residenciales
 */
const unitService = {
    /**
     * Obtener todas las unidades
     * @returns {Promise} Lista de unidades
     */
    getAllUnits: async () => {
        const response = await api.get('/users/unidades/');
        return response.data;
    },

    /**
     * Obtener unidad por ID
     * @param {number} id - ID de la unidad
     * @returns {Promise} Datos de la unidad
     */
    getUnitById: async (id) => {
        const response = await api.get(`/users/unidades/${id}/`);
        return response.data;
    },

    /**
     * Crear nueva unidad
     * @param {Object} unitData - Datos de la unidad
     * @returns {Promise} Unidad creada
     */
    createUnit: async (unitData) => {
        const response = await api.post('/users/unidades/', unitData);
        return response.data;
    },

    /**
     * Actualizar unidad
     * @param {number} id - ID de la unidad
     * @param {Object} unitData - Datos a actualizar
     * @returns {Promise} Unidad actualizada
     */
    updateUnit: async (id, unitData) => {
        const response = await api.put(`/users/unidades/${id}/`, unitData);
        return response.data;
    },

    /**
     * Actualizar parcialmente unidad
     * @param {number} id - ID de la unidad
     * @param {Object} unitData - Datos a actualizar
     * @returns {Promise} Unidad actualizada
     */
    patchUnit: async (id, unitData) => {
        const response = await api.patch(`/users/unidades/${id}/`, unitData);
        return response.data;
    },

    /**
     * Eliminar unidad
     * @param {number} id - ID de la unidad
     * @returns {Promise} Respuesta del servidor
     */
    deleteUnit: async (id) => {
        const response = await api.delete(`/users/unidades/${id}/`);
        return response.data;
    },

    /**
     * Obtener residentes de una unidad
     * @param {number} id - ID de la unidad
     * @returns {Promise} Lista de residentes
     */
    getUnitResidents: async (id) => {
        const response = await api.get(`/users/unidades/${id}/residentes/`);
        return response.data;
    },

    /**
     * Registrar propietario como residente
     * @param {number} id - ID de la unidad
     * @param {string} fechaIngreso - Fecha de ingreso (YYYY-MM-DD)
     * @returns {Promise} Residente creado
     */
    registerOwnerAsResident: async (id, fechaIngreso) => {
        const response = await api.post(`/users/unidades/${id}/registrar_propietario_residente/`, {
            fecha_ingreso: fechaIngreso
        });
        return response.data;
    },

    /**
     * Alquilar unidad a un inquilino
     * @param {number} id - ID de la unidad
     * @param {Object} rentalData - Datos del alquiler
     * @returns {Promise} Residente creado
     */
    rentUnit: async (id, rentalData) => {
        const response = await api.post(`/users/unidades/${id}/alquilar/`, rentalData);
        return response.data;
    },

    /**
     * Terminar alquiler de una unidad
     * @param {number} id - ID de la unidad
     * @param {string} fechaSalida - Fecha de salida (YYYY-MM-DD)
     * @returns {Promise} Respuesta del servidor
     */
    endRental: async (id, fechaSalida) => {
        const response = await api.post(`/users/unidades/${id}/terminar_alquiler/`, {
            fecha_salida: fechaSalida
        });
        return response.data;
    },

    /**
     * Obtener mis unidades (como propietario o residente)
     * @returns {Promise} Lista de unidades
     */
    getMyUnits: async () => {
        const response = await api.get('/users/unidades/mis_unidades/');
        return response.data;
    },

    /**
     * Filtrar unidades por estado de ocupación
     * @param {string} estado - Estado (OCUPADA_PROPIETARIO, ALQUILADA, VACANTE)
     * @returns {Promise} Lista de unidades filtradas
     */
    getUnitsByStatus: async (estado) => {
        const response = await api.get('/users/unidades/por_estado/', {
            params: { estado }
        });
        return response.data;
    },

    /**
     * Buscar unidades
     * @param {string} searchTerm - Término de búsqueda
     * @returns {Promise} Lista de unidades encontradas
     */
    searchUnits: async (searchTerm) => {
        const response = await api.get('/users/unidades/', {
            params: { search: searchTerm }
        });
        return response.data;
    }
};

export default unitService;
