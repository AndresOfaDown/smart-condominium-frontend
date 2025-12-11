import './Card.css';

const Card = ({
    children,
    className = '',
    hover = true,
    onClick,
    ...props
}) => {
    const classes = `card ${hover ? 'card-hover' : ''} ${className}`.trim();

    return (
        <div className={classes} onClick={onClick} {...props}>
            {children}
        </div>
    );
};

export default Card;
