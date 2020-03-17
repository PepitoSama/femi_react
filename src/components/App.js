import React, { Component, Fragment } from 'react'
import { Header, Footer } from './Layouts'

export default class extends Component {
  render() {
    return <Fragment>
      <Header style={{ position: "sticky", top: "0" }} />
      <Footer style={{ position: "sticky", bottom: "0" }} />
    </Fragment>
  }
}
