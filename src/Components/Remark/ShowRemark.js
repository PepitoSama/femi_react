import React, { Component } from 'react'

// Antd
import { Spin, Drawer } from 'antd'

// Axios
import axios from 'axios'

// Components
import RemarkResponse from './RemarkResponse'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Responses from './Responses'
import ShowTags from './ShowTags'

// Actions
import changeLookingRemark from '../../Store/Actions/Remark/changeLookingRemark'

const ShowRemark = class extends Component {
  state = ({
    visible: false,
    loaded: false,
    content: null
  })

  componentDidMount() {
    this.setState({
      visible: true
    })
    
    this.getContent(this.props.match.params.id)
    .then((result) => {
      this.props.changeLookingRemark({
        id: result.id,
        content: result.content,
        likes: result.likes,
        responses: result.responses,
        tags: result.tags,
        user: result.user
      })
      this.setState({
        loaded: true,
        content: result.content
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  getContent = (id) => {
    return new Promise((resolve, reject) => {
      try {
        const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/${id}`
        const config = {
          method: 'get'
        }
        axios.get(url, config)
        .then((remark) => {
          resolve(remark.data)
        }).catch((err) => {
          reject(err)
        })
      } catch (err){
        reject(err)
      }
    })
  }

  like = (id) => {
    console.log('Todo ', id)
  }

  remarkDetails = () => {
    return (
      <>
        {this.props.remark.tags.length > 0
          ? <ShowTags tags={this.props.remark.tags} />
          : null
        }
        <RemarkResponse id={this.props.remark.id} />
        <Responses responses={this.props.remark.responses} />
      </>
    )
  }

  render() {
    const emojiList = ['🤔', '🤭', '🤨', '🙄', '🧐', '😤', '🤡']
    const emoji = emojiList[Math.floor(Math.random() * emojiList.length)]
    return(
      <>
        <Drawer
          title={emoji + ' ' + this.state.content + ' ' + emoji}
          placement="bottom"
          closable={true}
          onClose={() => {this.setState({ visible: false })}}
          visible={this.state.visible}
          height='60%'
        >
          {!this.state.loaded
            ? <Spin>Loading</Spin>
            : this.remarkDetails()
          }
        </Drawer>
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeLookingRemark }, dispatch)
}

function mapPropsToState(state) {
  return {
    remark: state.remark
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(ShowRemark)