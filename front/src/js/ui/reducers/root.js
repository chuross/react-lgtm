import { handleActions } from 'redux-actions'
import { fetchImagesSuccess, uploadImageSuccess } from 'ui/actions/root'

const defaultState = {
  files: []
};

export default function uploadFile(state = defaultState, action) {
  return handleActions({
    [fetchImagesSuccess]: (state, action) => ({
      files: action.payload
    }),
    [uploadImageSuccess]: (state, action) => ({
      files: [action.payload, ...state.files]
    })
  }, state)(state, action);
}
