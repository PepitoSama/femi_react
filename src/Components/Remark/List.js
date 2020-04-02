import React, { Component } from 'react'

// Antd
import { List, Avatar, Row, Col, Tooltip, Button, message, Spin } from 'antd'
import { MessageFilled, StarFilled, StarOutlined, DeleteFilled } from '@ant-design/icons'
import IconText from './IconText'
import InfiniteScroll from 'react-infinite-scroller';

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
  
  state = ({
    last: 0,
    loading: false,
    hasMore: true,
    max: 0
  })

  componentDidMount = async () => {
    window.scrollTo(0,0)
    this.props.changeSearch(null)
    this.getMax
    .then((max) => {
      this.setState({
        max: max
      })
    })
    this.fetchData(10,0)
    .then((result) => {
      this.props.changeRemarks(result)
      this.setState({
        last: 10
      })
    })
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

  fetchData = (number, start) => {
    return new Promise((resolve, reject) => {
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
            start: start,
            number: number,
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
          resolve(listData)
        })
      } catch (err){
        reject(err)
      }
    })
  }

  getMax = new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/max`
      const config = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      }
      axios.get(url, config)
      .then((max) => {
        resolve(max.data.max)
      })
    } catch (err){
      reject(err)
    }
  })

  handleInfiniteOnLoad = () => {
    let data = this.props.remarks
    console.log(data)
    this.setState({
      loading: true,
    })
    if (data.length >= this.state.max) {
      message.info('Fin des remarques')
      this.setState({
        hasMore: false,
        loading: false,
      })
      return
    }
    this.fetchData(10, this.state.last).then((result) => {
      this.setState({
        loading: false,
        last: this.state.last+10
      })
      this.props.addRemarks(result)
    })
  }

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
          <InfiniteScroll
            initialLoad={false}
            pageStart={0}
            loadMore={this.handleInfiniteOnLoad}
            hasMore={!this.state.loading && this.state.hasMore}
            useWindow={true}
          >
            <List
              dataSource={ this.props.remarks }
              // itemLayout="vertical"
              // size="small"
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
            >
              {this.state.loading && this.state.hasMore && (
                <div className="demo-loading-container">
                  <Spin />
                </div>
              )}
            </List>
          </InfiniteScroll>
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