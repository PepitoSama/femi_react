// Cookies
import { bake_cookie, read_cookie } from 'sfcookies'

export default (state = [], action) => {
  state = read_cookie('remarks')
  switch(action.type) {
    case 'addRemark':
      const addRemark = [...state, action.remark]
      bake_cookie('ramarks', addRemark)
      return addRemark
    case 'addRemarks':
      const addRemarks = [...state, ...action.remarks]
      bake_cookie('ramarks', addRemarks)
      return addRemarks
    case 'removeRemark':
      const removeRemark = state.filter((remark) => {
        return remark.id !== action.id
      })
      bake_cookie('ramarks', removeRemark)
      return removeRemark
    case 'changeRemarks':
      bake_cookie('remarks', action.remarks)
      return action.remarks
    case 'likeRemark':
      state.find((remark) => remark.id === action.remarkId).liked = true
      return state
    case 'dislikeRemark':
      state.find((remark) => remark.id === action.remarkId).liked = false
      return state
    default:
      return state
  }
}