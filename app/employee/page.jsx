'use client';

import React, { useState } from 'react';
import { 
  Layout, 
  Typography, 
  Table, 
  Card, 
  Button, 
  Space, 
  Tag, 
  Modal, 
  Form, 
  Input, 
  Select, 
  DatePicker, 
  Tooltip,
  message,
  Popconfirm,
  Badge,
  Breadcrumb
} from 'antd';
import {
  TeamOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  CheckOutlined,
  CloseCircleOutlined,
  CheckCircleOutlined,
  PauseCircleOutlined,
  InfoCircleOutlined,
  FilterOutlined,
  SearchOutlined,
  ExportOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';

import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';

const { Content, Footer } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

// Mock data for employees
const initialEmployeeData = [
  {
    key: '1',
    name: 'John Brown',
    employeeId: 'EMP001',
    position: 'Software Engineer',
    department: 'Development',
    status: 'Active',
    joinDate: '2020-01-01',
    email: 'john.brown@example.com',
    phone: '(123) 456-7890',
    approved: true,
  },
  {
    key: '2',
    name: 'Jim Green',
    employeeId: 'EMP002',
    position: 'Product Manager',
    department: 'Product',
    status: 'Active',
    joinDate: '2020-02-15',
    email: 'jim.green@example.com',
    phone: '(123) 456-7891',
    approved: true,
  },
  {
    key: '3',
    name: 'Joe Black',
    employeeId: 'EMP003',
    position: 'UX Designer',
    department: 'Design',
    status: 'Inactive',
    joinDate: '2020-03-10',
    email: 'joe.black@example.com',
    phone: '(123) 456-7892',
    approved: false,
  },
  {
    key: '4',
    name: 'Sarah Wilson',
    employeeId: 'EMP004',
    position: 'Marketing Specialist',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2020-04-22',
    email: 'sarah.wilson@example.com',
    phone: '(123) 456-7893',
    approved: true,
  },
  {
    key: '5',
    name: 'Michael Johnson',
    employeeId: 'EMP005',
    position: 'HR Manager',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2020-05-18',
    email: 'michael.johnson@example.com',
    phone: '(123) 456-7894',
    approved: false,
  },
  {
    key: '6',
    name: 'Emma Davis',
    employeeId: 'EMP006',
    position: 'Data Analyst',
    department: 'Analytics',
    status: 'Pending',
    joinDate: '2020-06-15',
    email: 'emma.davis@example.com',
    phone: '(123) 456-7895',
    approved: false,
  },
  {
    key: '7',
    name: 'David Miller',
    employeeId: 'EMP007',
    position: 'Frontend Developer',
    department: 'Development',
    status: 'Active',
    joinDate: '2020-07-12',
    email: 'david.miller@example.com',
    phone: '(123) 456-7896',
    approved: true,
  },
  {
    key: '8',
    name: 'Olivia Smith',
    employeeId: 'EMP008',
    position: 'Content Writer',
    department: 'Marketing',
    status: 'Inactive',
    joinDate: '2020-08-05',
    email: 'olivia.smith@example.com',
    phone: '(123) 456-7897',
    approved: true,
  },
];

// Status tag renderer
const renderStatusTag = (status) => {
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
    case 'Pending':
      color = 'gold';
      icon = <PauseCircleOutlined />;
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

// Department options
const departmentOptions = [
  'Development',
  'Product',
  'Design',
  'Marketing',
  'Human Resources',
  'Analytics',
  'Finance',
  'Customer Support',
];

// Position options
const positionOptions = [
  'Software Engineer',
  'Frontend Developer',
  'Backend Developer',
  'UX Designer',
  'UI Designer',
  'Product Manager',
  'Marketing Specialist',
  'HR Manager',
  'Data Analyst',
  'Content Writer',
  'Financial Analyst',
  'Customer Support Specialist',
];

const EmployeePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('employees');
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isViewModalVisible, setIsViewModalVisible] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [messageApi, contextHolder] = message.useMessage();
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  // Function to generate notification for demonstration purposes
  const addNotification = (type, content) => {
    setNotifications(prev => [...prev, { 
      id: Date.now(), 
      title: type, 
      description: content,
      time: 'Just now',
      read: false
    }]);
    setUnreadCount(prev => prev + 1);
  };

  // Mark notification as read
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(item => 
      item.id === id ? { ...item, read: true } : item
    );
    setNotifications(updatedNotifications);
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  // Filter employees based on search text and status
  const filteredEmployees = employeeData.filter(employee => {
    const matchesSearch = Object.values(employee).some(
      value => value && value.toString().toLowerCase().includes(searchText.toLowerCase())
    );
    
    const matchesStatus = filterStatus === 'All' || employee.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // Handle opening the edit modal
  const handleEdit = (record) => {
    setCurrentEmployee(record);
    form.setFieldsValue({
      ...record,
      joinDate: dayjs(record.joinDate),
    });
    setIsModalVisible(true);
  };

  // Handle viewing employee details
  const handleView = (record) => {
    setCurrentEmployee(record);
    setIsViewModalVisible(true);
  };

  // Handle employee deletion
  const handleDelete = (key) => {
    const newData = employeeData.filter(item => item.key !== key);
    setEmployeeData(newData);
    messageApi.success('Employee deleted successfully');
    addNotification('Employee Deleted', `Employee ID ${key} has been removed`);
  };

  // Toggle employee approval status
  const handleApprove = (key, currentStatus) => {
    const newData = employeeData.map(item => 
      item.key === key ? { ...item, approved: !currentStatus } : item
    );
    setEmployeeData(newData);
    messageApi.success(`Employee ${currentStatus ? 'unapproved' : 'approved'} successfully`);
    addNotification(
      currentStatus ? 'Employee Unapproved' : 'Employee Approved', 
      `Employee ID ${key} status updated`
    );
  };

  // Handle form submission for adding/editing employee
  const handleOk = () => {
    form.validateFields().then(values => {
      const formattedValues = {
        ...values,
        joinDate: values.joinDate.format('YYYY-MM-DD'),
      };

      if (currentEmployee) {
        // Editing existing employee
        const newData = employeeData.map(item => 
          item.key === currentEmployee.key ? { ...item, ...formattedValues } : item
        );
        setEmployeeData(newData);
        messageApi.success('Employee updated successfully');
        addNotification('Employee Updated', `${formattedValues.name}'s information has been updated`);
      } else {
        // Adding new employee
        const newEmployee = {
          key: `${employeeData.length + 1}`,
          employeeId: `EMP${String(employeeData.length + 1).padStart(3, '0')}`,
          approved: false,
          ...formattedValues,
        };
        setEmployeeData([...employeeData, newEmployee]);
        messageApi.success('Employee added successfully');
        addNotification('New Employee', `${formattedValues.name} has been added to the system`);
      }

      setIsModalVisible(false);
      form.resetFields();
      setCurrentEmployee(null);
    });
  };

  // Handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsViewModalVisible(false);
    form.resetFields();
    setCurrentEmployee(null);
  };

  // Open modal for adding new employee
  const showAddModal = () => {
    setCurrentEmployee(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  // Table columns definition
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <a onClick={() => handleView(record)}>{text}</a>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'ID',
      dataIndex: 'employeeId',
      key: 'employeeId',
      sorter: (a, b) => a.employeeId.localeCompare(b.employeeId),
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'department',
      filters: departmentOptions.map(dept => ({ text: dept, value: dept })),
      onFilter: (value, record) => record.department === value,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => renderStatusTag(status),
      filters: [
        { text: 'Active', value: 'Active' },
        { text: 'Inactive', value: 'Inactive' },
        { text: 'Pending', value: 'Pending' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      sorter: (a, b) => new Date(a.joinDate) - new Date(b.joinDate),
    },
    {
      title: 'Approval',
      dataIndex: 'approved',
      key: 'approved',
      render: (approved, record) => (
        <Popconfirm
          title={approved ? "Unapprove this employee?" : "Approve this employee?"}
          onConfirm={() => handleApprove(record.key, approved)}
          okText="Yes"
          cancelText="No"
          icon={<InfoCircleOutlined style={{ color: approved ? 'orange' : 'green' }} />}
        >
          <Button 
            type={approved ? "default" : "primary"} 
            icon={approved ? <CloseCircleOutlined /> : <CheckOutlined />}
            size="small"
          >
            {approved ? "Unapprove" : "Approve"}
          </Button>
        </Popconfirm>
      ),
      filters: [
        { text: 'Approved', value: true },
        { text: 'Not Approved', value: false },
      ],
      onFilter: (value, record) => record.approved === value,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Edit">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => handleEdit(record)} 
              size="small" 
            />
          </Tooltip>
          
          <Popconfirm
            title="Are you sure you want to delete this employee?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
            icon={<InfoCircleOutlined style={{ color: 'red' }} />}
          >
            <Button 
              type="text" 
              icon={<DeleteOutlined />} 
              size="small" 
              danger
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {contextHolder}
      
      {/* Sidebar Component */}
      <Sidebar 
        collapsed={collapsed}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />
      
      <Layout>
        {/* Navbar Component */}
        <Navbar 
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          notifications={notifications}
          markAsRead={markAsRead}
          unreadCount={unreadCount}
        />
        
        {/* Main Content */}
        <Content 
          className="bg-gray-50"
          style={{ 
            marginLeft: collapsed ? '80px' : '250px',
            marginTop: '64px', // Height of the header
            padding: '24px',
            transition: 'margin-left 0.2s'
          }}
        >
          {/* Breadcrumb and Title */}
          <div>
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
              <Breadcrumb.Item>Employees</Breadcrumb.Item>
            </Breadcrumb>
            
            <div className="flex items-center justify-between mb-6">
              <div>
                <Title level={4} className="mb-0">
                  <TeamOutlined className="mr-2" />
                  Employees Management
                </Title>
                <Text type="secondary">View, add, edit and manage employees</Text>
              </div>
              
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={showAddModal}
              >
                Add Employee
              </Button>
            </div>
          </div>
          
          {/* Employees Table Card */}
          <Card 
            title={
              <div className="flex items-center">
                <Badge count={filteredEmployees.length} showZero className="mr-2">
                  <Text strong>Employees List</Text>
                </Badge>
              </div>
            }
            className="shadow-sm"
            extra={
              <div className="flex items-center space-x-4">
                <Input 
                  placeholder="Search employees..." 
                  prefix={<SearchOutlined />} 
                  value={searchText}
                  onChange={e => setSearchText(e.target.value)}
                  style={{ width: 200 }}
                  allowClear
                />
                
                <Select 
                  defaultValue="All" 
                  style={{ width: 120 }} 
                  onChange={value => setFilterStatus(value)}
                >
                  <Option value="All">All Status</Option>
                  <Option value="Active">Active</Option>
                  <Option value="Inactive">Inactive</Option>
                  <Option value="Pending">Pending</Option>
                </Select>
                
                <Button icon={<ExportOutlined />}>Export</Button>
              </div>
            }
          >
            <Table 
              columns={columns} 
              dataSource={filteredEmployees} 
              pagination={{ 
                pageSize: 10,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20'],
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`
              }}
              size="middle"
              rowClassName={(record) => record.approved ? '' : 'bg-amber-50'}
              scroll={{ x: 'max-content' }}
            />
          </Card>
          
          {/* Add/Edit Employee Modal */}
          <Modal
            title={currentEmployee ? "Edit Employee" : "Add New Employee"}
            open={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            width={700}
            centered
          >
            <Form
              form={form}
              layout="vertical"
              name="employeeForm"
              className="mt-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Form.Item
                  name="name"
                  label="Full Name"
                  rules={[{ required: true, message: 'Please enter employee name' }]}
                >
                  <Input placeholder="Enter employee name" />
                </Form.Item>
                
                <Form.Item
                  name="email"
                  label="Email Address"
                  rules={[
                    { required: true, message: 'Please enter email address' },
                    { type: 'email', message: 'Please enter a valid email' }
                  ]}
                >
                  <Input placeholder="Enter email address" />
                </Form.Item>
                
                <Form.Item
                  name="phone"
                  label="Phone Number"
                  rules={[{ required: true, message: 'Please enter phone number' }]}
                >
                  <Input placeholder="Enter phone number" />
                </Form.Item>
                
                <Form.Item
                  name="position"
                  label="Position"
                  rules={[{ required: true, message: 'Please select position' }]}
                >
                  <Select placeholder="Select position">
                    {positionOptions.map(pos => (
                      <Option key={pos} value={pos}>{pos}</Option>
                    ))}
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="department"
                  label="Department"
                  rules={[{ required: true, message: 'Please select department' }]}
                >
                  <Select placeholder="Select department">
                    {departmentOptions.map(dept => (
                      <Option key={dept} value={dept}>{dept}</Option>
                    ))}
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="status"
                  label="Status"
                  rules={[{ required: true, message: 'Please select status' }]}
                >
                  <Select placeholder="Select status">
                    <Option value="Active">Active</Option>
                    <Option value="Inactive">Inactive</Option>
                    <Option value="Pending">Pending</Option>
                  </Select>
                </Form.Item>
                
                <Form.Item
                  name="joinDate"
                  label="Join Date"
                  rules={[{ required: true, message: 'Please select join date' }]}
                >
                  <DatePicker className="w-full" />
                </Form.Item>
              </div>
            </Form>
          </Modal>
          
          {/* View Employee Details Modal */}
          <Modal
            title="Employee Details"
            open={isViewModalVisible}
            onCancel={handleCancel}
            footer={[
              <Button key="close" onClick={handleCancel}>
                Close
              </Button>,
              <Button 
                key="edit" 
                type="primary" 
                onClick={() => {
                  setIsViewModalVisible(false);
                  handleEdit(currentEmployee);
                }}
              >
                Edit Employee
              </Button>,
            ]}
            width={600}
            centered
          >
            {currentEmployee && (
              <div className="mt-4">
                <div className="flex justify-center mb-6">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                        {currentEmployee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="text-xl font-semibold">{currentEmployee.name}</div>
                    <div className="text-gray-500">{currentEmployee.position}</div>
                    <div className="mt-1">
                      {renderStatusTag(currentEmployee.status)}
                      {currentEmployee.approved && (
                        <Tag color="green" className="ml-2">Approved</Tag>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Text type="secondary">Employee ID</Text>
                    <div className="font-medium">{currentEmployee.employeeId}</div>
                  </div>
                  
                  <div>
                    <Text type="secondary">Department</Text>
                    <div className="font-medium">{currentEmployee.department}</div>
                  </div>
                  
                  <div>
                    <Text type="secondary">Email Address</Text>
                    <div className="font-medium">{currentEmployee.email}</div>
                  </div>
                  
                  <div>
                    <Text type="secondary">Phone Number</Text>
                    <div className="font-medium">{currentEmployee.phone}</div>
                  </div>
                  
                  <div>
                    <Text type="secondary">Join Date</Text>
                    <div className="font-medium">{currentEmployee.joinDate}</div>
                  </div>
                  
                  <div>
                    <Text type="secondary">Approval Status</Text>
                    <div className="font-medium">
                      {currentEmployee.approved ? 'Approved' : 'Not Approved'}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Modal>
        </Content>
        
        {/* Footer with adjusted margin to align with content */}
        <Footer 
          className="text-center bg-white"
          style={{ 
            marginLeft: collapsed ? '80px' : '250px',
            transition: 'margin-left 0.2s'
          }}
        >
          Dashboard System ©{new Date().getFullYear()} Created by Your Company
        </Footer>
      </Layout>
    </Layout>
  );
};

export default EmployeePage;