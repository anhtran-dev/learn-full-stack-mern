import React from 'react';
import {Button, Form, Input} from 'antd';
import {Link} from "react-router-dom";

const RegisterForm = (props) => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <Form
                name="basic"
                initialValues={{remember: true}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    name="email"
                    placeholder='Email'
                    rules={[{required: true, message: 'Please input your username!'}]}
                >
                    <Input/>
                </Form.Item>

                <Form.Item
                    name="password"
                    placeholder='Password'
                    rules={[{required: true, message: 'Please input your password!'}]}
                >
                    <Input.Password/>
                </Form.Item>
                <Form.Item
                    name="confirm-password"
                    placeholder='Confirm password'
                    rules={[{required: true, message: 'Please input confirm password!'}]}
                >
                    <Input.Password/>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            <div>
                <p>Already have an account? <Link to="/login"><Button size='small' type='info' className='mf-10'>Login</Button></Link></p>
            </div>
        </>
    );
}

export default RegisterForm;
