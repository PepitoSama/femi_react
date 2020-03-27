export default (state = null, action) => {
  switch(action.type) {
    case 'changeLookingRemark':
      return action.remark
    case 'addResponse':
      const newRemark = state
      newRemark.responses = [...state.responses, action.response]
      return newRemark
    default:
      return state
  }
}