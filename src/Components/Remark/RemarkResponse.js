import React, { Component } from 'react'

// Antd
import { Form, Input, Button } from 'antd'

//axios
import axios from 'axios'
import { connect } from 'react-redux'

// Actions
import changeRedirect from '../../Store/Actions/changeRedirect'
import changeLookingRemark from '../../Store/Actions/Remark/changeLookingRemark'
import { bindActionCreators } from 'redux'

const RemarkResponse = class extends Component {

  postContent = async ({ response }) => {
    if (this.props.isLogged) {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/${this.props.id}`
      const data = {
        content: response
      }
      const config = {
        headers: {
          'auth-token': this.props.token
        }
      }
      axios.post(url, data, config)
      .then((result) => {
        this.props.changeLookingRemark(result.data)
      })
      .catch((error) => {
        console.log(`error post content : ${error.message}`)
      })
    } else {
      this.props.changeRedirect('/Login')
    }
  }

  render() {
    return (
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={this.postContent}
      >
        <Form.Item
          label="Réponse : "
          name="response"
          rules={[
            {
              message: 'Minimum 6 caractères !',
              min: 6
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Envoyer
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeRedirect, changeLookingRemark }, dispatch)
}

function mapPropsToState(state) {
  return {
    isLogged: state.isLogged,
    token: state.token,
    remark: state.remark
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(RemarkResponse)