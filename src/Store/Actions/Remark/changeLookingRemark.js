export default (remark) => {
  const action = {
    type: 'changeLookingRemark',
    remark
  }
  console.log('Action in changeLookingRemark ', action)
  return action
}