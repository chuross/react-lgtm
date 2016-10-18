import { handleActions } from 'redux-actions'
import { uploadFileAction } from 'ui/actions/root'

const defaultState = {
  file: null
};

export default function uploadFile(state = defaultState, action) {
  return handleActions({
    [uploadFileAction]: (state, action) => ({
      file: action.payload
    })
  }, state)(state, action);
}
