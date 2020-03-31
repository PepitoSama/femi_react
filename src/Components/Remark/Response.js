import React, { createElement, useState } from 'react'

// Antd
import { Comment, Tooltip, Avatar } from 'antd'
import { LikeOutlined, LikeFilled, DeleteFilled } from '@ant-design/icons'
import { connect } from 'react-redux'

// Axios
// import axios from 'axios'

const Response = (props) => {
  const [likes, setLikes] = useState(false)
  const [removed, setRemoved] = useState(false)
  const [actionL, setActionL] = useState(null)
  
  const like = () => {
    setActionL(likes?'disliked':'liked')
    setLikes(!likes)
  }

  const remove = () => {
    setRemoved(true)
    console.log('Todo')
    // const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/${id}`
    // const config = {headers: {'auth-token': props.user.token}}
    // axios.delete(url, config)
    // .then((result) => {
    //   this.refresh()
    // })
    // .catch((err) => {
    //   var error = ''
    //   if (err.response.status === 401) {
    //     error = 'Non autorisé'
    //   } else {
    //     error = 'Erreur ' + err.response.status
    //   }
    //   this.setState({
    //     error : error
    //   })
    // })
  }

  const actions = [
    <span key="comment-basic-like">
      <Tooltip title="J'aime">
        {createElement(actionL === 'liked'
          ? LikeFilled
          : LikeOutlined
          ,{ onClick: like, }
        )}
      </Tooltip>
      <span className="comment-action">{props.response.likes.length}</span>
    </span>
  ]
  
  if(props.user) {
    if(props.user.userId === props.response.user.userId) {
      actions.push(
        <span key="comment-remove">
          <Tooltip title="Supprimer">
            { createElement(DeleteFilled ,{ onClick: remove, })}
          </Tooltip>
        </span>
      )
    }
  }
  return(
    <Comment
      actions={actions}
      author={props.response.user.username}
      avatar={
        <Avatar
          src="https://img.icons8.com/cotton/64/000000/person-male--v2.png"
          alt="user avatar"
        />
      }
      content={
        <p>
          {props.response.content}
        </p>
      }
      hidden={removed}
    />
  )
}

function mapPropsToState(state) {
  return {
    user: state.user
  }
}

export default connect(mapPropsToState, null)(Response)