import { Card, Button } from '../../../shared/components/ui';
import { Camera, Users, Car, AlertTriangle } from 'lucide-react';

const Security = () => {
    return (
        <div className="finances-page">
            <div className="page-header">
                <div>
                    <h1>Seguridad e IA</h1>
                    <p className="page-subtitle">Monitoreo y control de seguridad con inteligencia artificial</p>
                </div>
            </div>

            <div className="stats-row">
                <Card className="stat-mini">
                    <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)' }}>
                        <Camera size={20} />
                    </div>
                    <div>
                        <p className="stat-mini-label">Cámaras Activas</p>
                        <h3 className="stat-mini-value">24</h3>
                    </div>
                </Card>
                <Card className="stat-mini">
                    <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                        <Users size={20} />
                    </div>
                    <div>
                        <p className="stat-mini-label">Residentes Autorizados</p>
                        <h3 className="stat-mini-value">450</h3>
                    </div>
                </Card>
                <Card className="stat-mini">
                    <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
                        <Car size={20} />
                    </div>
                    <div>
                        <p className="stat-mini-label">Vehículos Registrados</p>
                        <h3 className="stat-mini-value">320</h3>
                    </div>
                </Card>
                <Card className="stat-mini">
                    <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                        <AlertTriangle size={20} />
                    </div>
                    <div>
                        <p className="stat-mini-label">Alertas Hoy</p>
                        <h3 className="stat-mini-value">5</h3>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-2">
                <Card hover={false}>
                    <h3 className="card-title">Reconocimiento Facial</h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Sistema de reconocimiento facial para control de acceso automático de residentes.
                    </p>
                    <Button variant="primary" style={{ marginTop: 'var(--spacing-lg)' }}>
                        Ver Registros
                    </Button>
                </Card>

                <Card hover={false}>
                    <h3 className="card-title">Control Vehicular (OCR)</h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Lectura automática de placas vehiculares para control de acceso.
                    </p>
                    <Button variant="primary" style={{ marginTop: 'var(--spacing-lg)' }}>
                        Ver Vehículos
                    </Button>
                </Card>

                <Card hover={false}>
                    <h3 className="card-title">Registro de Visitantes</h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Registro automático de visitantes con captura de foto al ingreso.
                    </p>
                    <Button variant="primary" style={{ marginTop: 'var(--spacing-lg)' }}>
                        Ver Visitantes
                    </Button>
                </Card>

                <Card hover={false}>
                    <h3 className="card-title">Detección de Anomalías</h3>
                    <p style={{ color: 'var(--color-text-secondary)' }}>
                        Alertas automáticas de comportamientos sospechosos y situaciones anómalas.
                    </p>
                    <Button variant="primary" style={{ marginTop: 'var(--spacing-lg)' }}>
                        Ver Alertas
                    </Button>
                </Card>
            </div>
        </div>
    );
};

export default Security;
