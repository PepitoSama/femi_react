export default (response) => {
  const action = {
    type: 'addResponse',
    response
  }
  return action
}