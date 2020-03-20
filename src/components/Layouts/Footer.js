import React from 'react'
import { Row, Col, Typography } from 'antd'
const { Title } = Typography

const colStyle = {
  height: '40px',
  textAlign: 'center',
}

export default props =>
<Row>
  <Col span={24} style={colStyle}>
    <Title level={3} style={colStyle}>Footer</Title>
  </Col>
</Row>