import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({ user, children, redirect = "/sign-in" }) => {
    if (!user) return <Navigate to={redirect} />

    return children
}

export default ProtectedRoutes