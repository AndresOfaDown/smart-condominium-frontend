/**
 * EJEMPLO DE USO DE LOS SERVICIOS API
 * 
 * Este archivo muestra ejemplos de cómo usar los servicios creados
 * en diferentes componentes de React.
 */

import { authService } from './features/auth/services';
import { userService, unitService, residentService } from './features/users/services';

// ============================================
// EJEMPLO 1: LOGIN Y AUTENTICACIÓN
// ============================================

export const ejemploLogin = async () => {
    try {
        // Login
        const response = await authService.login('admin@condominio.com', 'password123');
        console.log('Login exitoso:', response);

        // El token se guarda automáticamente en localStorage
        // Ahora todas las peticiones incluirán el token

        // Obtener usuario actual
        const user = await authService.getCurrentUser();
        console.log('Usuario actual:', user);

        // Obtener permisos
        const permissions = await authService.getMyPermissions();
        console.log('Permisos:', permissions);

    } catch (error) {
        console.error('Error en login:', error.response?.data);
    }
};

// ============================================
// EJEMPLO 2: GESTIÓN DE USUARIOS
// ============================================

export const ejemploUsuarios = async () => {
    try {
        // Crear usuario
        const nuevoUsuario = await userService.createUser({
            username: 'maria_lopez',
            email: 'maria@email.com',
            password: 'Password123!',
            password2: 'Password123!',
            first_name: 'María',
            last_name: 'López',
            rol: 'RESIDENTE',
            telefono: '+593987654321'
        });
        console.log('Usuario creado:', nuevoUsuario);

        // Listar todos los usuarios
        const usuarios = await userService.getAllUsers();
        console.log('Todos los usuarios:', usuarios);

        // Filtrar por rol
        const admins = await userService.getUsersByRole('ADMIN');
        console.log('Administradores:', admins);

        // Buscar usuarios
        const resultados = await userService.searchUsers('maria');
        console.log('Búsqueda:', resultados);

        // Cambiar rol
        await userService.changeUserRole(nuevoUsuario.id, 'SEGURIDAD');
        console.log('Rol cambiado');

    } catch (error) {
        console.error('Error:', error.response?.data);
    }
};

// ============================================
// EJEMPLO 3: GESTIÓN DE UNIDADES
// ============================================

export const ejemploUnidades = async () => {
    try {
        // Crear unidad
        const nuevaUnidad = await unitService.createUnit({
            numero_unidad: '101',
            propietario: 2, // ID del usuario propietario
            piso: 1,
            superficie_m2: 85.50,
            dormitorios: 3,
            banos: 2,
            descripcion: 'Apartamento de 3 dormitorios con vista al parque'
        });
        console.log('Unidad creada:', nuevaUnidad);

        // Listar todas las unidades
        const unidades = await unitService.getAllUnits();
        console.log('Todas las unidades:', unidades);

        // Filtrar por estado
        const vacantes = await unitService.getUnitsByStatus('VACANTE');
        console.log('Unidades vacantes:', vacantes);

        const alquiladas = await unitService.getUnitsByStatus('ALQUILADA');
        console.log('Unidades alquiladas:', alquiladas);

        // Obtener mis unidades
        const misUnidades = await unitService.getMyUnits();
        console.log('Mis unidades:', misUnidades);

    } catch (error) {
        console.error('Error:', error.response?.data);
    }
};

// ============================================
// EJEMPLO 4: REGISTRAR PROPIETARIO COMO RESIDENTE
// ============================================

export const ejemploRegistrarPropietario = async (unidadId) => {
    try {
        // El propietario vive en su propia unidad
        const resultado = await unitService.registerOwnerAsResident(
            unidadId,
            '2024-01-15' // fecha de ingreso
        );

        console.log('Propietario registrado:', resultado);
        // Estado de la unidad cambia a 'OCUPADA_PROPIETARIO'

    } catch (error) {
        console.error('Error:', error.response?.data);
    }
};

// ============================================
// EJEMPLO 5: ALQUILAR UNIDAD
// ============================================

export const ejemploAlquilarUnidad = async (unidadId, inquilinoId) => {
    try {
        const resultado = await unitService.rentUnit(unidadId, {
            inquilino_id: inquilinoId,
            fecha_ingreso: '2024-02-01',
            notas: 'Contrato de alquiler por 12 meses. Depósito: $500'
        });

        console.log('Unidad alquilada:', resultado);
        // Estado de la unidad cambia a 'ALQUILADA'
        // Se desactivan residentes anteriores automáticamente

    } catch (error) {
        console.error('Error:', error.response?.data);
    }
};

// ============================================
// EJEMPLO 6: TERMINAR ALQUILER
// ============================================

export const ejemploTerminarAlquiler = async (unidadId) => {
    try {
        const resultado = await unitService.endRental(
            unidadId,
            '2024-12-31' // fecha de salida
        );

        console.log('Alquiler terminado:', resultado);
        // Estado de la unidad cambia a 'VACANTE'
        // Todos los residentes se desactivan

    } catch (error) {
        console.error('Error:', error.response?.data);
    }
};

// ============================================
// EJEMPLO 7: AGREGAR RESIDENTE (FAMILIAR O AUTORIZADO)
// ============================================

