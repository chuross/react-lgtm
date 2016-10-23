import { handleActions } from 'redux-actions'
import { fetchImagesSuccess } from 'ui/actions/root'

const defaultState = {
  files: []
};

export default function uploadFile(state = defaultState, action) {
  return handleActions({
    [fetchImagesSuccess]: (state, action) => ({
      files: action.payload
    })
  }, state)(state, action);
}
