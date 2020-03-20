import React from 'react'

const loginForm = ({ postLogin }) => {
  return (
    <div>
      <p>Loggez vous</p>
      <form onSubmit = { postLogin } autoComplete="off">
        <input name="username" placeholder="login" />
        <input name="password" type="password" placeholder="password" />
        <button type="submit" >Envoyer !</button>
      </form>
    </div>
  )
}

export default loginForm