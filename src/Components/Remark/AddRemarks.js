import React, { Component } from 'react'

// Antd
import { Form, Input, Tooltip, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Axios
import axios from 'axios'

// Actions
import { addRemark } from '../../Store/Actions/Remarks'
import changeRedirect from '../../Store/Actions/changeRedirect'

const AddRemarks = class extends Component {

  onFinish = ({ remark }) => {
    this.postContent(remark)
  }

  postContent = async (remark) => {
    const tags = [...remark.matchAll(/#[A-Za-z0-9]*/g)].map((tag) => {
      return tag[0]
    })
    if (this.props.user) {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/`
      axios.post(url, {
        "content": remark,
        "tags": tags
      }, {
        headers: {
          'auth-token': this.props.user.token
        } 
      })
      .then((result) => {
        this.props.addRemark({
          href: null,
          title: result.data.content,
          avatar: 'https://img.icons8.com/cotton/64/000000/person-male--v2.png',
          id: result.data.id
        })
        this.props.changeRedirect(`/Remark/${result.data.id}`)
      })
      .catch((error) => {
        console.log(`error post content : ${error.message}`)
      })
    } else {
      this.setState({
        error: 'Vous devez être connecté pour poster !'
      })
    }
  }

  state = ({
    error: '',
    message: ''
  })

  render() {
    return (
      <Form
        name="addRemark"
        onFinish={this.onFinish}
      >
        <Form.Item>
          <Form.Item
            name="remark"
            label="Remarque : "
            noStyle
            rules={[
              {
                required: true,
                message: 'Minimum 6 caractères !',
                min: 6
              },
            ]}
          >
            <Input style={{ width: '80%' }} placeholder="Poster une remarque que vous avez entendu" />
          </Form.Item>
          <Tooltip title="Envoyer">
            <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
            <SendOutlined />
            </Button>
          </Tooltip>
        </Form.Item>
        <p style={{color: 'red'}}>{this.state.error}</p>
        <p style={{color: 'green'}}>{this.state.message}</p>
      </Form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addRemark, changeRedirect }, dispatch)
}

function mapPropsToState(state) {
  return {
    user: state.user
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(AddRemarks)