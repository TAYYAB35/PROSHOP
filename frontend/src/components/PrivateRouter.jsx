import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRouter = () => {

    const {userInfo} = useSelector((state) => state.auth)
    
    return (
        <div>
            {userInfo ? <Outlet /> :
                <Navigate to="/login" replace />}
        </div>
    )
}

export default PrivateRouter