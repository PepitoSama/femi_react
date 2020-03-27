import React from 'react'
import { Layout } from 'antd'
const Footer = Layout

export default (props) => {
  const footerStyle = {
    textAlign: 'center',
    bottom: 0,
    width: '100%',
    left: 0
  }
  return (
    <Footer style={footerStyle}>
      Polytech ©2020 Created by Weslie Rabeson, Christophe Trannoy and Etienne Saimond
    </Footer>
  )
}