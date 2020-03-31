export default (remarkId) => {
  const action = {
    type: 'likeRemark',
    remarkId
  }
  return action
}