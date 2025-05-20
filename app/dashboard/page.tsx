
'use client';

import React from 'react';
import { 
  Typography, 
  Card, 
  Statistic, 
} from 'antd';

import {
  FileTextOutlined,
  TeamOutlined,
  CalendarOutlined,
  MessageOutlined
} from '@ant-design/icons';

import AdminLayout from '../../components/AdminLayout';
import GensetStationTable from './gensetTable';
import GensetPowerCharts from './gensetPowerCharts';
import GensetVoltageCharts from './gensetVoltageCharts';
import GensetCurrentCharts from './gensetCurrentCharts';

const { Title, Text } = Typography;



const DashboardPage: React.FC = () => {

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

       {/* Genset Monitoring Table */}
       <div className="grid grid-cols-1 gap-6 mb-6">
        <GensetStationTable />
      </div>

      {/* Report  */}
      <div className="grid grid-cols-2 gap-6 mb-6">
          <GensetPowerCharts/>
          <GensetVoltageCharts/>
      </div>
      <div className="grid grid-cols-1 gap-6">
          <GensetCurrentCharts/>
      </div>
      
     

    </AdminLayout>
  );
};

export default DashboardPage;