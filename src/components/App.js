import React, { Component } from 'react'
import {Login, List, Form, Header, Footer} from './'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import './App.css'
import axios from 'axios'

const HOST = 'http://vps414215.ovh.net:3000'

export default class extends Component {
  state = {
    contents: null,
    connected: false,
    status: 'Connectez vous pour poster',
    loaded: false,
    error: '',
    redirect: null
  }

  componentDidMount() {
    try {
      const url = `${HOST}/api/remark/`
      const config = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        params: {
          start: 0,
          number: 50
        }
      }
      axios.get(url, config).then((remarks) => {
        console.log(remarks.data)
        this.setState({
          contents: remarks.data,
          loaded: true
        })
      })
    } catch (err){
      console.log(err)
    }
  }

  postLogin = async (e) => {
    e.preventDefault()
    await axios.post(`${HOST}/api/user/login`, {
      username: e.target.elements.username.value,
      password: e.target.elements.password.value
    }).then((result) => {
      axios.defaults.headers.common['auth-token'] = result.data['auth-token']
      this.setState({
        connected: true,
        status: 'Connecté !',
        error: '',
        redirect: '/'
      })
    }).catch((error) => {
      this.setState({ error: 'Mauvais logs' })
    })
  }

  logout = async (e) => {
    e.preventDefault()
    axios.defaults.headers.common['auth-token'] = null
    this.setState({
      connected: false
    })
  }

  getContent = async (e) => {
    try {
      const url = `${HOST}/api/remark/`
      const config = {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
        params: {
          start: 0,
          number: 50
        }
      }
      axios.get(url, config).then((remarks) => {
        this.setState({
          contents: remarks.data
        })
      })
    } catch (err){
      console.log(err)
    }
  }

  postContent = async (e) => {
    e.preventDefault()
    if (this.state.connected) {
      const url = `${HOST}/api/remark/`
      axios.post(url, {
        content: e.target.elements.content.value
      }).then((result) => {
        this.getContent()
      }).catch((error) => {
        console.log(`error post content : ${error.message}`)
      })
    } else {
      this.setState({ status: 'Vous devez être connecté pour poster !' })
    }
  }

  deleteContent = async (e, id) => {
    if (this.state.connected) {
      const url = `${HOST}/api/remark/${id}`
      axios.delete(url).then((result) => {
        this.getContent()
      }).catch((error) => {
        console.log(`error post content : ${error.message}`)
      })
    } else {
      this.setState({ status: 'Vous devez être connecté pour poster !' })
    }
  }

  render() {
    if (this.state.redirect) {
      const redirect = this.state.redirect
      this.setState({
        redirect: null
      })
      return (
        <BrowserRouter>
          <Redirect to={redirect} />
        </BrowserRouter>
      )
    }
    return (
      <>
        <BrowserRouter>
          <div>
            <Header style={{ position: "sticky", top: "0" }} connected = { this.state.connected } />
            <Route
              path='/'
              render={(props) =>
                <div>
                  <List contents={ this.state.contents } deleteContent= { this.deleteContent } loaded={ this.state.loaded } />
                  <Form postContent = { this.postContent} loaded={ this.state.loaded } />
                </div>
              }
              exact
            />
            {!this.state.connected
              ? <Route path='/Login' component={() => <Login postLogin = { this.postLogin } /> } />
              : this.logout
            }
          </div>
        </BrowserRouter>
          <p style={{color:'red'}}>{this.state.error}</p>
        <hr />
        <Footer style={{ position: 'sticky', bottom: '0' }} />
      </>
    )
  }
}
