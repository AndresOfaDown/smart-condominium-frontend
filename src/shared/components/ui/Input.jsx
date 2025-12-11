import { forwardRef } from 'react';
import './Input.css';

const Input = forwardRef(({
    label,
    error,
    icon,
    className = '',
    ...props
}, ref) => {
    return (
        <div className={`input-wrapper ${className}`}>
            {label && <label className="input-label">{label}</label>}
            <div className="input-container">
                {icon && <span className="input-icon">{icon}</span>}
                <input
                    ref={ref}
                    className={`input ${icon ? 'input-with-icon' : ''} ${error ? 'input-error' : ''}`}
                    {...props}
                />
            </div>
            {error && <span className="input-error-message">{error}</span>}
        </div>
    );
});

Input.displayName = 'Input';

export default Input;