export const ejemploAgregarResidente = async () => {
    try {
        // Agregar familiar
        const familiar = await residentService.createResident({
            usuario: 5, // ID del usuario
            unidad: 1,  // ID de la unidad
            tipo_residente: 'FAMILIAR',
            es_principal: false,
            fecha_ingreso: '2024-03-01',
            notas: 'Hijo del propietario'
        });
        console.log('Familiar agregado:', familiar);

        // Agregar autorizado (empleada, etc.)
        const autorizado = await residentService.createResident({
            usuario: 6,
            unidad: 1,
            tipo_residente: 'AUTORIZADO',
            es_principal: false,
            fecha_ingreso: '2024-03-15',
            notas: 'Empleada doméstica autorizada'
        });
        console.log('Autorizado agregado:', autorizado);

    } catch (error) {
        console.error('Error:', error.response?.data);
    }
};

// ============================================
// EJEMPLO 8: VER RESIDENTES DE UNA UNIDAD
// ============================================

export const ejemploVerResidentes = async (unidadId) => {
    try {
        // Obtener todos los residentes de la unidad
        const residentes = await unitService.getUnitResidents(unidadId);
        console.log('Residentes de la unidad:', residentes);

        // Filtrar solo residentes activos
        const activos = await residentService.getActiveResidents();
        console.log('Residentes activos:', activos);

        // Filtrar por tipo
        const inquilinos = await residentService.getResidentsByType('INQUILINO');
        console.log('Inquilinos:', inquilinos);

    } catch (error) {
        console.error('Error:', error.response?.data);
    }
};

// ============================================
// EJEMPLO 9: TERMINAR RESIDENCIA
// ============================================

export const ejemploTerminarResidencia = async (residenteId) => {
    try {
        const resultado = await residentService.endResidency(
            residenteId,
            '2024-11-30' // fecha de salida
        );

        console.log('Residencia terminada:', resultado);

    } catch (error) {
        console.error('Error:', error.response?.data);
    }
};

// ============================================
// EJEMPLO 10: USO EN COMPONENTE REACT
// ============================================

/*
import { useState, useEffect } from 'react';
import { unitService } from '../features/users/services';

function UnitsComponent() {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadUnits();
  }, []);

  const loadUnits = async () => {
    try {
      setLoading(true);
      const data = await unitService.getAllUnits();
      setUnits(data.results || data);
    } catch (err) {
      setError('Error al cargar unidades');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUnit = async (unitData) => {
    try {
      await unitService.createUnit(unitData);
      loadUnits(); // Recargar lista
      alert('Unidad creada exitosamente');
    } catch (err) {
      alert('Error al crear unidad');
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Unidades</h1>
      {units.map(unit => (
        <div key={unit.id}>
          <h3>Unidad {unit.numero_unidad}</h3>
          <p>Estado: {unit.estado_ocupacion}</p>
          <p>Propietario: {unit.propietario_nombre}</p>
        </div>
      ))}
    </div>
  );
}
*/

// ============================================
// EJEMPLO 11: MANEJO DE ERRORES
// ============================================

export const ejemploManejoErrores = async () => {
    try {
        await userService.createUser({
            username: 'test',
            // Faltan campos requeridos
        });
    } catch (error) {
        if (error.response) {
            const { status, data } = error.response;

            switch (status) {
                case 400:
                    console.error('Errores de validación:', data);
                    // Mostrar errores específicos al usuario
                    break;

                case 401:
                    console.error('No autenticado');
                    // Redirigir a login
                    break;

                case 403:
                    console.error('Sin permisos');
                    // Mostrar mensaje de permisos insuficientes
                    break;

                case 404:
                    console.error('No encontrado');
                    break;

                default:
                    console.error('Error del servidor');
            }
        } else if (error.request) {
            console.error('Error de red - sin respuesta del servidor');
        } else {
            console.error('Error:', error.message);
        }
    }
};

// ============================================
// EJEMPLO 12: FLUJO COMPLETO
// ============================================

export const flujoCompleto = async () => {
    try {
        // 1. Login
        await authService.login('admin@condominio.com', 'password123');

        // 2. Crear usuario propietario
        const propietario = await userService.createUser({
            username: 'juan_perez',
            email: 'juan@email.com',
            password: 'Password123!',
            password2: 'Password123!',
            first_name: 'Juan',
            last_name: 'Pérez',
            rol: 'RESIDENTE',
            telefono: '+593987654321'
        });

        // 3. Crear unidad
        const unidad = await unitService.createUnit({
            numero_unidad: '101',
            propietario: propietario.id,
            piso: 1,
            superficie_m2: 85.50,
            dormitorios: 3,
            banos: 2
        });

        // 4. Registrar propietario como residente
        await unitService.registerOwnerAsResident(unidad.id, '2024-01-15');

        // 5. Ver residentes
        const residentes = await unitService.getUnitResidents(unidad.id);
        console.log('Residentes:', residentes);

        // 6. Ver todas las unidades ocupadas
        const ocupadas = await unitService.getUnitsByStatus('OCUPADA_PROPIETARIO');
        console.log('Unidades ocupadas:', ocupadas);

        console.log('Flujo completo ejecutado exitosamente!');

    } catch (error) {
        console.error('Error en flujo:', error.response?.data);
    }
};

export default {
    ejemploLogin,
    ejemploUsuarios,
    ejemploUnidades,
    ejemploRegistrarPropietario,
    ejemploAlquilarUnidad,
    ejemploTerminarAlquiler,
    ejemploAgregarResidente,
    ejemploVerResidentes,
    ejemploTerminarResidencia,
    ejemploManejoErrores,
    flujoCompleto
};
