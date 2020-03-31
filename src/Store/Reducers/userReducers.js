import jwtDecode from 'jwt-decode'
import { bake_cookie, read_cookie, delete_cookie } from 'sfcookies'

export default (state = null, action) => {
  if(read_cookie('user').token !== undefined)
    state = read_cookie('user')

  switch(action.type) {
    case 'login':
      const decode = jwtDecode(action.token)
      const user = {
        token: action.token,
        username: decode.username,
        userId: decode._id
      }
      bake_cookie('user', user)
      return user
    case 'logout':
      delete_cookie('user')
      return null
    default:
      return state
  }
}