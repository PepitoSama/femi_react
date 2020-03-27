import React, { Component } from 'react'

// Antd
import { List, Avatar, Row, Col } from 'antd'
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons'
import IconText from './IconText'
// Redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Actions
import { changeRemarks, addRemarks, removeRemark } from '../../Store/Actions/Remarks'
import changeRedirect from '../../Store/Actions/changeRedirect'

// Axios
import axios from 'axios'

const remarkList = class extends Component {
  
  async componentDidMount() {
    this.refresh.then((res, rej) => {
      console.log('remarks: ', this.props.remarks)
    })
  }

  // deleteContent = async (e, id) => {
  //   if (this.props.isLogged) {
  //     const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/${id}`
  //     const config = {headers: {'auth-token': this.props.token}}
  //     axios.delete(url, config)
  //     .then((result) => {
  //       console.log(result)
  //       this.refresh()
  //     })
  //     .catch((err) => {
  //       var error = ''
  //       if (err.response.status === 401) {
  //         error = 'Non autorisé'
  //       } else {
  //         error = 'Erreur ' + err.response.status
  //       }
  //       this.setState({
  //         error : error
  //       })
  //     })
  //   } else {
  //     console.log(this.props)
  //     this.setState({ error: 'Vous devez être connecté pour supprimer !' })
  //   }
  // }

  refresh = new Promise((resolve, reject) => {
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/`
      const config = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        params: {
          start: 0,
          number: 1000,
          error: ''
        }
      }
      axios.get(url, config)
      .then((remarks) => {
        var listData = []
        remarks.data.forEach((remark) => {
          listData.push({
            href: null,
            title: remark.content,
            avatar: 'https://img.icons8.com/cotton/64/000000/person-male--v2.png',
            id: remark.id
          })
        })
        this.props.changeRemarks(listData)
        resolve()
      })
    } catch (err){
      reject(err)
    }
  })

  render() {
    return (
      <>
        <Row gutter={[0, 20]}>
          <Col span={14} offset={5} >
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
                  actions={[
                    <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" id={item.id} action="Star" />,
                    <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" id={item.id} action="Like" />,
                    <IconText icon={MessageOutlined} text="2" key="list-vertical-message" id={item.id} action="Response" />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar} />}
                    title={<a onClick={(e) => {this.props.changeRedirect(`/Remark/${item.id}`)}}>{item.title}</a>}
                    description={item.description}
                  />
                    {item.content}
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
  return bindActionCreators({ removeRemark, changeRemarks, addRemarks, changeRedirect }, dispatch)
}

function mapPropsToState(state) {
  return {
    remarks: state.remarks,
    token: state.token,
    isLogged: state.isLogged
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(remarkList)