import { handleActions } from 'redux-actions'
import { loading } from 'ui/actions/loading'

const defaultState = {
  isLoading: false
};

export default (state = defaultState, action) => {
  return handleActions({
    [loading]: (state, action) => ({
      isLoading: action.payload
    })
  })(state, action);
}
