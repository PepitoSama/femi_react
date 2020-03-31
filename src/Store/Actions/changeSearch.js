export default (search) => {
  const action = {
    type: 'changeSearch',
    search
  }
  return action
}