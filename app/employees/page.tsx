'use client';

import { 
  Typography, 
  Table, 
  Card, 
  Space, 
  Button, 
  Tag, 
  Input, 
  Select,
  Form,
  Modal,
  DatePicker,
  message
} from 'antd';
import { 
  CheckOutlined,
  EditOutlined, 
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined, 
} from '@ant-design/icons';

import AdminLayout from '../../components/AdminLayout';
import React, { useState } from 'react';
// import type { DatePickerProps } from 'antd';

const { Title, Text } = Typography;
const { Option } = Select;

// Define employee interface
interface Employee {
  key: string;
  name: string;
  employeeId: string;
  email: string;
  position: string;
  department: string;
  status: 'Active' | 'Inactive';
  joinDate: string;
  phone: string;
}

// Mock data for employees
const initialEmployeeData: Employee[] = [
  {
    key: '1',
    name: 'John Brown',
    employeeId: 'EMP001',
    email: 'john.brown@example.com',
    position: 'Software Engineer',
    department: 'Development',
    status: 'Active',
    joinDate: '2020-01-01',
    phone: '+1 (555) 123-4567',
  },
  {
    key: '2',
    name: 'Jim Green',
    employeeId: 'EMP002',
    email: 'jim.green@example.com',
    position: 'Product Manager',
    department: 'Product',
    status: 'Active',
    joinDate: '2020-02-15',
    phone: '+1 (555) 234-5678',
  },
  {
    key: '3',
    name: 'Joe Black',
    employeeId: 'EMP003',
    email: 'joe.black@example.com',
    position: 'UX Designer',
    department: 'Design',
    status: 'Inactive',
    joinDate: '2020-03-10',
    phone: '+1 (555) 345-6789',
  },
  {
    key: '4',
    name: 'Sarah Wilson',
    employeeId: 'EMP004',
    email: 'sarah.wilson@example.com',
    position: 'Marketing Specialist',
    department: 'Marketing',
    status: 'Active',
    joinDate: '2020-04-22',
    phone: '+1 (555) 456-7890',
  },
  {
    key: '5',
    name: 'Michael Johnson',
    employeeId: 'EMP005',
    email: 'michael.johnson@example.com',
    position: 'HR Manager',
    department: 'Human Resources',
    status: 'Active',
    joinDate: '2020-05-18',
    phone: '+1 (555) 567-8901',
  },
];

// List of departments for filter and form
const departments: string[] = ['Development', 'Product', 'Design', 'Marketing', 'Human Resources', 'Finance', 'Sales', 'Customer Service'];

// Status tag renderer
const renderStatusTag = (status: string): React.ReactNode => {
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
    default:
      color = 'default';
  }
  
  return (
    <Tag color={color} icon={icon}>
      {status}
    </Tag>
  );
};

// Employee positions for form
const positions: string[] = [
  'Software Engineer',
  'Product Manager',
  'UX Designer',
  'Marketing Specialist',
  'HR Manager',
  'Finance Manager',
  'Sales Representative',
  'Customer Service Representative',
  'Project Manager',
  'Data Analyst',
];

// FormValues type for the forms
interface FormValues {
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  status: 'Active' | 'Inactive';
  joinDate: any; // Using any for DatePicker value for simplicity
}

const EmployeesPage: React.FC = () => {
  const [employeeData, setEmployeeData] = useState<Employee[]>(initialEmployeeData);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState<boolean>(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [searchText, setSearchText] = useState<string>('');
  const [filterDepartment, setFilterDepartment] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [form] = Form.useForm<FormValues>();
  const [editForm] = Form.useForm<FormValues>();

  // Filter function for employees
  const filteredEmployees = employeeData.filter(employee => {
    const matchesSearch = searchText === '' || 
      employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.employeeId.toLowerCase().includes(searchText.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchText.toLowerCase());
    
    const matchesDepartment = filterDepartment === null || employee.department === filterDepartment;
    const matchesStatus = filterStatus === null || employee.status === filterStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handle showing edit employee modal
  const showEditModal = (employee: Employee): void => {
    // setEditingEmployee(employee);
    // editForm.setFieldsValue({
    //   ...employee,
    //   joinDate: employee.joinDate // In a real app, convert string to moment object if needed
    // });
    setIsEditModalVisible(true);
  };

  // Handle editing an employee
  const handleEditEmployee = (): void => {
    editForm.validateFields().then(values => {
      const updatedData = employeeData.map(employee => {
        if (employee.key === editingEmployee?.key) {
          return {
            ...employee,
            ...values,
            joinDate: values.joinDate?.format('YYYY-MM-DD') || employee.joinDate,
          };
        }
        return employee;
      });
      
      setEmployeeData(updatedData);
      setIsEditModalVisible(false);
      message.success('Employee updated successfully');
    });
  };

  // Handle deleting an employee
  const handleDeleteEmployee = (key: string): void => {
    Modal.confirm({
      title: 'Are you sure you want to delete this employee?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        const updatedData = employeeData.filter(employee => employee.key !== key);
        setEmployeeData(updatedData);
        message.success('Employee deleted successfully');
      },
    });
  };

  // Employee table columns
  const columns = [
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
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
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
      render: (_: any, record: Employee) => (
        <Space size="small">
          <Button 
            type="text"
            icon={<CheckOutlined />} 
            size="small" 
            onClick={() => showEditModal(record)} 
          />
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            size="small"
            onClick={() => showEditModal(record)}
          />
          <Button 
            type="text" 
            icon={<DeleteOutlined />} 
            size="small" 
            danger
            onClick={() => handleDeleteEmployee(record.key)}
          />
        </Space>
      ),
    },
  ];

  return (
    <AdminLayout>
      {/* Title bar */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <Title level={4} className="mb-0">Employees</Title>
          <Text type="secondary">Manage your employees</Text>
        </div>
      </div>
      
      {/* Employees Table */}
      <Card className="shadow-sm">
        <Table 
          columns={columns} 
          dataSource={filteredEmployees} 
          pagination={{ pageSize: 10 }}
          size="middle"
          rowKey="key"
        />
      </Card>
      
      {/* Edit Employee Modal */}
      <Modal
        title="Edit Employee"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsEditModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleEditEmployee}>
            Update Employee
          </Button>,
        ]}
      >
        <Form
          form={editForm}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please input the name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please input the email!' },
              { type: 'email', message: 'Please enter a valid email!' }
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="position"
            label="Position"
            rules={[{ required: true, message: 'Please select the position!' }]}
          >
            <Select>
              {positions.map(pos => (
                <Option key={pos} value={pos}>{pos}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: 'Please select the department!' }]}
          >
            <Select>
              {departments.map(dept => (
                <Option key={dept} value={dept}>{dept}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select the status!' }]}
          >
            <Select>
              <Option value="Active">Active</Option>
              <Option value="Inactive">Inactive</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="joinDate"
            label="Join Date"
            rules={[{ required: true, message: 'Please select the join date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Form>
      </Modal>
    </AdminLayout>
  );
};

export default EmployeesPage;