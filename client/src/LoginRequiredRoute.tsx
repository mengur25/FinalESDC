// LoginRequiredRoute.tsx

import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAppSelector } from './State/Store'; 

const LoginRequiredRoute = () => {
    const { jwt } = useAppSelector((state: any) => state.auth);
    const location = useLocation();
    
    const accessToken = jwt || localStorage.getItem("jwt");
    const isLoggedIn = !!accessToken; 

    useEffect(() => {
        if (!isLoggedIn) {
            toast.error('You need to login to access this page!', { duration: 3000 });
        }
    }, [isLoggedIn]);

    if (!isLoggedIn) {
        return <Navigate to="/" state={{ from: location }} replace />; 
    }

    return <Outlet />;
};

export default LoginRequiredRoute;