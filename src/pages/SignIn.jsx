import { Box, Button, Divider, IconButton, Paper, Snackbar, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Root } from '../components/styles/styles';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../components/firebase/firebase';
import { Close as CloseIcon } from '@mui/icons-material';


const SignIn = () => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    })
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)
    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await loginWithEmailAndPassword(userData.email, userData.password);
            if (response?.token) {
                setMessage("Login successful");
                setOpen(true);
                localStorage.setItem('user', JSON.stringify(response?.user));

                setTimeout(() => {
                    navigate('/payments');
                }, 2000);
            } else {
                setMessage("Login failed: No token received");
                setOpen(true);
            }
        } catch (error) {
            console.log("Error signing in submitting formdata: ", error);
            setMessage("Login failed: " + error.message);
            setOpen(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };




    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div className='h-[100vh] flex justify-center items-center'>
            <Paper elevation={3} sx={{
                padding: '1rem',
                width: '50%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '2rem',
                margin: 'auto',
                borderRadius: '10px',
                backgroundColor: 'white',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
            }}>
                <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold'>Sign In</h2>


                <Box
                    component='form'
                    onSubmit={handleLogin}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: '2rem',
                        width: '100%',
                    }}
                >
                    <TextField
                        name='email'
                        label='Email'
                        type='text'
                        className='w-full lg:w-[60%]'
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        name='password'
                        label='Password'
                        type='password'
                        className='w-full lg:w-[60%]'
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <Button
                        type='submit'
                        variant='contained'
                        className='w-full lg:w-[60%]'
                        sx={{
                            backgroundColor: "#333C4D",
                            "&:hover": {
                                backgroundColor: "#333C4D"
                            }
                        }}
                    >
                        Sign In
                    </Button>

                    <Root sx={{ width: '60%' }}>
                        <Divider>OR</Divider>
                    </Root>

                    <Button
                        variant='contained'
                        className='w-full lg:w-[60%]'
                        sx={{
                            backgroundColor: "#333C4D",
                            "&:hover": {
                                backgroundColor: "#333C4D"
                            }
                        }}
                    >
                        Sign In
                    </Button>
                </Box>

                <Typography>Not already signed in ? <Link to={'/sign-up'}>Sign up</Link></Typography>
            </Paper>

            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={message}
                action={action}
            />
        </div>
    )
}

export default SignIn