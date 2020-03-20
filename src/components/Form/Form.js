import React from 'react'

const IdForm = ({ postContent, connected }) => {
  const disabled = connected
    ? false
    : true

  const placeholder = connected
    ? 'Le contenu'
    : 'Connectez vous'

  return (
    <div>
      <form onSubmit = { postContent } autoComplete="off" >
        <input name="content" placeholder={placeholder} disabled={disabled} />
        <button type="submit" disabled={disabled}>Envoyer !</button>
      </form>
    </div>
  )
}

export default IdForm