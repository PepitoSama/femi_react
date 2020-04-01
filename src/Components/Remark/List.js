import React, { Component } from 'react'

// Antd
import { List, Avatar, Row, Col, Tooltip, Button } from 'antd'
import { MessageFilled, StarFilled, StarOutlined, DeleteFilled } from '@ant-design/icons'
import IconText from './IconText'
// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { changeRemarks, addRemarks, removeRemark } from '../../Store/Actions/Remarks'
import { likeRemark, dislikeRemark } from '../../Store/Actions/Remark'
import { redirect as changeRedirect, changeSearch } from '../../Store/Actions'

// Axios
import axios from 'axios'

// Components
import AddRemarks from './AddRemarks'
import ShowTags from './ShowTags'

const remarkList = class extends Component {
  
  async componentDidMount() {
    await this.refresh
    this.props.changeSearch(null)
  }

  async deleteContent (id) {
    if (this.props.user) {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/${id}`
      const config = {headers: {'auth-token': this.props.user.token}}
      await axios.delete(url, config)
      .catch((err) => {
        console.log(err)
      })
      this.props.removeRemark(id)
    }
  }

  async likeContent (item) {
    if (this.props.user) {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/like/${item.id}`
      const headers = {
        headers: {
          'auth-token': this.props.user.token
        }
      }

      var body = {}

      item.liked
        ? body = {
          "value": false
        }
        : body = {
          "value": true
        }
      
      await axios.post(url, body, headers)
      .catch((err) => {
        console.log(err)
      })
      body.value
        ? this.props.likeRemark(item.id)
        : this.props.dislikeRemark(item.id)
    } else {
      this.props.changeRedirect('/login')
    }
  }

  refresh = new Promise((resolve, reject) => {
    var search = ''
    if (this.props.search) {
      search = this.props.search
    }
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/`
      const config = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        params: {
          start: 0,
          number: 0,
          search: search
        }
      }
      axios.get(url, config)
      .then((remarks) => {
        var listData = []
        remarks.data.forEach((remark) => {
          const antRemark = {
            href: null,
            title: remark.content,
            avatar: 'https://img.icons8.com/cotton/64/000000/person-male--v2.png',
            id: remark.id,
            countLike: remark.likes.length,
            countResp: remark.responses.length,
            userId: remark.user.userId,
            tags: remark.tags
          }
          if(this.props.user != null) {
            remark.likes.find((like) => like.user.userId === this.props.user.userId) !== undefined
            ? antRemark.liked = true
            : antRemark.liked = false
          }
          
          listData.push(antRemark)
        })
        this.props.changeRemarks(listData)
        resolve()
      })
    } catch (err){
      reject(err)
    }
  })

  renderAction = (item) => {
    const itemAction = [
      <Tooltip
        placement="bottom"
        title="J'ai déja entendu ça !"
        onClick={(e) => {this.likeContent(item)}} 
      >
        <Button
          type="primary"
          shape="round"
        >
          <IconText
            icon={item.liked ? StarFilled : StarOutlined}
            text={item.countLike}
            className='hvr-buzz-out'
            key="list-vertical-like-o"
            item={item}
          />
        </Button>
      </Tooltip>,
      <Tooltip
        placement="bottom"
        title='Répondre'
        onClick={(e) => {this.props.changeRedirect(`/Remark/${item.id}`)}} 
      >
        <Button
          type="primary"
          shape="round"
        >
          <IconText
            icon={MessageFilled}
            text={item.countResp}
            key="list-vertical-message"
            className='hvr-buzz-out'
            item={item}
          />
        </Button>
      </Tooltip>
    ]
    if(this.props.user) {
      if(this.props.user.userId === item.userId) {
        itemAction.push(
          <Tooltip
            placement="bottom"
            title='Supprimer'
            onClick={(e) => {this.deleteContent(item.id)}}
          >
            <Button
              type="danger"
              shape="round"
            >
              <IconText
                icon={DeleteFilled}
                key="list-vertical-delete"
                item={item}
                className='hvr-buzz-out'
              />
            </Button>
          </Tooltip>
        )
      }
    }
    return itemAction
  }

  render() {
    return (
      <>
        <Row>
          <Col xs={{ span: 22, offset:1 }} lg={{ span:14, offset:5 }}>
            <AddRemarks />
          </Col>
          <Col xs={{ span: 22, offset:1 }} lg={{ span:14, offset:5 }} className='list'>
            <List
              itemLayout="vertical"
              size="small"
              pagination={{
                onChange: () => {
                  window.scrollTo(0,0)
                },
                pageSize: 10
              }}
              dataSource={ this.props.remarks }
              renderItem = { item => (
                <List.Item
                  key={item.id}
                  actions={this.renderAction(item)}
                  className='hvr-fade-custom hvr-grow-custom list_item'
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={
                      <p
                        className="item_content"
                        onClick={(e) => {
                          this.props.changeRedirect(`/Remark/${item.id}`)
                        }}
                      >
                        {item.title}
                      </p>
                    }
                    description = {item.description}
                  />
                    <ShowTags tags={item.tags}/>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeRemark, changeRemarks, addRemarks, changeRedirect, likeRemark, dislikeRemark, changeSearch }, dispatch)
}

function mapPropsToState(state) {
  return {
    remarks: state.remarks,
    user: state.user,
    search: state.search
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(remarkList)