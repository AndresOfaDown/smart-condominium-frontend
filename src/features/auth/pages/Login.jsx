import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card } from '../../../shared/components/ui';
import { Lock, Mail } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const result = await login(credentials);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setError(result.error || 'Error al iniciar sesión');
        }

        setIsLoading(false);
    };

    return (
        <div className="login-page">
            <div className="login-background">
                <div className="login-gradient"></div>
                <div className="login-grid"></div>
            </div>

            <div className="login-container">
                <Card className="login-card">
                    <div className="login-header">
                        <div className="login-logo">
                            <div className="logo-icon">🏢</div>
                        </div>
                        <h1 className="login-title">Smart Condominium</h1>
                        <p className="login-subtitle">Sistema de Gestión Inteligente</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {error && (
                            <div className="login-error">
                                {error}
                            </div>
                        )}

                        <Input
                            type="text"
                            label="Usuario"
                            placeholder="Ingrese su usuario"
                            icon={<Mail size={18} />}
                            value={credentials.username}
                            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                            required
                        />

                        <Input
                            type="password"
                            label="Contraseña"
                            placeholder="Ingrese su contraseña"
                            icon={<Lock size={18} />}
                            value={credentials.password}
                            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            isLoading={isLoading}
                            className="login-button"
                        >
                            Iniciar Sesión
                        </Button>
                    </form>

                    <div className="login-footer">
                        <p className="login-hint">
                            💡 Usa cualquier usuario y contraseña para acceder (demo)
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
