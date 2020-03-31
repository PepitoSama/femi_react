export default (id) => {
  const action = {
    type: 'removeRemark',
    id
  }
  return action
}