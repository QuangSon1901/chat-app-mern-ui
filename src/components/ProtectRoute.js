import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectRoute = () => {
    const { authenticate } = useSelector((state) => state.auth);

    return authenticate ? <Outlet /> : <Navigate to="/messenger/login" />;
};

export default ProtectRoute;
