import React, { Component } from 'react';
import './App.css';

// Components
import { Header, Footer } from './Components/Layout'
import Login from './Components/Login/Login'
import { AddRemark, RemarkList, ShowRemark } from './Components/Remark'

// Router
import { BrowserRouter, Route, Redirect } from 'react-router-dom'

// Redux
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

// Actions 
import { redirect } from './Store/Actions'

const App = class extends Component {

  state = ({
    login: false
  })

  render() {

    if (this.props.to !== null) {
      const redirect = this.props.to
      this.props.redirect(null)
      return (
        <BrowserRouter>
          <Redirect to={redirect} />
        </BrowserRouter>
      )
    }

    return (
      <div className='App'>
        {/* Header */}
        <Header style={{ position: "sticky", top: "0" }} />
        <BrowserRouter>
          <>
            <Route
              path='/Login'
              exact
              render = { (props) =>
                <Login />  
              }
            />
            <Route
              path='/Add'
              exact
              render = { (props) => <AddRemark /> }
            />
            <RemarkList />
            <Route
              path='/Remark/:id'
              exact
              component = { ShowRemark }
            />
          </>
        </BrowserRouter>
        { /* Footer */ }
        <Footer />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ redirect }, dispatch)
}


function mapPropsToState(state) {
  return {
    to: state.redirect
  }
}

export default connect(mapPropsToState, mapDispatchToProps)(App)