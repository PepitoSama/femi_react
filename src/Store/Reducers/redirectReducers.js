export default (state = null, action) => {
  switch(action.type) {
    case 'changeRedirect':
      return action.redirect
    default:
      return state
  }
}