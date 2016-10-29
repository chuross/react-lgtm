import { combineReducers } from 'redux'
import loading from 'ui/reducers/loading'
import indexRoot from 'ui/reducers/index/root'

export default combineReducers({
  loading: loading,
  index: indexRoot
});
