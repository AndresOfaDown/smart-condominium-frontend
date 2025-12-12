import { useState, useEffect } from 'react';
import Modal from '../../../shared/components/ui/Modal';
import { userService } from '../services';
import './UserModal.css';

const UserModal = ({ isOpen, onClose, onSuccess, user = null, mode = 'create' }) => {
    const isEditMode = mode === 'edit' && user;

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
        first_name: '',
        last_name: '',
        rol: 'RESIDENTE',
        telefono: ''
    });

    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    // Update form data when user prop changes
    useEffect(() => {
        if (user && isEditMode) {
            setFormData({
                username: user.username || '',
                email: user.email || '',
                password: '',
                password2: '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                rol: user.rol || 'RESIDENTE',
                telefono: user.telefono || ''
            });
        } else {
            // Reset form for create mode
            setFormData({
                username: '',
                email: '',
                password: '',
                password2: '',
                first_name: '',
                last_name: '',
                rol: 'RESIDENTE',
                telefono: ''
            });
        }
        setErrors({});
    }, [user, isEditMode, isOpen]);

    const roles = [
        { value: 'ADMIN', label: 'Administrador' },
        { value: 'RESIDENTE', label: 'Residente' },
        { value: 'SEGURIDAD', label: 'Seguridad' },
        { value: 'MANTENIMIENTO', label: 'Mantenimiento' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'El username es requerido';
        } else if (formData.username.length < 3) {
            newErrors.username = 'El username debe tener al menos 3 caracteres';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!isEditMode) {
            if (!formData.password) {
                newErrors.password = 'La contraseña es requerida';
            } else if (formData.password.length < 8) {
                newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
            }

            if (!formData.password2) {
                newErrors.password2 = 'Confirma la contraseña';
            } else if (formData.password !== formData.password2) {
                newErrors.password2 = 'Las contraseñas no coinciden';
            }
        }

        if (!formData.rol) {
            newErrors.rol = 'El rol es requerido';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            return;
        }

        setIsLoading(true);

        try {
            if (isEditMode) {
                // Edit mode - only send fields that can be updated
                const updateData = {
                    email: formData.email,
                    first_name: formData.first_name,
                    last_name: formData.last_name,
                    telefono: formData.telefono
                };

                await userService.updateUser(user.id, updateData);

                // If role changed, update it separately
                if (formData.rol !== user.rol) {
                    await userService.changeUserRole(user.id, formData.rol);
                }
            } else {
                // Create mode
                await userService.createUser(formData);
            }

            onSuccess();
            onClose();
            resetForm();
        } catch (error) {
            console.error('Error saving user:', error);
            const apiErrors = error.response?.data;
            if (apiErrors) {
                setErrors(apiErrors);
            } else {
                setErrors({ general: 'Error al guardar el usuario' });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            username: '',
            email: '',
            password: '',
            password2: '',
            first_name: '',
            last_name: '',
            rol: 'RESIDENTE',
            telefono: ''
        });
        setErrors({});
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleClose}
            title={isEditMode ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
            size="md"
        >
            <form onSubmit={handleSubmit} className="user-form">
                {errors.general && (
                    <div className="form-error-general">
                        {errors.general}
                    </div>
                )}

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="username">
                            Username <span className="required">*</span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            disabled={isEditMode}
                            className={errors.username ? 'error' : ''}
                        />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">
                            Email <span className="required">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={errors.email ? 'error' : ''}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                </div>

                {!isEditMode && (
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="password">
                                Contraseña <span className="required">*</span>
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={errors.password ? 'error' : ''}
                            />
                            {errors.password && <span className="error-message">{errors.password}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="password2">
                                Confirmar Contraseña <span className="required">*</span>
                            </label>
                            <input
                                type="password"
                                id="password2"
                                name="password2"
                                value={formData.password2}
                                onChange={handleChange}
                                className={errors.password2 ? 'error' : ''}
                            />
                            {errors.password2 && <span className="error-message">{errors.password2}</span>}
                        </div>
                    </div>
                )}

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="first_name">Nombre</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="last_name">Apellido</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="rol">
                            Rol <span className="required">*</span>
                        </label>
                        <select
                            id="rol"
                            name="rol"
                            value={formData.rol}
                            onChange={handleChange}
                            className={errors.rol ? 'error' : ''}
                        >
                            {roles.map(role => (
                                <option key={role.value} value={role.value}>
                                    {role.label}
                                </option>
                            ))}
                        </select>
                        {errors.rol && <span className="error-message">{errors.rol}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="telefono">Teléfono</label>
                        <input
                            type="tel"
                            id="telefono"
                            name="telefono"
                            value={formData.telefono}
                            onChange={handleChange}
                            placeholder="+593987654321"
                        />
                    </div>
                </div>

                <div className="form-actions">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="btn-secondary"
                        disabled={isLoading}
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        className="btn-primary"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Guardando...' : (isEditMode ? 'Guardar Cambios' : 'Crear Usuario')}
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default UserModal;
