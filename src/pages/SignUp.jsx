import { Box, Button, Paper, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import { registerWithEmailAndPassword } from '../components/firebase/firebase'
import { useNavigate } from 'react-router-dom'
import { SnackbarToast } from '../components/ui/StyledComponents'

const SignUp = () => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [open, setOpen] = useState(false)
    const [message, setMessage] = useState("")

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
        // console.log(userData)
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {
            const register = await registerWithEmailAndPassword(userData.username, userData.email, userData.password)
            if (register) {
                setMessage("Registration successful!")
                setOpen(true)
                setTimeout(() => {
                    navigate('/');
                }, 500);
            }
        } catch (error) {
            console.log("error in signup form submtting : ", error)
            setMessage("Registration failed : " + error.message)
        }
    }

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
                <h2 className='text-2xl md:text-4xl lg:text-5xl font-bold'>Sign up</h2>

                <Box
                    component='form'
                    onSubmit={handleSignUp}
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
                        label='Username'
                        name='username'
                        type='text'
                        className='w-full lg:w-[60%]'
                        value={userData.username}
                        onChange={handleChange}
                    />
                    <TextField
                        label='Email'
                        name='email'
                        className='w-full lg:w-[60%]'
                        type='text'
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        name='password'
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
                        Sign up
                    </Button>
                </Box>
            </Paper>
            <SnackbarToast
                open={open}
                handleClose={handleClose}
                message={message}
            />
        </div>
    )
}

export default SignUp