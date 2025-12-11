import { Card } from '../../../shared/components/ui';

const Maintenance = () => {
    return (
        <div className="finances-page">
            <div className="page-header">
                <h1>Mantenimiento</h1>
                <p className="page-subtitle">Gestión de tareas y mantenimiento preventivo</p>
            </div>
            <Card>
                <h3 className="card-title">Módulo en Desarrollo</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Esta sección permitirá asignar tareas de mantenimiento y dar seguimiento.
                </p>
            </Card>
        </div>
    );
};

export default Maintenance;
