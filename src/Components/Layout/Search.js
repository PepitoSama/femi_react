import React, { Component } from 'react'

// Antd
import { Form, Input, Tooltip, Button } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'

// Actions
import changeRedirect from '../../Store/Actions/changeRedirect'
import { bindActionCreators } from 'redux'

const Search = class extends Component {

  onFinish = ({ search }) => {
    this.props.changeRedirect('/search/' + search)
  }

  render() {
    return (
      <Form
        name="search"
        onFinish={this.onFinish}
      >
        <Form.Item>
          <Form.Item
            name="search"
            noStyle
            rules={[
              {
                required: true,
                message: 'Ecrivez !'
              },
            ]}
          >
            <Input style={{ width: '70%' }} placeholder="Rechercher" />
          </Form.Item>
          <Tooltip title="Rechercher">
            <Button type="primary" htmlType="submit" style={{ marginLeft: 8 }}>
              <SearchOutlined />
            </Button>
          </Tooltip>
        </Form.Item>
      </Form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeRedirect }, dispatch)
}

export default connect(null, mapDispatchToProps)(Search)