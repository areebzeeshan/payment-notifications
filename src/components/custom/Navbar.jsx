import React, { useState } from 'react'
import Logo from '../../assets/logo.svg'
import { IconButton } from '@mui/material'
import { Logout as LogoutIcon } from '@mui/icons-material'
import { logout } from '../firebase/firebase'
import { SnackbarToast } from '../ui/StyledComponents'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

    const [message, setMessage] = useState(false)
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

    const logoutHandler = () => {
        try {
            const res = logout()
            if (res) {
                setMessage("Logged Out successfully");
                setOpen(true);
                localStorage.removeItem('user')

                setTimeout(() => {
                    navigate('/');
                }, 2000);
            } else {
                setMessage("User not logged")
                setOpen(true);
            }
        } catch (error) {
            console.log("error logging out : ", error)
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div className='p-4 shadow-md flex justify-between'>
            <div>
                <img src={Logo} alt="logo" loading='lazy' />
            </div>
            <IconButton onClick={logoutHandler}>
                <LogoutIcon />
            </IconButton>

            <SnackbarToast
                open={open}
                handleClose={handleClose}
                message={message}
            />
        </div>
    )
}

export default Navbar