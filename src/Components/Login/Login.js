import React, { Component } from 'react'
import { Form, Input, Button, Drawer } from 'antd'
import axios from 'axios'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import login from '../../Store/Actions/Login/login'
import changeRedirect from '../../Store/Actions/changeRedirect'

const usernameRules = [{
  required: true,
  message: 'Entrez votre nom d\'utilisateur !',
  min: 6
}]

const passwordRules = [{
  required: true,
  message: 'Entrez votre mot de passe !',
  min: 6
}]

const emailRules = [{
  required: true,
  message: 'Entrez votre email !',

}]

const Login = class extends Component {

  state = ({
    error: '',
    visible: false,
    loginVisible: true,
    message: ''
  })

  componentDidMount() {
    if (!this.props.user) {
      this.setState({
        visible: true
      })
    }
  }

  login = async (values) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERV_HOST}/api/user/login`, {
        username: values.username,
        password: values.password
      }).then((result) => {
        this.props.login(result.data["auth-token"])
        this.setState({
          visible: false
        })
        this.props.changeRedirect('/')
      })
    } catch (err) {
      var error = ''
      if (err.response.status === 400) {
        error = 'Bad username or Password'
      } else {
        error = 'Error'
      }
      this.setState({
        error: error
      })
    }
  }

  register = async (values) => {
    try {
      await axios.post(`${process.env.REACT_APP_SERV_HOST}/api/user/register`, {
        username: values.username,
        password: values.password,
        email: values.email
      }).then((result) => {
        this.setState({
          loginVisible: true,
          registerVisible: false,
          message: `Vous être enregistré ${values.username}!`
        })
      })
    } catch (err) {
      var error = ''
      if (err.response.status === 400) {
        error = 'Bad username or Password'
      } else {
        error = 'Error'
      }
      this.setState({
        error: error
      })
    }
  }
  
  loginFailed(errorInfo) {
    console.log('Failed:', errorInfo)
  }

  renderLoginform() {
    return (
      <Drawer
        title="Connectez vous"
        placement="top"
        closable={true}
        onClose={() => {this.setState({ visible: false })}}
        visible={this.state.visible}
        height={'50%'}
      >
        <Form
          name="Login"
          initialValues={{ remember: true }}
          onFinish={this.login}
          onFinishFailed={this.loginFailed}
          style={this.state.loginVisible
            ? { display: 'block' }
            : { display: 'none' }
          }
        >
          <Form.Item>
            <Form.Item
              label="Nom d'utilisateur"
              name="username"
              rules={usernameRules}
            >
              <Input />
            </Form.Item>
      
            <Form.Item
              label="Mot de passe"
              name="password"
              rules={passwordRules}
            >
              <Input.Password />
            </Form.Item>
      
            <Form.Item >
              <Button type="primary" htmlType="submit">
                Se connecter
              </Button>
              <Button type="link" htmlType="button" onClick={(e) => this.setState({ loginVisible: false, registerVisible: true })}>
                Vous n'avez pas encore de compte ?
              </Button>
            </Form.Item>
          </Form.Item>
          <p style={{ color: 'red' }}>{this.state.error}</p>
          <p style={{ color: 'green' }}>{this.state.message}</p>
        </Form>

        <Form
          name="register"
          initialValues={{ remember: true }}
          onFinish={this.register}
          onFinishFailed={this.registerFailed}
          style={this.state.registerVisible
            ? { display: 'block' }
            : { display: 'none' }
          }
        >
          <Form.Item>
            <Form.Item
              label="Nom d'utilisateur"
              name="username"
              rules={usernameRules}
            >
              <Input />
            </Form.Item>
      
            <Form.Item
              label="Mot de passe"
              name="password"
              rules={passwordRules}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={emailRules}
            >
              <Input />
            </Form.Item>
      
            <Form.Item >
              <Button type="primary" htmlType="submit">
                S'enregister
              </Button>
            </Form.Item>
          </Form.Item>
          <p style={{ color: 'red' }}>{this.state.error}</p>
        </Form>
      </Drawer>
    )
  }

  render() {
    return (
      <>
        {this.renderLoginform()}
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ login, changeRedirect }, dispatch)
}

function mapPropsToState(state) {
  return {
    user: state.user
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(Login)
