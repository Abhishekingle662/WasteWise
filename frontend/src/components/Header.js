import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import theme from '../theme';
// Remove the problematic import
// import logoImage from '../assets/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const navLinks = [
    { path: '/', label: 'Home', icon: 'fa-home' },
    { path: '/services', label: 'Find Services', icon: 'fa-search-location' },
    { path: '/guide', label: 'Sorting Guide', icon: 'fa-trash-alt' },
    { path: '/rewards', label: 'Rewards', icon: 'fa-medal' },
    { path: '/impact', label: 'Impact', icon: 'fa-leaf' },
    { path: '/dashboard', label: 'Dashboard', icon: 'fa-tachometer-alt' },
  ];

  const headerStyles = {
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.95)' : 'transparent',
    boxShadow: scrolled ? theme.shadows.sm : 'none',
    transition: 'all 0.3s ease',
    backdropFilter: scrolled ? 'blur(8px)' : 'none',
  };

  const navStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: `${theme.spacing.md} ${theme.spacing.lg}`,
    maxWidth: '1200px',
    margin: '0 auto',
  };

  const logoStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.sm,
    textDecoration: 'none',
  };

  const logoTextStyles = {
    fontSize: theme.typography.fontSize.lg,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.primary,
  };

  const navLinksStyles = {
    display: 'flex',
    gap: theme.spacing.lg,
    '@media (max-width: 768px)': {
      display: menuOpen ? 'flex' : 'none',
      flexDirection: 'column',
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: 'white',
      padding: theme.spacing.md,
      boxShadow: theme.shadows.md,
      zIndex: 100,
    }
  };

  const navLinkStyles = (isActive) => ({
    color: isActive ? theme.colors.primary : theme.colors.text.primary,
    textDecoration: 'none',
    fontSize: theme.typography.fontSize.md,
    fontWeight: isActive ? theme.typography.fontWeight.medium : theme.typography.fontWeight.regular,
    transition: theme.transitions.default,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.borderRadius.sm,
    '&:hover': {
      color: theme.colors.primary,
      backgroundColor: 'rgba(76, 175, 80, 0.08)',
    },
  });

  const iconStyles = {
    marginRight: theme.spacing.xs,
    fontSize: '1rem'
  };

  const hamburgerStyles = {
    display: 'none',
    '@media (max-width: 768px)': {
      display: 'block',
      fontSize: '1.5rem',
      background: 'none',
      border: 'none',
      color: theme.colors.primary,
      cursor: 'pointer',
    }
  };

  const logoIconStyles = {
    color: theme.colors.primary,
    fontSize: '1.75rem',
    marginRight: theme.spacing.xs
  };

  return (
    <header style={headerStyles} className={scrolled ? 'header-scrolled' : ''}>
      <nav style={navStyles}>
        <Link to="/" style={logoStyles}>
          {/* Replace the img tag with a Font Awesome icon */}
          <i className="fas fa-recycle" style={logoIconStyles} aria-hidden="true"></i>
          <span style={logoTextStyles}>WasteWise</span>
        </Link>
        
        <button className="hamburger" style={hamburgerStyles} onClick={toggleMenu} aria-label="Menu">
          {menuOpen ? <i className="fas fa-times"></i> : <i className="fas fa-bars"></i>}
        </button>
        
        <div className={`nav-links ${menuOpen ? 'open' : ''}`} style={navLinksStyles}>
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={navLinkStyles(location.pathname === link.path)}
              className={location.pathname === link.path ? 'active' : ''}
            >
              <i className={`fas ${link.icon}`} style={iconStyles} aria-hidden="true"></i>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
