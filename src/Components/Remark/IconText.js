import React from 'react'

export default ({icon, text, id, action}) => (
  <span>
    {React.createElement(icon, { style: { marginRight: 8 } })}
    {text}
  </span>
)