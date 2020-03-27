export default (remark) => {
  const action = {
    type: 'addRemark',
    remark
  }
  console.log('Action in addRemark ', action)
  return action
}