import { Button, Paper, Snackbar, TextField } from '@mui/material'
import React, { useState } from 'react'
import { registerWithEmailAndPassword } from '../components/firebase/firebase'
import { useNavigate } from 'react-router-dom'

const SignUp = () => {

    const navigate = useNavigate()
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: '',
    })
    const [message, setMessage] = useState("")
    const [open, setOpen] = useState(false)

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleClose = () => setOpen(false)

    const handleSignUp = async () => {
        try {
            await registerWithEmailAndPassword(userData.username, userData.email, userData.password)
            setMessage("Registration successful!")
            setOpen(true)
            navigate('/sign-in')
        } catch (error) {
            console.log("error in signup form submtting : ", error)
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
                    onClick={handleSignUp}
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
            </Paper>
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
                message={message}
            />
        </div>
    )
}

export default SignUp