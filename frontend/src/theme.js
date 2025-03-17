// WasteWise theme system - centralized styling variables
const theme = {
  colors: {
    primary: '#4caf50', // Green - main brand color
    secondary: '#2e7d32', // Darker green for accents
    accent: '#81c784', // Light green for highlights
    warning: '#ff9800', // Orange for warnings
    error: '#f44336', // Red for errors
    success: '#66bb6a', // Green success messages
    background: {
      light: '#f8f9fa',
      dark: '#212121'
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
      light: '#ffffff'
    }
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      md: '1rem',
      lg: '1.25rem',
      xl: '1.5rem',
      xxl: '2rem'
    },
    fontWeight: {
      light: 300,
      regular: 400,
      medium: 500,
      bold: 700
    }
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    xxl: '3rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    circle: '50%'
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12)',
    md: '0 4px 6px rgba(0,0,0,0.1)',
    lg: '0 10px 15px rgba(0,0,0,0.07)'
  },
  breakpoints: {
    xs: '0px',
    sm: '600px',
    md: '960px',
    lg: '1280px',
    xl: '1920px'
  },
  transitions: {
    default: 'all 0.3s ease',
    fast: 'all 0.15s ease',
    slow: 'all 0.5s ease'
  }
};

export default theme;
