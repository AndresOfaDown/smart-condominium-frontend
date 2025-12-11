import { useAuth } from '../../../features/auth/context/AuthContext';
import { Bell, Search, User, LogOut } from 'lucide-react';
import './Header.css';

const Header = () => {
    const { user, logout } = useAuth();

    return (
        <header className="header">
            <div className="header-search">
                <Search size={18} className="search-icon" />
                <input
                    type="text"
                    placeholder="Buscar..."
                    className="search-input"
                />
            </div>

            <div className="header-actions">
                <button className="header-action-btn" title="Notificaciones">
                    <Bell size={20} />
                    <span className="notification-badge">3</span>
                </button>

                <div className="header-user">
                    <div className="user-avatar">
                        <User size={18} />
                    </div>
                    <div className="user-info">
                        <span className="user-name">{user?.fullName || 'Usuario'}</span>
                        <span className="user-role">{user?.role || 'Admin'}</span>
                    </div>
                    <button
                        className="logout-btn"
                        onClick={logout}
                        title="Cerrar sesión"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
