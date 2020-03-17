import React from 'react'
import { Row, Col } from 'antd'

const colStyle = {
  backgroundColor: 'rgb(121, 146, 209)',
  height: '20px',
  textAlign: 'center'
}

export default props =>
<Row>
  <Col span={24} style={colStyle}><p>Footer</p></Col>
</Row>