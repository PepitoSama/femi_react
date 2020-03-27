export default (remarks) => {
  const action = {
    type: 'addRemarks',
    remarks
  }
  console.log('Action in addRemarks ', action)
  return action
}