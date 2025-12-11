import { Card } from '../../../shared/components/ui';
import {
    DollarSign,
    Users,
    Shield,
    AlertTriangle,
    TrendingUp,
    TrendingDown
} from 'lucide-react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import './Dashboard.css';

const Dashboard = () => {
    // Mock data for charts
    const financialData = [
        { month: 'Ene', ingresos: 45000, egresos: 32000 },
        { month: 'Feb', ingresos: 52000, egresos: 35000 },
        { month: 'Mar', ingresos: 48000, egresos: 38000 },
        { month: 'Abr', ingresos: 61000, egresos: 42000 },
        { month: 'May', ingresos: 55000, egresos: 40000 },
        { month: 'Jun', ingresos: 67000, egresos: 45000 },
    ];

    const securityData = [
        { name: 'Autorizados', value: 450, color: '#10b981' },
        { name: 'Visitantes', value: 120, color: '#3b82f6' },
        { name: 'Alertas', value: 15, color: '#f59e0b' },
    ];

    const stats = [
        {
            title: 'Ingresos del Mes',
            value: 'Bs. 67,000',
            change: '+12.5%',
            trend: 'up',
            icon: DollarSign,
            color: 'success',
        },
        {
            title: 'Residentes Activos',
            value: '450',
            change: '+5',
            trend: 'up',
            icon: Users,
            color: 'primary',
        },
        {
            title: 'Alertas de Seguridad',
            value: '15',
            change: '-8',
            trend: 'down',
            icon: Shield,
            color: 'warning',
        },
        {
            title: 'Morosidad',
            value: '8.5%',
            change: '-2.3%',
            trend: 'down',
            icon: AlertTriangle,
            color: 'danger',
        },
    ];

    const recentActivities = [
        { id: 1, type: 'security', message: 'Acceso autorizado - Unidad 305', time: 'Hace 5 min' },
        { id: 2, type: 'payment', message: 'Pago recibido - Unidad 201', time: 'Hace 15 min' },
        { id: 3, type: 'alert', message: 'Vehículo no autorizado detectado', time: 'Hace 30 min' },
        { id: 4, type: 'maintenance', message: 'Mantenimiento completado - Piscina', time: 'Hace 1 hora' },
        { id: 5, type: 'security', message: 'Visitante registrado - Unidad 102', time: 'Hace 2 horas' },
    ];

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="dashboard-subtitle">Resumen general del condominio</p>
            </div>

            {/* Statistics Cards */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <Card key={index} className="stat-card">
                        <div className="stat-header">
                            <div className={`stat-icon stat-icon-${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <div className={`stat-trend ${stat.trend === 'up' ? 'trend-up' : 'trend-down'}`}>
                                {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                                <span>{stat.change}</span>
                            </div>
                        </div>
                        <div className="stat-content">
                            <h3 className="stat-value">{stat.value}</h3>
                            <p className="stat-title">{stat.title}</p>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
                <Card className="chart-card">
                    <h3 className="chart-title">Ingresos vs Egresos</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={financialData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(75, 85, 99, 0.3)" />
                            <XAxis dataKey="month" stroke="#9ca3af" />
                            <YAxis stroke="#9ca3af" />
                            <Tooltip
                                contentStyle={{
                                    background: '#1f2937',
                                    border: '1px solid rgba(75, 85, 99, 0.3)',
                                    borderRadius: '8px'
                                }}
                            />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="ingresos"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ fill: '#10b981', r: 4 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="egresos"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={{ fill: '#ef4444', r: 4 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </Card>

                <Card className="chart-card">
                    <h3 className="chart-title">Distribución de Accesos</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={securityData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {securityData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: '#1f2937',
                                    border: '1px solid rgba(75, 85, 99, 0.3)',
                                    borderRadius: '8px'
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </Card>
            </div>

            {/* Recent Activities */}
            <Card className="activities-card">
                <h3 className="activities-title">Actividades Recientes</h3>
                <div className="activities-list">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="activity-item">
                            <div className={`activity-dot activity-${activity.type}`}></div>
                            <div className="activity-content">
                                <p className="activity-message">{activity.message}</p>
                                <span className="activity-time">{activity.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
