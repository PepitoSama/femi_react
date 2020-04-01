import React, { Component } from 'react'

// Antd
import { Tag } from 'antd'
const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]

const ShowTags = class extends Component {
  render() {
    return(
      <div className="tags">
        {this.props.tags.map(tag => {
          return <Tag color={colors[Math.floor(Math.random() * colors.length)]}>{tag}</Tag>
        })}
      </div>
    )
  }
}

export default ShowTags