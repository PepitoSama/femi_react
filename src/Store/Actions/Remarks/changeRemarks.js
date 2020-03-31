export default (remarks) => {
  const action = {
    type: 'changeRemarks',
    remarks
  }
  return action
}