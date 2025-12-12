import { useState, useEffect } from 'react';
import { Card } from '../../../shared/components/ui';
import { userService } from '../services';
import UserModal from '../components/UserModal';
import { Users as UsersIcon, Mail, Phone, Shield, UserPlus, Search } from 'lucide-react';
import './Users.css';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRole, setSelectedRole] = useState('ALL');

    // Modal states
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        loadUsers();
    }, []);

    useEffect(() => {
        filterUsers();
    }, [searchTerm, selectedRole, users]);

    const loadUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await userService.getAllUsers();

            // Handle paginated response
            let usersData;
            if (response.results && Array.isArray(response.results)) {
                // Paginated response - use results array
                usersData = response.results;
            } else if (Array.isArray(response)) {
                // Direct array response
                usersData = response;
            } else {
                // Fallback
                usersData = [];
            }

            console.log('Usuarios cargados:', usersData.length);
            setUsers(usersData);
            setFilteredUsers(usersData);
        } catch (err) {
            console.error('Error cargando usuarios:', err);
            setError('Error al cargar los usuarios');
        } finally {
            setLoading(false);
        }
    };

    const filterUsers = () => {
        let filtered = [...users];

        // Filtrar por rol
        if (selectedRole !== 'ALL') {
            filtered = filtered.filter(user => user.rol === selectedRole);
        }

        // Filtrar por búsqueda
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(user =>
                user.username?.toLowerCase().includes(term) ||
                user.email?.toLowerCase().includes(term) ||
                user.first_name?.toLowerCase().includes(term) ||
                user.last_name?.toLowerCase().includes(term)
            );
        }

        setFilteredUsers(filtered);
    };

    const getRoleBadgeClass = (role) => {
        const roleClasses = {
            'ADMIN': 'role-admin',
            'RESIDENTE': 'role-resident',
            'SEGURIDAD': 'role-security',
            'MANTENIMIENTO': 'role-maintenance'
        };
        return roleClasses[role] || 'role-default';
    };

    const getRoleLabel = (role) => {
        const labels = {
            'ADMIN': 'Administrador',
            'RESIDENTE': 'Residente',
            'SEGURIDAD': 'Seguridad',
            'MANTENIMIENTO': 'Mantenimiento'
        };
        return labels[role] || role;
    };

    const handleEditUser = (user) => {
        setSelectedUser(user);
        setShowEditModal(true);
    };

    const handleViewDetails = (user) => {
        // TODO: Implement details modal
        console.log('View details for:', user);
    };

    const handleModalSuccess = () => {
        loadUsers();
    };

    if (loading) {
        return (
            <div className="users-page">
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>Cargando usuarios...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="users-page">
                <div className="error-container">
                    <p>{error}</p>
                    <button onClick={loadUsers} className="btn-retry">
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="users-page">
            <div className="page-header">
                <div className="header-content">
                    <h1>Gestión de Usuarios</h1>
                    <p className="page-subtitle">
                        Administración de residentes y personal del condominio
                    </p>
                </div>
                <button className="btn-primary" onClick={() => setShowCreateModal(true)}>
                    <UserPlus size={20} />
                    Nuevo Usuario
                </button>
            </div>

            {/* Filters and Search */}
            <div className="filters-section">
                <div className="search-box">
                    <Search size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, email o usuario..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="role-filters">
                    <button
                        className={`filter-btn ${selectedRole === 'ALL' ? 'active' : ''}`}
                        onClick={() => setSelectedRole('ALL')}
                    >
                        Todos ({users.length})
                    </button>
                    <button
                        className={`filter-btn ${selectedRole === 'ADMIN' ? 'active' : ''}`}
                        onClick={() => setSelectedRole('ADMIN')}
                    >
                        Administradores ({users.filter(u => u.rol === 'ADMIN').length})
                    </button>
                    <button
                        className={`filter-btn ${selectedRole === 'RESIDENTE' ? 'active' : ''}`}
                        onClick={() => setSelectedRole('RESIDENTE')}
                    >
                        Residentes ({users.filter(u => u.rol === 'RESIDENTE').length})
                    </button>
                    <button
                        className={`filter-btn ${selectedRole === 'SEGURIDAD' ? 'active' : ''}`}
                        onClick={() => setSelectedRole('SEGURIDAD')}
                    >
                        Seguridad ({users.filter(u => u.rol === 'SEGURIDAD').length})
                    </button>
                    <button
                        className={`filter-btn ${selectedRole === 'MANTENIMIENTO' ? 'active' : ''}`}
                        onClick={() => setSelectedRole('MANTENIMIENTO')}
                    >
                        Mantenimiento ({users.filter(u => u.rol === 'MANTENIMIENTO').length})
                    </button>
                </div>
            </div>

            {/* Stats Summary */}
            <div className="stats-summary">
                <div className="stat-item">
                    <UsersIcon size={24} />
                    <div>
                        <p className="stat-value">{filteredUsers.length}</p>
                        <p className="stat-label">
                            {selectedRole === 'ALL' ? 'Total Usuarios' : 'Usuarios Filtrados'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Users Grid */}
            {filteredUsers.length === 0 ? (
                <div className="empty-state">
                    <UsersIcon size={48} />
                    <h3>No se encontraron usuarios</h3>
                    <p>
                        {searchTerm
                            ? 'Intenta con otros términos de búsqueda'
                            : 'No hay usuarios registrados en el sistema'}
                    </p>
                </div>
            ) : (
                <div className="users-grid">
                    {filteredUsers.map((user) => (
                        <Card key={user.id} className="user-card">
                            <div className="user-card-header">
                                <div className="user-avatar">
                                    {user.foto ? (
                                        <img src={user.foto} alt={user.username} />
                                    ) : (
                                        <UsersIcon size={24} />
                                    )}
                                </div>
                                <span className={`role-badge ${getRoleBadgeClass(user.rol)}`}>
                                    {getRoleLabel(user.rol)}
                                </span>
                            </div>

                            <div className="user-card-body">
                                <h3 className="user-name">
                                    {user.first_name && user.last_name
                                        ? `${user.first_name} ${user.last_name}`
                                        : user.username}
                                </h3>
                                <p className="user-username">@{user.username}</p>

                                <div className="user-details">
                                    {user.email && (
                                        <div className="detail-row">
                                            <Mail size={16} />
                                            <span>{user.email}</span>
                                        </div>
                                    )}
                                    {user.telefono && (
                                        <div className="detail-row">
                                            <Phone size={16} />
                                            <span>{user.telefono}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="user-meta">
                                    <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                                        {user.is_active ? 'Activo' : 'Inactivo'}
                                    </span>
                                    {user.email_verificado && (
                                        <span className="verified-badge">
                                            ✓ Verificado
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="user-card-footer">
                                <button
                                    className="btn-action btn-view"
                                    onClick={() => handleViewDetails(user)}
                                >
                                    Ver Detalles
                                </button>
                                <button
                                    className="btn-action btn-edit"
                                    onClick={() => handleEditUser(user)}
                                >
                                    Editar
                                </button>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Modals */}
            <UserModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSuccess={handleModalSuccess}
                mode="create"
            />

            <UserModal
                isOpen={showEditModal}
                onClose={() => {
                    setShowEditModal(false);
                    setSelectedUser(null);
                }}
                onSuccess={handleModalSuccess}
                user={selectedUser}
                mode="edit"
            />
        </div>
    );
};

export default Users;
