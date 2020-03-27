export default (token) => {
  const action = {
    type: 'removeToken'
  }
  console.log('Action in removeToken ', action)
  return action
}