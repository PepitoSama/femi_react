import React, { Component } from 'react'

// Components
import Response from './Response'

const Responses = class extends Component {
  render() {
    return(
      <>
        {this.props.responses.map((response, id) => {
          return (
            <Response response={response} key={id}/>
          )
        })}
      </>
    )
  }
}

export default Responses