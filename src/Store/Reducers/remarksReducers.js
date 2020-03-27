export default (state = [], action) => {
  switch(action.type) {
    case 'addRemark':
      return [...state, action.remark]
    case 'addRemarks':
      return [...state, ...action.remarks]
    case 'removeRemark':
      console.log('remark reducer : TODO')
      return state
    case 'changeRemarks':
      return action.remarks
    default:
      return state
  }
}