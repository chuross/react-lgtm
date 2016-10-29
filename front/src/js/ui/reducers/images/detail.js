import { handleActions } from 'redux-actions'
import { fetchImageSuccess } from 'ui/actions/images/detail'

const defaultState = {
  image: null
};

export default (state = defaultState, action) => {
  return handleActions({
    [fetchImageSuccess]: (state, action) => ({
      image: action.payload
    })
  })(state, action);
}
