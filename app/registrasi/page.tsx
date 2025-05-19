'use client';

import React, { useState } from 'react';
import { Button, Form, Input, Typography, Divider, message, Steps } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined, IdcardOutlined, BankOutlined, GithubOutlined, GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const onFinish = (values: any) => {
    setLoading(true);
    // Simulate API request
    setTimeout(() => {
      message.success('Registration successful! Please check your email to verify your account.');
      setLoading(false);
      router.push('/login');
    }, 1500);
  };

  const handleNext = async () => {
    try {
      // Validate current step fields before moving to next step
      if (currentStep === 0) {
        await form.validateFields(['fullName', 'employeeId', 'position']);
      } else if (currentStep === 1) {
        await form.validateFields(['email']);
      }
      setCurrentStep(currentStep + 1);
    } catch (error) {
      // Form validation failed
    }
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: 'Personal Info',
      content: (
        <>
          <Form.Item
            name="fullName"
            rules={[{ required: true, message: 'Please input your full name!' }]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="Full Name"
              className="rounded-lg"
            />
          </Form.Item>
          <Form.Item
            name="employeeId"
            rules={[{ required: true, message: 'Please input your employee ID!' }]}
          >
            <Input
              prefix={<IdcardOutlined className="text-gray-400" />}
              placeholder="Employee ID"
              className="rounded-lg"
            />
          </Form.Item>
          <Form.Item
            name="position"
            rules={[{ required: true, message: 'Please input your position!' }]}
          >
            <Input
              prefix={<BankOutlined className="text-gray-400" />}
              placeholder="Position"
              className="rounded-lg"
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Account Info',
      content: (
        <>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: 'Please input your email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Email"
              className="rounded-lg"
            />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Security',
      content: (
        <>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your password!' },
              { min: 8, message: 'Password must be at least 8 characters!' }
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Password"
              className="rounded-lg"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Confirm Password"
              className="rounded-lg"
            />
          </Form.Item>
        </>
      ),
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Title level={2} className="font-bold">Create an Account</Title>
            <Text className="text-gray-500">Join our platform to get started</Text>
          </div>

          <Steps current={currentStep} className="my-8">
            <Step title="Personal" />
            <Step title="Account" />
            <Step title="Security" />
          </Steps>

            <br/>
            
          <Form
            form={form}
            name="register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            size="large"
            layout="vertical"
            className="mt-8"
          >
            {steps[currentStep].content}

            <div className="flex justify-between mt-6">
              {currentStep > 0 && (
                <Button 
                  onClick={handlePrev}
                  className="h-12 px-6 rounded-lg border-gray-300 hover:border-gray-400"
                >
                  Previous
                </Button>
              )}
              
              {currentStep < steps.length - 1 && (
                <Button 
                  onClick={handleNext}
                  className="h-12 px-6 rounded-lg ml-auto bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next
                </Button>
              )}
              
              {currentStep === steps.length - 1 && (
                <Button
                  type="primary"
                  htmlType="submit"
                  className="h-12 px-6 rounded-lg ml-auto bg-blue-600 hover:bg-blue-700"
                  loading={loading}
                >
                  Register
                </Button>
              )}
            </div>
          </Form>


          <div className="text-center mt-6">
            <Text className="text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                Sign in
              </Link>
            </Text>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-purple-600">
        <div className="absolute inset-0 bg-gradient-to-tl from-purple-600/90 to-blue-500/80 z-10" />
        <Image
          src="/api/placeholder/1200/800"
          alt="Register Background"
          width={1200}
          height={800}
          className="object-cover z-0"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white z-20 p-12">
          <div className="max-w-md space-y-6">
            <Title level={1} className="text-white font-bold text-4xl">
              Join Our Team
            </Title>
            <Paragraph className="text-white text-lg">
              Create an account to access exclusive features and begin your journey with us. Our platform provides all the tools you need to succeed.
            </Paragraph>
            <div className="mt-8 space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <UserOutlined className="text-white text-lg" />
                </div>
                <Text className="text-white text-lg">Simple registration process</Text>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <LockOutlined className="text-white text-lg" />
                </div>
                <Text className="text-white text-lg">Secure and reliable platform</Text>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <MailOutlined className="text-white text-lg" />
                </div>
                <Text className="text-white text-lg">24/7 customer support</Text>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;