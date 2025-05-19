
'use client';

import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  BarChartOutlined,
  TeamOutlined,
  FileTextOutlined,
  SettingOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = ({ collapsed, activeMenu, setActiveMenu }) => {
  return (
    <Sider 
        trigger={null} 
        collapsible 
        collapsed={collapsed}
        className="bg-white shadow-sm"
        theme="light"
        width={250}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-100">
          {collapsed ? (
            <div className="text-xl font-bold text-blue-600">DS</div>
          ) : (
            <div className="text-xl font-bold text-blue-600">Dashboard System</div>
          )}
        </div>
        <Menu
          mode="inline"
          selectedKeys={[activeMenu]}
          onClick={e => setActiveMenu(e.key)}
          className="border-r-0"
          items={[
            {
              key: 'dashboard',
              icon: <DashboardOutlined />,
              label: 'Dashboard',
            },
            {
              key: 'analytics',
              icon: <BarChartOutlined />,
              label: 'Analytics',
            },
            {
              key: 'employees',
              icon: <TeamOutlined />,
              label: 'Employees',
            },
            {
              key: 'projects',
              icon: <FileTextOutlined />,
              label: 'Projects',
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: 'Settings',
            },
          ]}
        />
      </Sider>
  );
};

export default Sidebar;