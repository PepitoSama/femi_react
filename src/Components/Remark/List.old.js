import React, { Component } from 'react'
import { Button, Spin } from 'antd'
import { connect } from 'react-redux'
import axios from 'axios'
import { bindActionCreators } from 'redux'
import { changeRemarks, addRemarks, removeRemark } from '../../Store/Actions/Remarks'

const remarkList = class extends Component {
  state = ({
    error: null,
    last: 0,
    loading: false
  })
  
  componentDidMount() {
    window.scrollTo(0,0)
    this.refresh()
    window.onscroll = () => {
      if (window.pageYOffset >= window.scrollMaxY ) {
        this.getContent(this.state.last+1, 20)
      }
    }
  }

  deleteContent = async (e, id) => {
    if (this.props.isLogged) {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/${id}`
      const config = {headers: {'auth-token': this.props.token}}
      axios.delete(url, config)
      .then((result) => {
        console.log(result)
        this.refresh()
      })
      .catch((err) => {
        var error = ''
        if (err.response.status === 401) {
          error = 'Non autorisé'
        } else {
          error = 'Erreur ' + err.response.status
        }
        this.setState({
          error : error
        })
      })
    } else {
      console.log(this.props)
      this.setState({ error: 'Vous devez être connecté pour supprimer !' })
    }
  }

  refresh = async () => {
    this.setState({
      loading: true
    })
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/`
      const config = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        params: {
          start: 0,
          number: 20,
          error: ''
        }
      }
      axios.get(url, config)
      .then((remarks) => {
        this.setState({
          loading: false,
          last: 19,
          error: ''
        })
        this.props.changeRemarks(remarks.data)
      })
    } catch (err){
      console.log(err)
    }
  }

  getContent = async(start, limit) => {
    this.setState({
      loading: true
    })
    try {
      const url = `${process.env.REACT_APP_SERV_HOST}/api/remark/`
      const config = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        params: {
          start: start,
          number: limit
        }
      }
      axios.get(url, config)
      .then((remarks) => {
        this.setState({
          loading: false,
          last: start+20
        })
        this.props.addRemarks(remarks.data)
      })
    } catch (err){
      console.log(err)
    }
  }

  render() {
    return (
      <>
        {this.props.remarks
          ? this.props.remarks.map((content, i) => {
            return (
              <div key={i}>
                <p title='Cliquez pour supprimer'>{`${content.id} : ${content.content}`}</p>
                <Button type="submit" name={i} onClick={e => this.deleteContent(e, content.id)} >Supprimer</Button>
              </div>
            )
          })
          : <></>
        }
        {this.state.loading
          ? <Spin size="small" />
          : <></>
        }
        <p style={{color: 'red'}}>{this.state.error}</p>
      </>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeRemark, changeRemarks, addRemarks }, dispatch)
}

function mapPropsToState(state) {
  return {
    remarks: state.remarks,
    token: state.token,
    isLogged: state.isLogged
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(remarkList)