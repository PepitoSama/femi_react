import React, { Component } from 'react'

// Antd
import { Spin, Drawer, Button } from 'antd'

// Axios
import axios from 'axios'

// Components
import RemarkResponse from './RemarkResponse'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// Actions
import changeLookingRemark from '../../Store/Actions/Remark/changeLookingRemark'

const ShowRemark = class extends Component {
  state = ({
    visible: false,
    loaded: false,
    id: null,
    content: null,
    likes: [],
    responses: [],
    tags: [],
    user: {
      userId: null,
      username: null
    }
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
        <p>{this.props.remark.content}</p>
        <p>Likes : {this.props.remark.likes.length}</p>
        <p>Réponses : {this.props.remark.responses.length}</p>
        {this.props.remark.responses.map((response, id) => {
          return (
            <ul key={id}>
              <li>{id} : {response.content}</li>
              <li>Likes : {response.likes.length}</li>
              <li>User : {response.user.userId}</li>
              <li onClick={(e) => {this.like(response.idResponse)}}><Button>Like</Button></li>
            </ul>
          )
        })}
        <RemarkResponse id={this.props.remark.id} />
      </>
    )
  }

  render() {
    return(
      <>
        <Drawer
          title="Remarque : "
          placement="right"
          closable={true}
          onClose={() => {this.setState({ visible: false })}}
          visible={this.state.visible}
          width='40%'
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