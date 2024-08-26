import React from 'react'
import Logo from '../../assets/logo.svg'
import { IconButton } from '@mui/material'
import { Logout as LogoutIcon } from '@mui/icons-material'

const Navbar = () => {
    return (
        <div className='p-4 shadow-md flex justify-between'>
            <div>
                <img src={Logo} alt="logo" loading='lazy' />
            </div>
            <IconButton>
                <LogoutIcon />
            </IconButton>
        </div>
    )
}

export default Navbar