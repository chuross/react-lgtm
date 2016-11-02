import { handleActions } from 'redux-actions'
import { fetchImageSuccess } from 'ui/actions/images/detail'

const defaultState = {
  image: null
};

export default handleActions({
  [fetchImageSuccess]: (state, action) => ({
    image: action.payload
  })
}, defaultState);
