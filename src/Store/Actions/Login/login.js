export default (token) => {
  const action = {
    type: 'login',
    token
  }
  return action
}