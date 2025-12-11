import { Card } from '../../../shared/components/ui';

const Reports = () => {
    return (
        <div className="finances-page">
            <div className="page-header">
                <h1>Reportes y Analítica</h1>
                <p className="page-subtitle">Indicadores y reportes del condominio</p>
            </div>
            <Card>
                <h3 className="card-title">Módulo en Desarrollo</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Esta sección mostrará reportes financieros, de seguridad y uso de áreas comunes.
                </p>
            </Card>
        </div>
    );
};

export default Reports;
