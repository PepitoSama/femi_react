export default (remarkId) => {
  const action = {
    type: 'dislikeRemark',
    remarkId
  }
  return action
}