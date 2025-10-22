import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function Private_Route() {
    const { existingUser } = useSelector((state) => state.user);

    return existingUser ? <Outlet/> : <Navigate to={'/login'}/>
}
