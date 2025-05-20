
'use client'; // ⬅️ WAJIB ada di baris pertama

import { useRouter } from 'next/navigation'
import { Layout, Menu } from 'antd';
import {
  DashboardOutlined,
  TeamOutlined
} from '@ant-design/icons';
import { useEffect } from 'react';

const { Sider } = Layout;

const Sidebar = ({ collapsed, activeMenu, setActiveMenu }) => {
  const router = useRouter();

  const handleMenuClick = (e) => {
    setActiveMenu(e.key);
    router.push(`/${e.key}`);
  };

  useEffect(() => {
  
    const current = window.location.pathname.split('/')[1];
    console.log(current);
    setActiveMenu(current || 'dashboard');
  }, [router.pathname]);
  

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} width={250} className="bg-white shadow-sm" theme="light">
      <div className="flex items-center justify-center h-16 border-b border-gray-100">
        {collapsed ? (
          <div className="text-xl font-bold text-blue-600">NS</div>
        ) : (
          <div className="text-xl font-bold text-blue-600">Nicatra System</div>
        )}
      </div>
      <Menu
        mode="inline"
        selectedKeys={[activeMenu]}
        onClick={handleMenuClick}
        className="border-r-0"
        items={[
          { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard' },
          { key: 'employees', icon: <TeamOutlined />, label: 'Employees' },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
