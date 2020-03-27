export default (redirect) => {
  const action = {
    type: 'changeRedirect',
    redirect
  }
  console.log('Action in changeRedirect ', action)
  return action
}