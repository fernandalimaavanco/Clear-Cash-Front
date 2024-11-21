import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from '../../contexts/AuthContext';

interface PrivateRouteProps {
    children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps): JSX.Element {

    const isAuthenticated = useContextSelector(AuthContext, (context) => {
        return context.isAuthenticated
    })

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
