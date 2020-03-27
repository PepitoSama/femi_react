export default (remarks) => {
  const action = {
    type: 'changeRemarks',
    remarks
  }
  console.log('Action in changeRemarks ', action)
  return action
}