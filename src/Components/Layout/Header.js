import React, { Component } from 'react'
import { PageHeader, Button } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { PoweroffOutlined,PlusSquareOutlined } from '@ant-design/icons';

// Actions
import changeRedirect from '../../Store/Actions/changeRedirect'
import changeToken from '../../Store/Actions/changeToken'
import logout from '../../Store/Actions/Login/logout'

const headerStyle = {
  margin: '5px 5px 20px 5px',
  borderRadius: '3px',
  backgroundColor: "#2c3e50",
  padding: "10px",
  color: "white",
}

const Header = class extends Component {

  logout = () => {
    this.props.changeToken(null)
    this.props.logout()
  }

  render() {
    return (
      <PageHeader
        style = {headerStyle}
        className='site-page-header'
        title={<p style={{color: 'white'}}>🤦‍♀️ Femi App 🤦‍♀️</p>}
        extra={[
          <Button
            key="1"
            type="primary"
            icon={<PlusSquareOutlined />}
            onClick = {(e) => {
              !this.props.isLogged
                ? this.props.changeRedirect('/Login')
                : this.props.changeRedirect('/Add')
            }}
          >
            Ajouter
          </Button>,
          <Button
            key="2"
            type="primary"
            icon={<PoweroffOutlined />}
            danger = {this.props.isLogged}
            onClick = {(e) => {
              this.props.isLogged
                ? this.logout()
                : this.props.changeRedirect('/login')
            }}
          >
            {this.props.isLogged
              ? 'Déconnexion'
              : 'Connexion'
            }
          </Button>
        ]}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeRedirect, changeToken, logout }, dispatch)
}

function mapPropsToState(state) {
  console.log('state Header : ', state)
  return {
    isLogged: state.isLogged
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(Header)