export default (state = null, action) => {
  switch(action.type) {
    case 'changeSearch':
      return action.search
    default:
      return state
  }
}