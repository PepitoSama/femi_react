import React, { Component } from 'react'

// Antd
import { Tag } from 'antd'

// Actions
import { redirect as changeRedirect, changeSearch } from '../../Store/Actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const colors = ["magenta", "red", "volcano", "orange", "gold", "lime", "green", "cyan", "blue", "geekblue", "purple"]

const ShowTags = class extends Component {

  searchTag = (tag) => {
    this.props.changeSearch(tag)
    this.props.changeRedirect('/search')
  }

  render() {
    return(
      <div className="tags">
        {this.props.tags.map(tag => {
          // eslint-disable-next-line
          return <Tag color={colors[Math.floor(Math.random() * colors.length)]} onClick={(e) => {this.searchTag(tag)}}><a>{tag}</a></Tag>
        })}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeRedirect, changeSearch }, dispatch)
}

export default connect(null, mapDispatchToProps)(ShowTags)