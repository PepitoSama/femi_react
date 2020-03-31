export default (remarks) => {
  const action = {
    type: 'addRemarks',
    remarks
  }
  return action
}