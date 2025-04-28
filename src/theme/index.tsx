'use client';

import {
  createTheme,
  ThemeProvider as MUIThemePRovider,
  PaletteOptions,
  responsiveFontSizes,
} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme } from './type';
import { useThemeCtx } from './ThemeContext';

type Props = {
  children: React.ReactNode;
};
const getPalette: (mode: Theme) => PaletteOptions = (mode) => {
  {
    if (mode === 'light') {
      return {
        grey: {
          '50': '#a7a4a4',
          '100': '#f5f5f5',
          '200': '#eeeeee',
          '300': '#e0e0e0',
          '400': '#bdbdbd',
          '500': '#9e9e9e',
          '600': '#757575',
          '700': '#616161',
          '800': '#424242',
          '900': '#212121',
          A100: '#f5f5f5',
          A200: '#eeeeee',
          A400: '#bdbdbd',
          A700: '#616161',
        },

        primary: {
          main: '#651a80',
          light: '#a63b8f',
          dark: '#651a80',
        },
        secondary: {
          main: '#ff89eb',
          light: '#bb67ae',
          dark: '#ff6efa',
        },
        error: {
          main: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828',
        },
        warning: {
          main: '#ed6c02',
          light: '#ff9800',
          dark: '#e65100',
        },
        info: {
          main: '#0288d1',
          light: '#03a9f4',
          dark: '#01579b',
        },
        success: {
          main: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
        },
        background: {
          default: '#eeedf357',
          paper: '#eeedf3',
        },

        text: {
          primary: '#111',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.5)',
        },
        tonalOffset: 0.2,
        divider: 'rgba(255, 255, 255, 0.12)',
        action: {
          active: 'rgba(255, 255, 255, 0.7)',
          hover: 'rgba(255, 255, 255, 0.08)',
          selected: 'rgba(255, 255, 255, 0.16)',
          disabled: 'rgba(255, 255, 255, 0.3)',
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
          focus: 'rgba(0, 0, 0, 0.12)',
        },
      };
    } else {
      return {
        primary: {
          main: '#863da0',
          light: '#ab79bb',
          dark: '#651a80',
        },
        secondary: {
          main: '#c0afee',
          light: '#dac1f2',
          dark: '#c0afee',
        },
        error: {
          main: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828',
        },
        warning: {
          main: '#ed6c02',
          light: '#ff9800',
          dark: '#e65100',
        },
        info: {
          main: '#0288d1',
          light: '#03a9f4',
          dark: '#01579b',
        },
        success: {
          main: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
        },
        background: {
          default: '#121212f0',
          paper: '#1e1e1e',
        },
        text: {
          primary: '#ffffff',
          secondary: 'rgba(255, 255, 255, 0.7)',
          disabled: 'rgba(255, 255, 255, 0.5)',
        },
        divider: 'rgba(255, 255, 255, 0.12)',
        action: {
          active: 'rgba(255, 255, 255, 0.7)',
          hover: 'rgba(255, 255, 255, 0.08)',
          selected: 'rgba(255, 255, 255, 0.16)',
          disabled: 'rgba(255, 255, 255, 0.3)',
          disabledBackground: 'rgba(255, 255, 255, 0.12)',
          focus: 'rgba(0, 0, 0, 0.12)',
        },
      };
    }
  }
};

const getTheme = (mode: Theme) => {
  const resolvedMode =
    mode === 'system'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      : mode;

  console.log('Resolved theme mode:', resolvedMode); // Debugging
  console.log('Current theme mode:', mode); // Debugging

  let theme = createTheme({
    palette: {
      mode: resolvedMode as 'light' | 'dark',
      ...getPalette(mode),
    },
    typography: {
      fontFamily: 'sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '3rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 600,
        fontSize: '2.5rem',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 500,
        fontSize: '2rem',
        lineHeight: 1.4,
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.75rem',
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1.2rem',
        lineHeight: 1.6,
      },
      body2: {
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      caption: {
        fontSize: '0.875rem',
        lineHeight: 1.4,
        color: 'rgba(0, 0, 0, 0.6)',
      },
      button: {
        textTransform: 'capitalize',

        fontSize: '1rem',
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1536,
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: 'contained',
          color: 'primary',
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 8,
            paddingBottom: 8,
          },
        },
      },
      MuiCard: {
        defaultProps: {
          variant: 'outlined',
        },
        styleOverrides: {
          root: {
            padding: 16,
          },
        },
      },
    },
    shape: {
      borderRadius: 8,
    },
    transitions: {
      duration: {
        standard: 250,
      },
    },
    spacing: 6,
  });

  theme = responsiveFontSizes(theme);

  return theme;
};

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const { theme: themeToggle } = useThemeCtx();
  const theme = getTheme(themeToggle!);

  return (
    <MUIThemePRovider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemePRovider>
  );
};

export default ThemeProvider;
