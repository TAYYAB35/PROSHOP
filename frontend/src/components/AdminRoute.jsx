import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRouter = () => {

    const { userInfo } = useSelector((state) => state.auth)

    return (
        <div>
            {userInfo && userInfo.isAdmin ? <Outlet /> :
                <Navigate to="/login" replace />}
        </div>
    )
}

export default AdminRouter