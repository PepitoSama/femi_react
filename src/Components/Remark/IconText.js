import React, { Component } from 'react'

const IconText = class extends Component {
  render() {
    return (
      <span
        onClick={() => { this.props.action(this.props.item) } }
        className= {this.props.className}
      >
        {React.createElement(this.props.icon, {
          style: { marginRight: 8 },
          onClick: () => {
            this.props.action(this.props.item)
          }
        })}
        {this.props.text}
      </span>
    )
  }
}

export default IconText