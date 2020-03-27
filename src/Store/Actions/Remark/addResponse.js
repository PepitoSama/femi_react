export default (response) => {
  const action = {
    type: 'addResponse',
    response
  }
  console.log('Action in addResponse ', action)
  return action
}