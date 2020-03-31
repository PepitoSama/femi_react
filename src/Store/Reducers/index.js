import { combineReducers } from 'redux'
import userReducers from './userReducers'
import remarksReducers from './remarksReducers'
import redirectReducers from './redirectReducers'
import remarkReducers from './remarkReducers'
import searchReducers from './searchReducers'

const allReducers = combineReducers({
  user: userReducers,
  remarks: remarksReducers,
  redirect: redirectReducers,
  remark: remarkReducers,
  search: searchReducers
})

export default allReducers