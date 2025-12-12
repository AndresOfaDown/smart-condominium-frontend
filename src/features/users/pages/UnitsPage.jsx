import { useState, useEffect } from 'react';
import { unitService, residentService } from '../services';
import './UnitsPage.css';

const UnitsPage = () => {
    const [units, setUnits] = useState([]);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [residents, setResidents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [filterStatus, setFilterStatus] = useState('ALL');

    useEffect(() => {
        loadUnits();
    }, [filterStatus]);

    const loadUnits = async () => {
        try {
            setIsLoading(true);
            setError(null);

            let data;
            if (filterStatus === 'ALL') {
                data = await unitService.getAllUnits();
            } else {
                data = await unitService.getUnitsByStatus(filterStatus);
            }

            setUnits(data.results || data);
        } catch (err) {
            setError('Error al cargar las unidades');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const loadUnitResidents = async (unitId) => {
        try {
            const data = await unitService.getUnitResidents(unitId);
            setResidents(data);
        } catch (err) {
            console.error('Error al cargar residentes:', err);
        }
    };

    const handleUnitClick = async (unit) => {
        setSelectedUnit(unit);
        await loadUnitResidents(unit.id);
    };

    const getStatusBadgeClass = (status) => {
        const statusClasses = {
            'VACANTE': 'status-vacant',
            'OCUPADA_PROPIETARIO': 'status-owner',
            'ALQUILADA': 'status-rented'
        };
        return statusClasses[status] || '';
    };

    const getStatusLabel = (status) => {
        const labels = {
            'VACANTE': 'Vacante',
            'OCUPADA_PROPIETARIO': 'Ocupada por Propietario',
            'ALQUILADA': 'Alquilada'
        };
        return labels[status] || status;
    };

    if (isLoading) {
        return (
            <div className="units-page">
                <div className="loading">Cargando unidades...</div>
            </div>
        );
    }

    return (
        <div className="units-page">
            <div className="page-header">
                <h1>Unidades Residenciales</h1>
                <button
                    className="btn-primary"
                    onClick={() => setShowCreateModal(true)}
                >
                    + Nueva Unidad
                </button>
            </div>

            <div className="filters">
                <button
                    className={`filter-btn ${filterStatus === 'ALL' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('ALL')}
                >
                    Todas
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'VACANTE' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('VACANTE')}
                >
                    Vacantes
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'OCUPADA_PROPIETARIO' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('OCUPADA_PROPIETARIO')}
                >
                    Ocupadas
                </button>
                <button
                    className={`filter-btn ${filterStatus === 'ALQUILADA' ? 'active' : ''}`}
                    onClick={() => setFilterStatus('ALQUILADA')}
                >
                    Alquiladas
                </button>
            </div>

            {error && <div className="error-banner">{error}</div>}

            <div className="units-layout">
                <div className="units-grid">
                    {units.length === 0 ? (
                        <div className="empty-state">
                            <p>No hay unidades para mostrar</p>
                        </div>
                    ) : (
                        units.map(unit => (
                            <div
                                key={unit.id}
                                className={`unit-card ${selectedUnit?.id === unit.id ? 'selected' : ''}`}
                                onClick={() => handleUnitClick(unit)}
                            >
                                <div className="unit-header">
                                    <h3>Unidad {unit.numero_unidad}</h3>
                                    <span className={`status-badge ${getStatusBadgeClass(unit.estado_ocupacion)}`}>
                                        {getStatusLabel(unit.estado_ocupacion)}
                                    </span>
                                </div>

                                <div className="unit-details">
                                    <div className="detail-item">
                                        <span className="label">Propietario:</span>
                                        <span className="value">{unit.propietario_nombre || 'N/A'}</span>
                                    </div>

                                    {unit.piso && (
                                        <div className="detail-item">
                                            <span className="label">Piso:</span>
                                            <span className="value">{unit.piso}</span>
                                        </div>
                                    )}

                                    {unit.dormitorios && (
                                        <div className="detail-item">
                                            <span className="label">Dormitorios:</span>
                                            <span className="value">{unit.dormitorios}</span>
                                        </div>
                                    )}

                                    <div className="detail-item">
                                        <span className="label">Residentes:</span>
                                        <span className="value">{unit.cantidad_residentes || 0}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {selectedUnit && (
                    <div className="unit-sidebar">
                        <div className="sidebar-header">
                            <h2>Unidad {selectedUnit.numero_unidad}</h2>
                            <button
                                className="close-btn"
                                onClick={() => setSelectedUnit(null)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="sidebar-content">
                            <section className="info-section">
                                <h3>Información</h3>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="label">Estado:</span>
                                        <span className={`value ${getStatusBadgeClass(selectedUnit.estado_ocupacion)}`}>
                                            {getStatusLabel(selectedUnit.estado_ocupacion)}
                                        </span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Propietario:</span>
                                        <span className="value">{selectedUnit.propietario_nombre}</span>
                                    </div>
                                    {selectedUnit.superficie_m2 && (
                                        <div className="info-item">
                                            <span className="label">Superficie:</span>
                                            <span className="value">{selectedUnit.superficie_m2} m²</span>
                                        </div>
                                    )}
                                </div>
                            </section>

                            <section className="residents-section">
                                <div className="section-header">
                                    <h3>Residentes Activos</h3>
                                    <span className="count">{residents.length}</span>
                                </div>

                                {residents.length === 0 ? (
                                    <p className="empty-text">No hay residentes activos</p>
                                ) : (
                                    <div className="residents-list">
                                        {residents.map(resident => (
                                            <div key={resident.id} className="resident-item">
                                                <div className="resident-info">
                                                    <p className="resident-name">
                                                        {resident.usuario_detalle?.nombre_completo || 'N/A'}
                                                    </p>
                                                    <span className="resident-type">
                                                        {resident.tipo_residente_display}
                                                    </span>
                                                </div>
                                                {resident.es_principal && (
                                                    <span className="principal-badge">Principal</span>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </section>

                            <div className="sidebar-actions">
                                {selectedUnit.estado_ocupacion === 'VACANTE' && (
                                    <>
                                        <button className="btn-action btn-owner">
                                            Registrar Propietario
                                        </button>
                                        <button className="btn-action btn-rent">
                                            Alquilar Unidad
                                        </button>
                                    </>
                                )}
                                {selectedUnit.estado_ocupacion === 'ALQUILADA' && (
                                    <button className="btn-action btn-danger">
                                        Terminar Alquiler
                                    </button>
                                )}
                                <button className="btn-action btn-secondary">
                                    Agregar Residente
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UnitsPage;
