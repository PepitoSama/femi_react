import React, { Component } from 'react'

const IconText = class extends Component {
  render() {
    return (
      <span
        className= {this.props.className}
      >
        {React.createElement(this.props.icon, {
          style: { marginRight: 8 }
        })}
        {this.props.text}
      </span>
    )
  }
}

export default IconText