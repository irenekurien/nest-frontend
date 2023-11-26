import { AppProps } from 'next/app';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from '../styles/theme';
import '../styles/globals.css';
import { AuthProvider } from 'context';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ThemeProvider>
    );
};

export default MyApp;
