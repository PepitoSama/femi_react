import React from 'react'
import { Button, Spin } from 'antd'
const remarkList = ({ contents, deleteContent, loaded}) => {
  return (
    <div>
      {loaded
        ? contents.map((content, i) => {
          return (
            <div key={i}>
              <p title='Cliquez pour supprimer'>{content.content}</p>
              <Button type="submit" name={i} onClick={e => deleteContent(e, content.id)} >Supprimer</Button>
            </div>
          )
        })
        : <Spin size="large" />
      }
    </div>
  )
}

export default remarkList