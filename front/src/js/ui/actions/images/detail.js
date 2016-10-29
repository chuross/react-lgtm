import { createAction } from 'redux-actions'

export const fetchImage = createAction('IMAGE_DETAIL_FETCH_IMAGE');
export const fetchImageSuccess = createAction('IMAGE_DETAIL_FETCH_IMAGE_SUCCESS');
export const fetchImageFail = createAction('IMAGE_DETAI_FETCH_IMAGE_FAIL');
