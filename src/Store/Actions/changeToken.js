export default (token) => {
  const action = {
    type: 'changeToken',
    token
  }
  console.log('Action in changeToken ', action)
  return action
}