import { handleActions } from 'redux-actions'
import { fetchImagesSuccess, uploadImageSuccess } from 'ui/actions/index/root'

const defaultState = {
  images: [],
  isScrollEnd: false
};

export default handleActions({
  [fetchImagesSuccess]: (state, action) => ({
    images: [...state.images, ...action.payload],
    isScrollEnd: action.payload.length === 0
  }),
  [uploadImageSuccess]: (state, action) => ({
    images: [action.payload, ...state.images],
    isScrollEnd: state.isScrollEnd
  })
}, defaultState);
