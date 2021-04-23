import React, {useContext, useState} from 'react';
import {Button, Form, Input, notification} from 'antd';
import {Link, useHistory} from "react-router-dom";
import {AuthContext} from "../../contexts/AuthContext";

const LoginForm = (props) => {
    // Context
    const {loginUser} = useContext(AuthContext);
    // Router
    const history = useHistory();
    // Local state
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: ''
    });
    const {email, password} = loginForm;
    const onChangeLoginForm = event => {
        setLoginForm({ ...loginForm, [event.target.name]: event.target.value})
    };

    const login = async e => {
        try{
            const loginData = await loginUser(loginForm);
            if (loginData.success === false){
                notification.warning({
                    description: loginData.message
                });
                return false;
            }
            history.push('/home')
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Form
                name = 'basic'
                className='form-auth'
                initialValues={{remember: true}}
                onFinish={login}
            >
                <Form.Item
                    name="email"
                    rules={[{required: true, message: 'Please input your email!'}]}
                >
                    <Input name="email"
                           placeholder='Email'
                           value={email}
                           onChange={onChangeLoginForm}
                    />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password
                        name="password"
                        placeholder='Password'
                        value={password}
                        onChange={onChangeLoginForm}
                    />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div>
                <p>Don't have an account? <Link to="/register"><Button className='mf-10' size='small' type='info'>Register</Button></Link></p>
            </div>
        </>
    );
}

export default LoginForm;
