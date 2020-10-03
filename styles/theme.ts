import { createMuiTheme, Theme, responsiveFontSizes } from '@material-ui/core'

const theme = responsiveFontSizes(
  createMuiTheme({
    typography: {
      fontFamily: "'IBM Plex Sans', sans-serif",
      h1: {
        fontSize: '2.8125rem',
        fontWeight: 600,
        lineHeight: 1.267,
      },
      h2: {
        fontSize: '2.25rem',
        fontWeight: 600,
        lineHeight: 1.267,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 600,
        lineHeight: 1.321,
      },
      h4: {
        fontSize: '1.375rem',
        fontWeight: 600,
        lineHeight: 1.364,
      },
      h5: {
        fontSize: '1.225rem',
        fontWeight: 600,
        lineHeight: 1.389,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
        lineHeight: 1.3125,
      },
      subtitle1: {
        fontSize: '1.2rem',
        lineHeight: 1.5,
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5625,
      },
      body2: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.429,
      },
      caption: {
        fontSize: '0.8125rem',
        lineHeight: 1.308,
      },
      button: {
        textTransform: 'none',
      },
    },
    palette: {
      primary: {
        main: '#5884A3',
      },
      secondary: {
        main: '#EEB238',
      },
      text: {
        primary: '#00242C',
      },
    },
    overrides: {
      MuiAppBar: {
        root: {
          height: 70,
        },
      },
      MuiBadge: {
        dot: {
          borderRadius: 5,
          height: 10,
          minWidth: 10,
          padding: 'unset',
        },
      },
      MuiButton: {
        root: {
          borderRadius: 30,
          fontWeight: 500,
          textTransform: 'none',
        },
        contained: {
          minWidth: 107,
          height: 40,
        },
        containedPrimary: {
          color: '#FFFFFF',
        },
        text: {
          padding: '6px, 12px',
        },
      },
      MuiDialogActions: {
        root: {
          padding: '8px 0px',
        },
      },
      MuiFormHelperText: {
        root: {
          display: 'flex',
          alignItems: 'center',
          marginTop: 0,
          fontSize: '0.675rem',
        },
        contained: {
          height: 18,
          marginLeft: 0,
          marginRight: 0,
          paddingLeft: 14,
          paddingRight: 14,
        },
      },
      MuiLink: {
        root: {
          cursor: 'pointer',
        },
        underlineHover: {
          '&:hover': {
            textDecoration: 'none',
          },
        },
      },
      MuiOutlinedInput: {
        input: {
          padding: '12px 14px',
        },
      },
      MuiToolbar: {
        root: {
          height: 80,
        },
      },
      MuiTooltip: {
        tooltip: {
          backgroundColor: '#475c66',
          fontSize: '0.8125rem',
        },
        arrow: {
          color: '#475c66',
        },
      },
    },
  })
)

theme.shadows = ([] as unknown) as Theme['shadows']

export default theme
