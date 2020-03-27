import React, { Component } from 'react'

// Antd
import { Form, Input, Button, Drawer } from 'antd'

// Axios
import axios from 'axios'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import { addRemark } from '../../Store/Actions/Remarks'

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 18,
  },
}

const tailLayout = {
  wrapperCol: {
    offset: 0,
    span: 24,
  },
}

const AddRemark = class extends Component {
  state = ({
    error: '',
    visible: false,
    message: ''
  })

  componentDidMount() {
    this.setState({
      visible: true
    })
  }

  onFinish = ({ remark }) => {
    this.postContent(remark)
  }

  onClose = () => {
    this.setState({ visible: false })
  }

  postContent = async (remark) => {
    if (this.props.isLogged) {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/`
      axios.post(url, {
        content: remark
      }, {
        headers: {
          'auth-token': this.props.token
        } 
      })
      .then((result) => {
        // console.log(result.data)
        this.props.addRemark({
          href: null,
          title: result.data.content,
          avatar: 'https://img.icons8.com/cotton/64/000000/person-male--v2.png',
          id: result.data.id
        })
        this.setState({
          message: 'Votre message a été ajouté'
        })
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

  render() {
    return (
      <Drawer
        title="Ajoutez une remarque"
        placement="top"
        closable={true}
        onClose={() => this.onClose()}
        visible={this.state.visible}
        width={'40%'}
      >
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onFinish}
        >
          <Form.Item
            label="Remarque : "
            name="remark"
            rules={[
              {
                required: true,
                message: 'Minimum 6 caractères !',
                min: 6
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Envoyer
            </Button>
          </Form.Item>
          <p style={{color: 'red'}}>{this.state.error}</p>
          <p style={{color: 'green'}}>{this.state.message}</p>
        </Form>
      </Drawer>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addRemark }, dispatch)
}

function mapPropsToState(state) {
  return {
    isLogged: state.isLogged,
    token: state.token
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(AddRemark)