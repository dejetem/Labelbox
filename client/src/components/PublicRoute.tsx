import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

interface Props {
    children: React.ReactNode;
}

const PublicRoute: React.FC<Props> = ({ children }) => {
    if (isAuthenticated()) {
        return <Navigate to="/projects" />;
    }

    return <>{children}</>;
};

export default PublicRoute;