import { combineReducers } from 'redux'
import loading from 'ui/reducers/loading'
import indexRoot from 'ui/reducers/index/root'
import imageDetail from 'ui/reducers/images/detail'

export default combineReducers({
  loading: loading,
  index: indexRoot,
  images: combineReducers({ detail: imageDetail })
});
