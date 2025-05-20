import React, { useState } from 'react';
import { Card, Radio, Space, Tabs, Select, Typography } from 'antd';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const { Text } = Typography;
const { Option } = Select;

const GensetVoltageCharts = () => {
  // Sample time-series data for generator stations - Voltage
  const voltageData = [
    { time: '08:00', 'Station Alpha': 220, 'Station Beta': 225, 'Station Delta': 218, 'Station Epsilon': 222, 'Station Zeta': 215 },
    { time: '09:00', 'Station Alpha': 221, 'Station Beta': 226, 'Station Delta': 219, 'Station Epsilon': 223, 'Station Zeta': 216 },
    { time: '10:00', 'Station Alpha': 222, 'Station Beta': 227, 'Station Delta': 220, 'Station Epsilon': 224, 'Station Zeta': 217 },
    { time: '11:00', 'Station Alpha': 223, 'Station Beta': 228, 'Station Delta': 221, 'Station Epsilon': 225, 'Station Zeta': 218 },
    { time: '12:00', 'Station Alpha': 222, 'Station Beta': 227, 'Station Delta': 220, 'Station Epsilon': 224, 'Station Zeta': 217 },
    { time: '13:00', 'Station Alpha': 221, 'Station Beta': 226, 'Station Delta': 219, 'Station Epsilon': 223, 'Station Zeta': 216 },
    { time: '14:00', 'Station Alpha': 220, 'Station Beta': 225, 'Station Delta': 218, 'Station Epsilon': 222, 'Station Zeta': 215 },
    { time: '15:00', 'Station Alpha': 219, 'Station Beta': 224, 'Station Delta': 217, 'Station Epsilon': 221, 'Station Zeta': 214 },
  ];

  const [timeRange, setTimeRange] = useState('8hours');
  const [chartType, setChartType] = useState('line');

  const handleTimeRangeChange = (e : any) => {
    setTimeRange(e.target.value);
  };

  const handleChartTypeChange = (value : any) => {
    setChartType(value);
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const renderVoltageChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={voltageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis name="Voltage (V)" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="Station Alpha" stroke="#0088FE" strokeWidth={2} />
              <Line type="monotone" dataKey="Station Beta" stroke="#00C49F" strokeWidth={2} />
              <Line type="monotone" dataKey="Station Delta" stroke="#FFBB28" strokeWidth={2} />
              <Line type="monotone" dataKey="Station Epsilon" stroke="#FF8042" strokeWidth={2} />
              <Line type="monotone" dataKey="Station Zeta" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={voltageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis name="Voltage (V)" />
              <Tooltip />
              <Legend />
              <Bar dataKey="Station Alpha" fill="#0088FE" />
              <Bar dataKey="Station Beta" fill="#00C49F" />
              <Bar dataKey="Station Delta" fill="#FFBB28" />
              <Bar dataKey="Station Epsilon" fill="#FF8042" />
              <Bar dataKey="Station Zeta" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={voltageData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis name="Voltage (V)" />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="Station Alpha" stackId="1" stroke="#0088FE" fill="#0088FE" />
              <Area type="monotone" dataKey="Station Beta" stackId="1" stroke="#00C49F" fill="#00C49F" />
              <Area type="monotone" dataKey="Station Delta" stackId="1" stroke="#FFBB28" fill="#FFBB28" />
              <Area type="monotone" dataKey="Station Epsilon" stackId="1" stroke="#FF8042" fill="#FF8042" />
              <Area type="monotone" dataKey="Station Zeta" stackId="1" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Card title="Generator Voltage Trend" className="shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <Space>
            <Text>Time Range:</Text>
            <Radio.Group value={timeRange} onChange={handleTimeRangeChange}>
              <Radio.Button value="8hours">8 Hours</Radio.Button>
              <Radio.Button value="24hours">24 Hours</Radio.Button>
              <Radio.Button value="7days">7 Days</Radio.Button>
            </Radio.Group>
          </Space>
          <Space>
            <Text>Chart Type:</Text>
            <Select value={chartType} onChange={handleChartTypeChange} style={{ width: 120 }}>
              <Option value="line">Line Chart</Option>
              <Option value="bar">Bar Chart</Option>
              <Option value="area">Area Chart</Option>
            </Select>
          </Space>
        </div>
        {renderVoltageChart()}
      </Card>
    </div>
  );
};

export default GensetVoltageCharts;
