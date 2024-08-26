import React from 'react'
import Navbar from '../custom/Navbar'
import Footer from '../custom/Footer'

const Layout = ({ children }) => {
    return (
        <div className='flex flex-col h-screen justify-between'>
            <div>
                <Navbar />
                <div className='w-11/12 p-7 mx-auto'>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout