import { Card, Button } from '../../../shared/components/ui';
import { DollarSign, CreditCard, FileText, AlertCircle } from 'lucide-react';
import './Finances.css';

const Finances = () => {
    const payments = [
        { id: 1, unit: 'Unidad 101', amount: 1500, status: 'paid', date: '2024-12-01' },
        { id: 2, unit: 'Unidad 102', amount: 1500, status: 'pending', date: '2024-12-05' },
        { id: 3, unit: 'Unidad 201', amount: 1800, status: 'paid', date: '2024-12-03' },
        { id: 4, unit: 'Unidad 202', amount: 1800, status: 'overdue', date: '2024-11-28' },
    ];

    const getStatusBadge = (status) => {
        const badges = {
            paid: 'badge badge-success',
            pending: 'badge badge-warning',
            overdue: 'badge badge-danger',
        };
        const labels = {
            paid: 'Pagado',
            pending: 'Pendiente',
            overdue: 'Vencido',
        };
        return <span className={badges[status]}>{labels[status]}</span>;
    };

    return (
        <div className="finances-page">
            <div className="page-header">
                <div>
                    <h1>Gestión Financiera</h1>
                    <p className="page-subtitle">Administración de pagos y finanzas del condominio</p>
                </div>
                <Button variant="primary" icon={<DollarSign size={18} />}>
                    Registrar Pago
                </Button>
            </div>

            <div className="stats-row">
                <Card className="stat-mini">
                    <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
                        <DollarSign size={20} />
                    </div>
                    <div>
                        <p className="stat-mini-label">Total Recaudado</p>
                        <h3 className="stat-mini-value">Bs. 67,000</h3>
                    </div>
                </Card>
                <Card className="stat-mini">
                    <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' }}>
                        <CreditCard size={20} />
                    </div>
                    <div>
                        <p className="stat-mini-label">Pendientes</p>
                        <h3 className="stat-mini-value">Bs. 12,500</h3>
                    </div>
                </Card>
                <Card className="stat-mini">
                    <div className="stat-mini-icon" style={{ background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)' }}>
                        <AlertCircle size={20} />
                    </div>
                    <div>
                        <p className="stat-mini-label">Morosidad</p>
                        <h3 className="stat-mini-value">8.5%</h3>
                    </div>
                </Card>
            </div>

            <Card>
                <h3 className="card-title">Pagos Recientes</h3>
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Unidad</th>
                                <th>Monto</th>
                                <th>Fecha</th>
                                <th>Estado</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {payments.map((payment) => (
                                <tr key={payment.id}>
                                    <td>{payment.unit}</td>
                                    <td>Bs. {payment.amount}</td>
                                    <td>{new Date(payment.date).toLocaleDateString('es-BO')}</td>
                                    <td>{getStatusBadge(payment.status)}</td>
                                    <td>
                                        <Button variant="ghost" size="sm">Ver Detalles</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Finances;
