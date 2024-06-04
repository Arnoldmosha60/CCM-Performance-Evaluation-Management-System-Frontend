import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = () => {
    const token = localStorage.getItem("refresh_token");
    return (
      token?
      <Outlet/>
      :
      <Navigate to="/auth/sign-in"/>
    )
  }

export default RequireAuth