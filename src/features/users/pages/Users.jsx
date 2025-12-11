import { Card } from '../../../shared/components/ui';

const Users = () => {
    return (
        <div className="finances-page">
            <div className="page-header">
                <h1>Gestión de Usuarios</h1>
                <p className="page-subtitle">Administración de residentes y unidades habitacionales</p>
            </div>
            <Card>
                <h3 className="card-title">Módulo en Desarrollo</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Esta sección permitirá gestionar usuarios, roles y unidades habitacionales.
                </p>
            </Card>
        </div>
    );
};

export default Users;
