import React, {useContext} from 'react';
import {Redirect, Route} from 'react-router-dom';
import {AuthContext} from "../contexts/AuthContext";
import {Spin} from 'antd';

const ProtectedRoute = (props) => {
    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext);
    const {component: Component, ...rest} = props;
    if (authLoading) {return (
        <div>
            <Spin/>
        </div>
    )};
    return (
        <Route {...rest} render={props =>
            isAuthenticated ? (
                <>
                    <Component {...rest} {...props} />
                </>
            ) : (
                <Redirect to='/login'/>
            )
        }
        />
    );
};

export default ProtectedRoute;
