import { handleActions } from 'redux-actions'
import { fetchImagesSuccess, uploadImageSuccess } from 'ui/actions/index/root'

const defaultState = {
  images: []
};

export default handleActions({
  [fetchImagesSuccess]: (state, action) => ({
    images: action.payload
  }),
  [uploadImageSuccess]: (state, action) => ({
    images: [action.payload, ...state.images]
  })
}, defaultState);
