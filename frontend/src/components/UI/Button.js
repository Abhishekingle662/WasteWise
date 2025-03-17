import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium',
  fullWidth = false,
  onClick,
  disabled = false,
  type = 'button',
  className = '',
  startIcon,
  endIcon
}) => {
  const getSizeStyles = () => {
    switch(size) {
      case 'small':
        return { padding: '0.5rem 0.75rem', fontSize: theme.typography.fontSize.sm };
      case 'large':
        return { padding: '0.875rem 2rem', fontSize: theme.typography.fontSize.lg };
      case 'medium':
      default:
        return { padding: '0.75rem 1.5rem', fontSize: theme.typography.fontSize.md };
    }
  };

  const getVariantStyles = () => {
    switch(variant) {
      case 'secondary':
        return { 
          backgroundColor: 'transparent',
          color: theme.colors.primary,
          border: `1px solid ${theme.colors.primary}`,
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.1)'
          }
        };
      case 'text':
        return {
          backgroundColor: 'transparent',
          color: theme.colors.primary,
          border: 'none',
          padding: '0.5rem',
          '&:hover': {
            backgroundColor: 'rgba(76, 175, 80, 0.05)'
          }
        };
      case 'primary':
      default:
        return {
          backgroundColor: theme.colors.primary,
          color: theme.colors.text.light,
          border: 'none',
          '&:hover': {
            backgroundColor: theme.colors.secondary
          }
        };
    }
  };

  const buttonStyles = {
    ...getSizeStyles(),
    ...getVariantStyles(),
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    borderRadius: theme.borderRadius.sm,
    fontWeight: theme.typography.fontWeight.medium,
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: theme.transitions.default,
    opacity: disabled ? 0.6 : 1,
    width: fullWidth ? '100%' : 'auto'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${className}`}
      style={buttonStyles}
    >
      {startIcon && <span className="button-icon">{startIcon}</span>}
      {children}
      {endIcon && <span className="button-icon">{endIcon}</span>}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'text']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  fullWidth: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  className: PropTypes.string,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node
};

export default Button;
