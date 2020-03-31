import React, { Component } from 'react'

// Antd
import { Drawer } from 'antd'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import changeRedirect from '../../Store/Actions/changeRedirect'

// Components
import AddRemarks from './AddRemarks'

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

  onClose = () => {
    this.setState({ visible: false })
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
        <AddRemarks />
      </Drawer>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeRedirect }, dispatch)
}

export default connect(null, mapDispatchToProps)(AddRemark)