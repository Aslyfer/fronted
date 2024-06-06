import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { Outlet } from 'react-router-dom';

const ProtectedRoute = ({ admin }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth);
    
    if (loading) return null;

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (admin === true && user.role !=="admin") {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
