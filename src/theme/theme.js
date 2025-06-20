import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#9a7b68',
            contrastText: '#f9f7f6',
        },
        secondary: {
            main: '#afc2a4',
        },
        background: {
            default: '#f9f7f6',
            paper: '#f9f7f6',
        },
        text: {
            primary: '#2F3E46',
        },
        accent: {
            main: '#8ab18b',
        },
        cardBg: {
            main: '#e3eadd',
        },
        rowBg: {
            main: '#8ab18b',
        },
        softCardBg: {
            main: '#fcefe7',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: 'Roboto, Arial',
    },
});

export default theme;