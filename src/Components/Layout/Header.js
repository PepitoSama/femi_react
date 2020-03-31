import React, { Component } from 'react'

// Antd
import { PageHeader, Button } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';

// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// Components
import Search from './Search'

// Actions
import changeRedirect from '../../Store/Actions/changeRedirect'
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
    this.props.logout()
    this.props.changeRedirect('/')
  }

  render() {
    return (
      <PageHeader
        style = {headerStyle}
        className='site-page-header'
        title={
          <h3 className="title_header hvr-pulse" style={{color: 'white'}} onClick={(e) => {this.props.changeRedirect(`/`)}}>
            <span role="img" aria-label="womanFacepalming">🤦‍♀️</span>FemiApp<span role="img" aria-label="womanFacepalming">🤦‍♀️</span>
          </h3>
        }
        extra={[
          <div
            style={{
              display: 'flex',
              width: 'max-content',
              justifyContent: 'flex-end',
            }}
          >
            <Search />
            <Button
              key="2"
              type="primary"
              icon={<PoweroffOutlined />}
              danger = {this.props.user}
              onClick = {(e) => {
                this.props.user
                  ? this.logout()
                  : this.props.changeRedirect('/login')
              }}
              className='hvr-push'
            >
              {this.props.user
                ? 'Déconnexion'
                : 'Connexion'
              }
            </Button>
          </div>
        ]}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeRedirect, logout }, dispatch)
}

function mapPropsToState(state) {
  return {
    user: state.user
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(Header)