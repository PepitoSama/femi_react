export default (remark) => {
  const action = {
    type: 'changeLookingRemark',
    remark
  }
  return action
}