export default (id) => {
  const action = {
    type: 'removeRemark',
    id
  }
  console.log('Action in removeRemark ', action)
  return action
}