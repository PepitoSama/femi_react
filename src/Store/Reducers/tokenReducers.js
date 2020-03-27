export default (state = null, action) => {
  switch(action.type) {
    case 'changeToken':
      console.log('Token as state : ', action.token)
      return action.token
    case 'removeToken':
      return null
    default:
      return state
  }
}