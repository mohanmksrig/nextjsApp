"use client";
import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import axios from 'axios';

const apiUrl = 'https://api.coronavirus.data.gov.uk/v1/data';
const queryParams = {
  filters: 'areaType=overview',
  structure: JSON.stringify({
    date: 'date',
    newCases: 'newCasesByPublishDate',
    cumCases: 'cumCasesByPublishDate',
  }),
};

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

const CovidReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then((result) => {
      setData(result);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <div className="header">
        <h1>Covid Report</h1>
        <ul className="header-links">
          <li><a href="#">Export to PDF <img src="images/download.png" alt="" width="20" height="20" /></a></li>
          <li><a href="#">Notes (3)<img src="images/note.png" alt="" width="20" height="20" /></a></li>
          <li><a href="#">Filter <img src="images/filter.png" alt="" width="20" height="20" /></a></li>
        </ul>
      </div>
      <Row gutter={16}>
        <Col span={12}>
          <Card title="New Cases Over Time" loading={loading}>
            <LineChart width={400} height={300} data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="newCases" stroke="#5B8FF9" />
            </LineChart>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Cumulative Cases" loading={loading}>
            <LineChart width={400} height={300} data={data}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="cumCases" stroke="#5B8FF9" />
            </LineChart>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CovidReport;

/*"use client";
import CovidReport from './CovidReport';

const HomePage = () => {
  return (
    <div>
      <CovidReport />
    </div>
  );
};

export default HomePage;*/