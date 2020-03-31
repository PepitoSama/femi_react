import { combineReducers } from 'redux'
import userReducers from './userReducers'
import remarksReducers from './remarksReducers'
import redirectReducers from './redirectReducers'
import remarkReducers from './remarkReducers'

const allReducers = combineReducers({
  user: userReducers,
  remarks: remarksReducers,
  redirect: redirectReducers,
  remark: remarkReducers
})

export default allReducers