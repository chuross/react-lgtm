import { handleActions } from 'redux-actions'
import { fetchImageSuccess, confirmDeleteImage } from 'ui/actions/images/detail'

const defaultState = {
  image: null,
  isConfirmDialogOpen: false
};

export default handleActions({
  [fetchImageSuccess]: (state, action) => Object.assign({}, state, {
    image: action.payload
  }),
  [confirmDeleteImage]: (state, action) => Object.assign({}, state, {
    isConfirmDialogOpen: action.payload
  })
}, defaultState);
