"use client"

import React, { useState } from 'react';
import { Button, Form, Input, Typography, message, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';


const { Title, Text } = Typography;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      message.success('Login successful!');
      setLoading(false);
      window.location.href = '/dashboard'; 
    }, 1500);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-blue-600">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/80 to-purple-600/90 z-10" />
        <Image
          src="/api/placeholder/1200/800"
          alt="Login Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20 p-12">
          <div className="max-w-md space-y-6">
            <Title level={1} className="text-white font-bold text-4xl">
              Welcome Back!
            </Title>
            <Text className="text-white text-lg block">
              Log in to access your account and continue your journey with us.
            </Text>
            <div className="flex items-center space-x-2 mt-8">
              <div className="h-2 w-2 rounded-full bg-white"></div>
              <div className="h-2 w-2 rounded-full bg-white/50"></div>
              <div className="h-2 w-2 rounded-full bg-white/50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Title level={2} className="font-bold">Sign In</Title>
            <Text className="text-gray-500">Enter your credentials to access your account</Text>
          </div>

          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            layout="vertical"
            className="mt-8"
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'Please enter a valid email!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined className="text-gray-400" />} 
                placeholder="Email" 
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="Password"
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 h-12 rounded-lg"
                loading={loading}
              >
                Sign In
              </Button>
            </Form.Item>

            <div className="text-center mt-6">
              <Text className="text-gray-600">
                Don&apos;t have an account?{' '}
                <Link href="/registrasi" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign up
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
