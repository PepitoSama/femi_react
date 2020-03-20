import React from 'react'
import { PageHeader, Button } from 'antd'
import { NavLink } from 'react-router-dom'
import { PoweroffOutlined } from '@ant-design/icons';

export default props =>
  <>
    <PageHeader
      className="site-page-header"
      // onBack={() => null}
      title="🤦 FemiApp 🤦"
      subTitle=""
      extra={[
        <NavLink to='Login'>
          {props.connected
            ? <Button
                type='primary'
                key="3"
                icon={ <PoweroffOutlined/> }
                danger
              >
                  Logout
              </Button>
            : <Button
                type='primary'
                key="3"
                icon={ <PoweroffOutlined/> }
              >
                  Login
              </Button>
          }
        </NavLink>
      ]}
    />
  </>
