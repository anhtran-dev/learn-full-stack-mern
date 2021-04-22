import React from 'react';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import './Auth'

const Auth = (props) => {
    const {authRoute} = props;
    const body = (
        <>
            {
                authRoute === 'login' ? <LoginForm /> : <RegisterForm />
            }
        </>
    );
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
