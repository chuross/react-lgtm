import { createAction } from 'redux-actions'

export const uploadFileAction = createAction('UPLOAD_FILE');
export const uploadFileSuccessAction = createAction('UPLOAD_FILE_SUCCESS');
export const uploadFileFailAction = createAction('UPLOAD_FILE_FAIL');
