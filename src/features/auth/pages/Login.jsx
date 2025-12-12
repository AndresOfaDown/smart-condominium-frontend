import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Button, Input, Card } from '../../../shared/components/ui';
import { Lock, Mail } from 'lucide-react';
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const result = await login(credentials);

            if (result.success) {
                navigate('/dashboard');
            } else {
                setError(result.error || 'Error al iniciar sesión');
            }
        } catch (err) {
            setError('Error al conectar con el servidor');
        } finally {
            setIsLoading(false);
        }
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
                            type="email"
                            label="Email"
                            placeholder="tu@email.com"
                            icon={<Mail size={18} />}
                            value={credentials.email}
                            onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
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
                            {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </Button>
                    </form>

                    <div className="login-footer">
                        <p className="login-hint">
                            💡 Usa tu email y contraseña del sistema
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Login;
