import '@fontsource/red-hat-display/400.css'
import '@fontsource/red-hat-display/500.css'
import '@fontsource/red-hat-display/700.css'
import '@fontsource/red-hat-display/900.css'

// Copy my components from my site
export default {
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  fonts: {
    body: 'Red Hat Display, system-ui, sans-serif',
    heading: 'Red Hat Display, system-ui, sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 96],
  fontWeights: {
    body: 400,
    medium: 500,
    heading: 700,
    bold: 700,
    black: 900,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.125,
  },
  colors: {
    text: '#000000',
    background: '#FFFFFF',
    lightBackground: '#1c1c1c',
    primary: '#4444fc',
    secondary: '#5fedbe',
    muted: '#f6f6f6',
  },
  radii: {
    none: 0,
    sm: '.25rem',
    default: '1rem',
    lg: '1.0rem',
    xl: '1.25rem',
    full: '9999px',
  },
  sizes: {
    navbar: '72px',
    pagePadding: 4,
  },
  buttons: {
    primary: {
      p: 3,
      fontWeight: 'bold',
      color: 'white',
      bg: 'primary',
      cursor: 'pointer',
      fontFamily: 'body',
      '&:hover': {
        filter: 'brightness(0.9)',
      },
      borderRadius: 'default',
    },
    secondary: {
      p: 3,
      fontWeight: 'bold',
      color: 'black',
      bg: 'secondary',
      cursor: 'pointer',
      fontFamily: 'body',
      '&:hover': {
        filter: 'brightness(0.9)',
      },
      borderRadius: 'default',
    },
    disabled: {
      p: 3,
      fontWeight: 'bold',
      color: 'white',
      bg: '#EA526F50',
      borderRadius: 'lg',
    },
  },
  styles: {
    root: {
      fontFamily: 'body',
      fontWeight: 'body',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
    h1: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: [5, null, 6],
    },
    h2: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: [4, null, 5],
    },
    h3: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: [3, null, 4],
    },
    h4: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: [2, null, 3],
    },
    h5: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: [1, null, 2],
    },
    h6: {
      color: 'text',
      fontFamily: 'heading',
      lineHeight: 'heading',
      fontWeight: 'heading',
      fontSize: [0, null, 1],
    },
    p: {
      color: 'text',
      fontFamily: 'body',
      fontWeight: 'body',
      lineHeight: 'body',
    },
    a: {
      color: 'primary',
    },
    pre: {
      fontFamily: 'monospace',
      overflowX: 'auto',
      code: {
        color: 'inherit',
      },
    },
    code: {
      fontFamily: 'monospace',
      fontSize: 'inherit',
    },
    table: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 0,
    },
    th: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    td: {
      textAlign: 'left',
      borderBottomStyle: 'solid',
    },
    img: {
      maxWidth: '100%',
    },
  },
}
