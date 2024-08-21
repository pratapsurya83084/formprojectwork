// ProtectedRoute.js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { auth } = useAuth();

    return (
        <Route
            {...rest}
            render={(props) =>
                auth ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/admin" />
                )
            }
        />
    );
};

export default ProtectedRoute;
