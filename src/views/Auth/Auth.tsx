import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Input, Button } from 'components';
import { authUser } from 'api';
import { useAuth } from 'context';

type FormDataType = {
    name?: string;
    email: string;
    password: string;
};

export default function SignIn() {
    const [formData, setFormData] = useState<FormDataType>({
        email: '',
        password: '',
    });
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [error, setError] = useState<null | string>(null);
    const { setSessionData } = useAuth();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleClick = async (event: React.FormEvent) => {
        event.preventDefault();

        const { data, error:e } = await authUser(formData, isSignUp);

        localStorage.setItem('token', data.token);

        setSessionData(data);
        router.push('/dashboard');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                </Typography>
                <Box component="form" onSubmit={handleClick} noValidate sx={{ mt: 1 }}>
                    {isSignUp ? (
                        <Input
                            label="Name"
                            type="name"
                            value={formData?.name || ''}
                            onChange={handleChange}
                            helperText={error}
                        />
                    ) : (
                        ''
                    )}
                    <Input
                        label="Email Address"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        helperText={error}
                    />
                    <Input
                        label="Password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        helperText={error}
                    />
                    <Button fullWidth onClick={(event) => handleClick(event)}>
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="#" variant="body2" onClick={() => setIsSignUp(!isSignUp)}>
                                {isSignUp
                                    ? 'Already a user? Sign In'
                                    : "Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}
