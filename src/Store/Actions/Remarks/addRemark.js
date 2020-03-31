export default (remark) => {
  const action = {
    type: 'addRemark',
    remark
  }
  return action
}