import { Card } from '../../../shared/components/ui';

const Communications = () => {
    return (
        <div className="finances-page">
            <div className="page-header">
                <h1>Comunicaciones</h1>
                <p className="page-subtitle">Publicación de avisos y comunicados</p>
            </div>
            <Card>
                <h3 className="card-title">Módulo en Desarrollo</h3>
                <p style={{ color: 'var(--color-text-secondary)' }}>
                    Esta sección permitirá crear y publicar avisos generales para los residentes.
                </p>
            </Card>
        </div>
    );
};

export default Communications;
