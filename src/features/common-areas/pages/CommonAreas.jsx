import { Card } from '../../../shared/components/ui';

const CommonAreas = () => {
    return (
        <div className="finances-page">
            <div className="page-header">
                <h1>Áreas Comunes</h1>
                <p className="page-subtitle">Gestión de reservas y disponibilidad</p>
            </div>
            <Card>
                <h3 className="card-title">Módulo en Desarrollo</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Esta sección permitirá gestionar áreas comunes, reservas y horarios.
                </p>
            </Card>
        </div>
    );
};

export default CommonAreas;
