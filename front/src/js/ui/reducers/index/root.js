import { handleActions } from 'redux-actions'
import { fetchImagesSuccess, uploadImageSuccess } from 'ui/actions/index/root'

const defaultState = {
  images: []
};

export default function uploadFile(state = defaultState, action) {
  return handleActions({
    [fetchImagesSuccess]: (state, action) => ({
      images: action.payload
    }),
    [uploadImageSuccess]: (state, action) => ({
      images: [action.payload, ...state.images]
    })
  }, state)(state, action);
}
