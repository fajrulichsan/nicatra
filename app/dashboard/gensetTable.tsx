import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Select, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const GensetStationTable = () => {
  // Sample data for generator stations
  const gensetData = [
    {
      key: '1',
      no: 1,
      station: 'Station Alpha',
      voltage: 220,
      current: 15.7,
      power: '3.45 kW',
      time: '2025-05-20 08:30:25',
      status: 'Online',
    },
    {
      key: '2',
      no: 2,
      station: 'Station Beta',
      voltage: 380,
      current: 22.3,
      power: '8.47 kW',
      time: '2025-05-20 08:29:15',
      status: 'Online',
    },
    {
      key: '3',
      no: 3,
      station: 'Station Gamma',
      voltage: 0,
      current: 0,
      power: '0 kW',
      time: '2025-05-20 07:45:10',
      status: 'Offline',
    },
    {
      key: '4',
      no: 4,
      station: 'Station Delta',
      voltage: 220,
      current: 12.8,
      power: '2.82 kW',
      time: '2025-05-20 08:31:05',
      status: 'Online',
    },
    {
      key: '5',
      no: 5,
      station: 'Station Epsilon',
      voltage: 380,
      current: 18.6,
      power: '7.07 kW',
      time: '2025-05-20 08:28:30',
      status: 'Online',
    },
    {
      key: '6',
      no: 6,
      station: 'Station Zeta',
      voltage: 220,
      current: 5.3,
      power: '1.17 kW',
      time: '2025-05-20 08:15:45',
      status: 'Warning',
    },
    {
      key: '7',
      no: 7,
      station: 'Station Eta',
      voltage: 0,
      current: 0,
      power: '0 kW',
      time: '2025-05-20 06:20:15',
      status: 'Offline',
    },
  ];

  const [filteredData, setFilteredData] = useState(gensetData);
  const [selectedStation, setSelectedStation] = useState('all');
  const [loading, setLoading] = useState(false);

  // Get unique stations for dropdown
  const stations = ['all', ...new Set(gensetData.map(item => item.station))];

  // Handle station filter change
  const handleStationChange = (value : any) => {
    setSelectedStation(value);
    if (value === 'all') {
      setFilteredData(gensetData);
    } else {
      setFilteredData(gensetData.filter(item => item.station === value));
    }
  };

  // Define table columns
  const gensetColumns = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      width: 60,
    },
    {
      title: 'Station',
      dataIndex: 'station',
      key: 'station',
    },
    {
      title: 'Voltage (V)',
      dataIndex: 'voltage',
      key: 'voltage',
      sorter: (a : any , b : any) => a.voltage - b.voltage,
    },
    {
      title: 'Current (A)',
      dataIndex: 'current',
      key: 'current',
      sorter: (a : any, b : any) => a.current - b.current,
    },
    {
      title: 'Power',
      dataIndex: 'power',
      key: 'power',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
      sorter: (a : any, b : any) => Number(new Date(a.time)) - Number(new Date(b.time)),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status : any) => {
        let color = 'green';
        if (status === 'Offline') {
          color = 'red';
        } else if (status === 'Warning') {
          color = 'orange';
        }
        return (
          <Tag color={color}>
            {status}
          </Tag>
        );
      },
      filters: [
        { text: 'Online', value: 'Online' },
        { text: 'Offline', value: 'Offline' },
        { text: 'Warning', value: 'Warning' },
      ],
      onFilter: (value : any , record : any) => record.status === value,
    },
  ];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Reset to initial filtered state
      handleStationChange(selectedStation);
    }, 1000);
  };

  return (
    <Card 
      title="Generator Station Monitoring"
      className="shadow-sm"
      extra={
        <Space>
          <Space align="center">
            <Text>Station:</Text>
            <Select 
              value={selectedStation} 
              onChange={handleStationChange} 
              style={{ width: 180 }}
              placeholder="Filter by station"
            >
              <Option value="all">All Stations</Option>
              {stations.filter(s => s !== 'all').map(station => (
                <Option key={station} value={station}>{station}</Option>
              ))}
            </Select>
          </Space>
          <Button type="text" icon={<ReloadOutlined />} onClick={handleRefresh}>Refresh</Button>
        </Space>
      }
    >
      <Table 
        columns={gensetColumns} 
        dataSource={filteredData} 
        pagination={{ pageSize: 10 }}
        size="middle"
        loading={loading}
      />
    </Card>
  );
};

export default GensetStationTable;