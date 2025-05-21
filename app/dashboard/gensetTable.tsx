import React, { useState } from 'react';
import { Card, Table, Button, Tag, Space, Select, Typography } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const GensetStationTable = () => {
  // Sample data for generator stations
  // const gensetData = [
  //   {
  //     key: '1',
  //     no: 1,
  //     station: 'Station Alpha',
  //     voltage: 220,
  //     current: 15.7,
  //     power: '3.45 kW',
  //     time: '2025-05-20 08:30:25',
  //     status: 'Online',
  //   },
  //   {
  //     key: '2',
  //     no: 2,
  //     station: 'Station Beta',
  //     voltage: 380,
  //     current: 22.3,
  //     power: '8.47 kW',
  //     time: '2025-05-20 08:29:15',
  //     status: 'Online',
  //   },
  //   {
  //     key: '3',
  //     no: 3,
  //     station: 'Station Gamma',
  //     voltage: 0,
  //     current: 0,
  //     power: '0 kW',
  //     time: '2025-05-20 07:45:10',
  //     status: 'Offline',
  //   },
  //   {
  //     key: '4',
  //     no: 4,
  //     station: 'Station Delta',
  //     voltage: 220,
  //     current: 12.8,
  //     power: '2.82 kW',
  //     time: '2025-05-20 08:31:05',
  //     status: 'Online',
  //   },
  //   {
  //     key: '5',
  //     no: 5,
  //     station: 'Station Epsilon',
  //     voltage: 380,
  //     current: 18.6,
  //     power: '7.07 kW',
  //     time: '2025-05-20 08:28:30',
  //     status: 'Online',
  //   },
  //   {
  //     key: '6',
  //     no: 6,
  //     station: 'Station Zeta',
  //     voltage: 220,
  //     current: 5.3,
  //     power: '1.17 kW',
  //     time: '2025-05-20 08:15:45',
  //     status: 'Warning',
  //   },
  //   {
  //     key: '7',
  //     no: 7,
  //     station: 'Station Eta',
  //     voltage: 0,
  //     current: 0,
  //     power: '0 kW',
  //     time: '2025-05-20 06:20:15',
  //     status: 'Offline',
  //   },
  // ];
  const gensetData = [
    {
      key: '1',
      no: 1,
      station: 'Stasiun Tarahan',
      voltage: 220,
      current: 15.7,
      power: '3.45 kW',
      time: '2025-05-20 08:30:25',
      status: 'Online',
    },
    {
      key: '2',
      no: 2,
      station: 'Stasiun Sukamenanti',
      voltage: 380,
      current: 22.3,
      power: '8.47 kW',
      time: '2025-05-20 08:29:15',
      status: 'Online',
    },
    {
      key: '3',
      no: 3,
      station: 'Stasiun Garuntang',
      voltage: 0,
      current: 0,
      power: '0 kW',
      time: '2025-05-20 07:45:10',
      status: 'Offline',
    },
    {
      key: '4',
      no: 4,
      station: 'Stasiun Tanjungkarang',
      voltage: 220,
      current: 12.8,
      power: '2.82 kW',
      time: '2025-05-20 08:31:05',
      status: 'Online',
    },
    {
      key: '5',
      no: 5,
      station: 'Stasiun Labuan Ratu',
      voltage: 380,
      current: 18.6,
      power: '7.07 kW',
      time: '2025-05-20 08:28:30',
      status: 'Online',
    },
    {
      key: '6',
      no: 6,
      station: 'Stasiun Gedong Ratu',
      voltage: 220,
      current: 5.3,
      power: '1.17 kW',
      time: '2025-05-20 08:15:45',
      status: 'Warning',
    },
    {
      key: '7',
      no: 7,
      station: 'Stasiun Rejosari',
      voltage: 0,
      current: 0,
      power: '0 kW',
      time: '2025-05-20 06:20:15',
      status: 'Offline',
    },
    {
      key: '8',
      no: 8,
      station: 'Stasiun Branti',
      voltage: 380,
      current: 21.4,
      power: '8.13 kW',
      time: '2025-05-20 08:34:12',
      status: 'Online',
    },
    {
      key: '9',
      no: 9,
      station: 'Stasiun Tegineneng',
      voltage: 220,
      current: 10.2,
      power: '2.24 kW',
      time: '2025-05-20 08:32:00',
      status: 'Online',
    },
    {
      key: '10',
      no: 10,
      station: 'Stasiun Rengas',
      voltage: 0,
      current: 0,
      power: '0 kW',
      time: '2025-05-20 07:10:45',
      status: 'Offline',
    },
    {
      key: '11',
      no: 11,
      station: 'Stasiun Rengas',
      voltage: 220,
      current: 6.5,
      power: '1.43 kW',
      time: '2025-05-20 08:10:30',
      status: 'Online',
    },
    {
      key: '12',
      no: 12,
      station: 'Stasiun Bekri',
      voltage: 380,
      current: 23.1,
      power: '8.78 kW',
      time: '2025-05-20 08:35:55',
      status: 'Online',
    },
    {
      key: '13',
      no: 13,
      station: 'Stasiun Haji Pemanggilan',
      voltage: 220,
      current: 14.2,
      power: '3.12 kW',
      time: '2025-05-20 08:29:00',
      status: 'Online',
    },
    {
      key: '14',
      no: 14,
      station: 'Stasiun Sulusuban',
      voltage: 220,
      current: 0,
      power: '0 kW',
      time: '2025-05-20 06:55:50',
      status: 'Offline',
    },
    {
      key: '15',
      no: 15,
      station: 'Stasiun Blambangan Pagar',
      voltage: 380,
      current: 19.9,
      power: '7.58 kW',
      time: '2025-05-20 08:33:45',
      status: 'Online',
    },
    {
      key: '16',
      no: 16,
      station: 'Stasiun Kalibalangan',
      voltage: 220,
      current: 11.7,
      power: '2.57 kW',
      time: '2025-05-20 08:26:10',
      status: 'Warning',
    },
    {
      key: '17',
      no: 17,
      station: 'Stasiun Candimas',
      voltage: 0,
      current: 0,
      power: '0 kW',
      time: '2025-05-20 07:05:00',
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