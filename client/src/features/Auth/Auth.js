import React from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import './Auth.scss'
import {AuthContext} from "../../contexts/AuthContext";
import {useContext} from 'react';
import {Redirect} from 'react-router-dom';
import { Spin } from 'antd';
const Auth = (props) => {
    const {authRoute} = props;
    const {authState : {authLoading , isAuthenticated }} = useContext(AuthContext);
    let body ;
    if(authLoading) {
        body = (
            <div>
                <Spin />
            </div>
        )
    }else if (isAuthenticated) return <Redirect to='/home' />
    else{
        body = (
            <>
                {
                    authRoute === 'login' ? <LoginForm /> : <RegisterForm />
                }
            </>
        )
    }
    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1>LearnIt</h1>
                    <h4>Keep track of what you learning </h4>
                    {body}
                </div>
            </div>
        </div>
    );
};

export default Auth;
