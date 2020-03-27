import React, { Component } from 'react'
import { Form, Input, Button, Drawer } from 'antd'
import axios from 'axios'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import changeToken from '../../Store/Actions/changeToken'
import login from '../../Store/Actions/Login/login'
import changeRedirect from '../../Store/Actions/changeRedirect'

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
}
const tailLayout = {
  wrapperCol: { offset: 0, span: 24 },
}

const usernameRules = [{
  required: true,
  message: 'Please input your username!'
}]

const passwordRules = [{
  required: true,
  message: 'Please input your password!'
}]

const Login = class extends Component {

  state = ({
    token: '',
    error: '',
    visible: false
  })

  componentDidMount() {
    this.setState({
      visible: true
    })
  }

  changeToken = () => {
    this.props.changeToken(this.state.token)
    this.props.login()
  }

  onFinish = async (values) => {
    console.log('Success:', values)
    try {
      await axios.post(`${process.env.REACT_APP_SERV_HOST}/api/user/login`, {
        username: values.username,
        password: values.password
      }).then((result) => {
        this.setState({
          token: result.data["auth-token"]
        })
        this.changeToken()
        this.setState({
          visible: false
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
  
  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo)
  }

  renderLoginform() {
    return (
      <Drawer
        title="Connectez vous"
        placement="right"
        closable={true}
        onClose={() => {this.setState({ visible: false })}}
        visible={this.state.visible}
        width={'40%'}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={usernameRules}
          >
            <Input />
          </Form.Item>
    
          <Form.Item
            label="Password"
            name="password"
            rules={passwordRules}
          >
            <Input.Password />
          </Form.Item>
    
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
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
  return bindActionCreators({ changeToken, login, changeRedirect }, dispatch)
}

export default connect(null, mapDispatchToProps)(Login)
