import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../theme';

const Card = ({ 
  children, 
  elevation = 'sm', 
  className = '', 
  onClick,
  hover = true,
  padding = 'md'
}) => {
  const getShadow = () => {
    switch(elevation) {
      case 'lg': return theme.shadows.lg;
      case 'md': return theme.shadows.md;
      case 'sm':
      default: return theme.shadows.sm;
    }
  };

  const getPadding = () => {
    switch(padding) {
      case 'sm': return theme.spacing.sm;
      case 'lg': return theme.spacing.lg;
      case 'xl': return theme.spacing.xl;
      case 'none': return '0';
      case 'md':
      default: return theme.spacing.md;
    }
  };

  const cardStyles = {
    background: 'white',
    borderRadius: theme.borderRadius.md,
    padding: getPadding(),
    boxShadow: getShadow(),
    transition: theme.transitions.default,
    cursor: onClick ? 'pointer' : 'default'
  };

  const hoverStyles = hover ? {
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: elevation === 'lg' ? theme.shadows.lg : theme.shadows.md
    }
  } : {};

  return (
    <div 
      className={`card ${className}`}
      style={{ ...cardStyles, ...hoverStyles }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  elevation: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  hover: PropTypes.bool,
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl'])
};

export default Card;
