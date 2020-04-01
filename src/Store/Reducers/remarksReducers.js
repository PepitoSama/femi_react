// Cookies
import { bake_cookie, read_cookie } from 'sfcookies'

export default (state = [], action) => {
  state = read_cookie('remarks')
  switch(action.type) {
    case 'addRemark':
      const addRemark = [...state, action.remark]
      bake_cookie('remarks', addRemark)
      return addRemark
    case 'addRemarks':
      const addRemarks = [...state, ...action.remarks]
      bake_cookie('remarks', addRemarks)
      return addRemarks
    case 'removeRemark':
      const removeRemark = state.filter((remark) => {
        return remark.id !== action.id
      })
      bake_cookie('remarks', removeRemark)
      return removeRemark
    case 'changeRemarks':
      bake_cookie('remarks', action.remarks)
      return action.remarks
    case 'likeRemark':
      state.find((remark) => remark.id === action.remarkId).liked = true
      state.find((remark) => remark.id === action.remarkId).countLike++
      bake_cookie('remarks', state)
      return state
    case 'dislikeRemark':
      state.find((remark) => remark.id === action.remarkId).liked = false
      state.find((remark) => remark.id === action.remarkId).countLike--
      bake_cookie('remarks', state)
      return state
    default:
      return state
  }
}