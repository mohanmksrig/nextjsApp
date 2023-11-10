"use client";
import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import axios from 'axios';

// API URL and parameters
const apiUrl = 'https://api.coronavirus.data.gov.uk/v1/data';
const queryParams = {
  filters: 'areaType=overview',
  structure: JSON.stringify({
    date: 'date',
    newCases: 'newCasesByPublishDate',
    cumCases: 'cumCasesByPublishDate',
    newDeaths: 'newDeaths28DaysByPublishDate',
    cumDeaths: 'cumDeaths28DaysByPublishDate',
  }),
};

// Fetch function data from the API
const fetchData = async () => {
  try {
    const response = await axios.get(apiUrl, {
      params: queryParams,
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

// Main component
const CovidReport = () => {
  // State variables for data and loading status
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Effect to fetch data when the component mounts
  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  // Return JSX for rendering
  return (
    <div>
      {/* Header section */}
      <div className="header">
        <h1>Covid Report</h1>
        <ul className="header-links">
          <li><a href="#">Export to PDF <img src="images/download.png" alt="" width="20" height="20" /></a></li>
          <li><a href="#">Notes (3)<img src="images/note.png" alt="" width="20" height="20" /></a></li>
          <li><a href="#">Filter <img src="images/filter.png" alt="" width="20" height="20" /></a></li>
        </ul>
      </div>

      {/* Chart section */}
      <Row gutter={16}>
        {/* New Cases Over Time */}
        <Col span={12}>
          <Card title="New Cases Over Time" loading={loading}>
            <LineChart width={600} height={400} data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="newCases" stroke="#5B8FF9" name="New Cases" />
              <Line type="monotone" dataKey="newDeaths" stroke="#FF7300" name="New Deaths" />
            </LineChart>
          </Card>
        </Col>

        {/* Cumulative Cases and Cumulative Deaths */}
        <Col span={12}>
          <Card title="Cumulative Cases and Cumulative Deaths" loading={loading}>
            <LineChart width={600} height={400} data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cumCases" stroke="#5B8FF9" name="Cumulative Cases" />
              <Line type="monotone" dataKey="cumDeaths" stroke="#FF7300" name="Cumulative Deaths" />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

// Export the component
export default CovidReport;