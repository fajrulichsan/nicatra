
'use client';

import React, { useState } from 'react';
import { 
  Typography, 
  Avatar,  
  Table, 
  Card, 
  Statistic, 
  Progress, 
  Space,
  Tag,
  Tooltip,
  Button,
} from 'antd';

import {
  FileTextOutlined,
  TeamOutlined,
  CalendarOutlined,
  MessageOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  PauseCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import AdminLayout from '../../components/AdminLayout';

// Helper function for dynamic imports with proper typing
function dynamicChart<T>(chartName: string): ComponentType<T> {
  return dynamic(
    () => import('recharts').then((mod) => mod[chartName] as ComponentType<T>),
    { ssr: false }
  );
}

// Mock data for tables
const employeeData = [
  {
    key: '1',
    name: 'John Brown',
    employeeId: 'EMP001',
    position: 'Software Engineer',
    department: 'Development',
    status: 'Active',
    joinDate: '2020-01-01',
  },
  {
    key: '2',
    name: 'Jim Green',
    employeeId: 'EMP002',
    position: 'Product Manager',
    department: 'Product',
    status: 'Active',
    joinDate: '2020-02-15',
  },
  {
    key: '3',
    name: 'Joe Black',
    employeeId: 'EMP003',
    position: 'UX Designer',
    department: 'Design',
    status: 'Inactive',
    joinDate: '2020-03-10',
  },
  {
    key: '4',
    name: 'Sarah Wilson',
    employeeId: 'EMP004',
    position: 'Marketing Specialist',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2020-04-22',
  },
  {
    key: '5',
    name: 'Michael Johnson',
    employeeId: 'EMP005',
    position: 'HR Manager',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2020-05-18',
  },
];

const projectData = [
  {
    key: '1',
    name: 'Website Redesign',
    progress: 70,
    status: 'In Progress',
    team: ['John', 'Sarah'],
    deadline: '2025-06-30',
  },
  {
    key: '2',
    name: 'Mobile App Development',
    progress: 45,
    status: 'In Progress',
    team: ['Mike', 'Joe', 'Linda'],
    deadline: '2025-08-15',
  },
  {
    key: '3',
    name: 'CRM Integration',
    progress: 100,
    status: 'Completed',
    team: ['Jim', 'Anna'],
    deadline: '2025-04-01',
  },
  {
    key: '4',
    name: 'Data Migration',
    progress: 20,
    status: 'In Progress',
    team: ['Robert', 'David'],
    deadline: '2025-09-30',
  },
  {
    key: '5',
    name: 'Security Audit',
    progress: 0,
    status: 'Not Started',
    team: ['Emma', 'Sophie'],
    deadline: '2025-10-15',
  },
];

// Status tag renderer
const renderStatusTag = (status: string) => {
  let color = '';
  let icon = null;
  
  switch(status) {
    case 'Active':
      color = 'green';
      icon = <CheckCircleOutlined />;
      break;
    case 'Inactive':
      color = 'red';
      icon = <CloseCircleOutlined />;
      break;
    case 'Completed':
      color = 'green';
      icon = <CheckCircleOutlined />;
      break;
    case 'In Progress':
      color = 'blue';
      icon = <PauseCircleOutlined />;
      break;
    case 'Not Started':
      color = 'gray';
      icon = <CloseCircleOutlined />;
      break;
    default:
      color = 'default';
  }
  
  return (
    <Tag color={color} icon={icon}>
      {status}
    </Tag>
  );
};

const DashboardPage: React.FC = () => {
  // Employee table columns
  const employeeColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => renderStatusTag(status),
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];
  
  // Project table columns
  const projectColumns = [
    {
      title: 'Project Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Progress',
      dataIndex: 'progress',
      key: 'progress',
      render: (progress: number) => (
        <Progress percent={progress} size="small" />
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => renderStatusTag(status),
    },
    {
      title: 'Team',
      dataIndex: 'team',
      key: 'team',
      render: (team: string[]) => (
        <>
          {team.map((member, index) => {
            const colors = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];
            return (
              <Tooltip key={index} title={member}>
                <Avatar
                  style={{ backgroundColor: colors[index % colors.length], marginRight: '3px' }}
                  size="small"
                >
                  {member.charAt(0)}
                </Avatar>
              </Tooltip>
            );
          })}
        </>
      ),
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="small">
          <Button type="text" icon={<EditOutlined />} size="small" />
          <Button type="text" icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* Title bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title level={4} className="mb-0">Dashboard</Title>
          <Text type="secondary">Welcome back, John Doe</Text>
        </div>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="shadow-sm">
          <Statistic
            title="Total Employees"
            value={254}
            valueStyle={{ color: '#3f8600' }}
            prefix={<TeamOutlined />}
          />
          <div className="mt-2">
            <Text type="secondary">12% more than last month</Text>
          </div>
        </Card>
        
        <Card className="shadow-sm">
          <Statistic
            title="Active Projects"
            value={18}
            valueStyle={{ color: '#0050b3' }}
            prefix={<FileTextOutlined />}
          />
          <div className="mt-2">
            <Text type="secondary">3 new this month</Text>
          </div>
        </Card>
        
        <Card className="shadow-sm">
          <Statistic
            title="Calendar Events"
            value={6}
            valueStyle={{ color: '#faad14' }}
            prefix={<CalendarOutlined />}
          />
          <div className="mt-2">
            <Text type="secondary">2 upcoming today</Text>
          </div>
        </Card>
        
        <Card className="shadow-sm">
          <Statistic
            title="Messages"
            value={42}
            valueStyle={{ color: '#cf1322' }}
            prefix={<MessageOutlined />}
          />
          <div className="mt-2">
            <Text type="secondary">8 unread messages</Text>
          </div>
        </Card>
      </div>
      
      {/* Tables Section */}
      <div className="grid grid-cols-1 gap-6">
        {/* Projects Table */}
        <Card 
          title="Projects Overview" 
          className="shadow-sm"
          extra={
            <div className="flex items-center space-x-2">
              <Button type="text" icon={<FilterOutlined />}>Filter</Button>
              <Button type="primary" size="small">Add Project</Button>
            </div>
          }
        >
          <Table 
            columns={projectColumns} 
            dataSource={projectData} 
            pagination={{ pageSize: 5 }}
            size="middle"
          />
        </Card>
        
        {/* Employees Table */}
        <Card 
          title="Employees List" 
          className="shadow-sm"
          extra={
            <div className="flex items-center space-x-2">
              <Button type="text" icon={<FilterOutlined />}>Filter</Button>
              <Button type="primary" size="small">Add Employee</Button>
            </div>
          }
        >
          <Table 
            columns={employeeColumns} 
            dataSource={employeeData} 
            pagination={{ pageSize: 5 }}
            size="middle"
          />
        </Card>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;