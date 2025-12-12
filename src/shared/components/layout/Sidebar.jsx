import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    DollarSign,
    Users,
    Home,
    Shield,
    Calendar,
    MessageSquare,
    Wrench,
    BarChart3,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/finances', icon: DollarSign, label: 'Finanzas' },
        { path: '/users', icon: Users, label: 'Usuarios' },
        { path: '/units', icon: Home, label: 'Unidades' },
        { path: '/security', icon: Shield, label: 'Seguridad' },
        { path: '/common-areas', icon: Calendar, label: 'Áreas Comunes' },
        { path: '/communications', icon: MessageSquare, label: 'Comunicaciones' },
        { path: '/maintenance', icon: Wrench, label: 'Mantenimiento' },
        { path: '/reports', icon: BarChart3, label: 'Reportes' },
    ];

    return (
        <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="sidebar-header">
                {!isCollapsed && (
                    <div className="sidebar-logo">
                        <span className="logo-icon">🏢</span>
                        <span className="logo-text">Smart Condominium</span>
                    </div>
                )}
                <button
                    className="sidebar-toggle"
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    title={isCollapsed ? 'Expandir' : 'Contraer'}
                >
                    {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'sidebar-link-active' : ''}`
                        }
                        title={isCollapsed ? item.label : ''}
                    >
                        <item.icon size={20} className="sidebar-link-icon" />
                        {!isCollapsed && <span className="sidebar-link-text">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
