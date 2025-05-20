import React, { useState } from 'react';
import { Card, Radio, Space, Tabs, Select, Typography } from 'antd';
import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Cell
} from 'recharts';

const { Title, Text } = Typography;
const { Option } = Select;
const { TabPane } = Tabs;

const GensetPowerCharts = () => {
  // Sample time-series data for generator stations
  const timeSeriesData = [
    { time: '08:00', 'Station Alpha': 12.2, 'Station Beta': 10.1, 'Station Delta': 8.5, 'Station Epsilon': 11.3, 'Station Zeta': 6.8 },
    { time: '09:00', 'Station Alpha': 12.5, 'Station Beta': 10.4, 'Station Delta': 8.6, 'Station Epsilon': 11.6, 'Station Zeta': 7.0 },
    { time: '10:00', 'Station Alpha': 12.7, 'Station Beta': 10.2, 'Station Delta': 8.7, 'Station Epsilon': 11.7, 'Station Zeta': 7.1 },
    { time: '11:00', 'Station Alpha': 12.4, 'Station Beta': 10.3, 'Station Delta': 8.8, 'Station Epsilon': 11.5, 'Station Zeta': 7.0 },
    { time: '12:00', 'Station Alpha': 12.3, 'Station Beta': 10.5, 'Station Delta': 8.9, 'Station Epsilon': 11.4, 'Station Zeta': 6.9 },
    { time: '13:00', 'Station Alpha': 12.1, 'Station Beta': 10.6, 'Station Delta': 9.0, 'Station Epsilon': 11.3, 'Station Zeta': 6.8 },
    { time: '14:00', 'Station Alpha': 12.0, 'Station Beta': 10.7, 'Station Delta': 9.1, 'Station Epsilon': 11.2, 'Station Zeta': 6.7 },
    { time: '15:00', 'Station Alpha': 11.9, 'Station Beta': 10.8, 'Station Delta': 9.2, 'Station Epsilon': 11.1, 'Station Zeta': 6.6 },
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

  // Render the power trend chart based on the selected chart type
  const renderPowerTrendChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis name="Power (kW)" />
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
            <BarChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis name="Power (kW)" />
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
            <AreaChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis name="Power (kW)" />
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
      <Card title="Generator Current (A) Trend" className="shadow-sm">
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
        {renderPowerTrendChart()}
      </Card>
    </div>
  );
};

export default GensetPowerCharts;


