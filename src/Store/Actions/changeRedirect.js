export default (redirect) => {
  const action = {
    type: 'changeRedirect',
    redirect
  }
  return action
}