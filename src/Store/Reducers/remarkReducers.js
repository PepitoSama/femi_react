export default (state = null, action) => {
  switch(action.type) {
    case 'changeLookingRemark':
      return action.remark
    case 'addResponse':
      const newRemark = state
      newRemark.responses = [...state.responses, action.response]
      return newRemark
    // Like a remark when seen
    // case 'likeRemark':
    //   const likeRemark = state
    //   return likeRemark
    // case 'dislikeRemark':
    //   state.likes.push({user: { userId: action.userId }})
    //   const likes = state.likes.map((like) => {
    //     if(like.user.userId !== action.userId) {
    //       return like
    //     }
    //     return null
    //   })
    //   state.likes = likes
    //   return state
    default:
      return state
  }
}