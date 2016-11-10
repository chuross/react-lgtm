import { handleActions } from 'redux-actions'
import { fetchImagesSuccess, uploadImageSuccess } from 'ui/actions/index/root'

const defaultState = {
  images: [],
  isScrollEnd: false
};

export default handleActions({
  [fetchImagesSuccess]: (state, action) => {
    console.log(action);
    return {
      images: action.payload.isInitialized ? action.payload.images : [...state.images, ...action.payload.images],
      isScrollEnd: action.payload.images.length === 0
    };
  },
  [uploadImageSuccess]: (state, action) => ({
    images: [action.payload, ...state.images],
    isScrollEnd: state.isScrollEnd
  })
}, defaultState);
