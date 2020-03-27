import { combineReducers } from 'redux'
import tokenReducers from './tokenReducers'
import loginReducers from './loginReducers'
import remarksReducers from './remarksReducers'
import redirectReducers from './redirectReducers'
import remarkReducers from './remarkReducers'

const allReducers = combineReducers({
  token: tokenReducers,
  isLogged: loginReducers,
  remarks: remarksReducers,
  redirect: redirectReducers,
  remark: remarkReducers
})

export default allReducers