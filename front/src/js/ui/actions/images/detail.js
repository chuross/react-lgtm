import { createAction } from 'redux-actions'

export const fetchImage = createAction('IMAGE_DETAIL_FETCH_IMAGE', imageId => imageId);
export const fetchImageSuccess = createAction('IMAGE_DETAIL_FETCH_IMAGE_SUCCESS', image => image);
export const fetchImageFail = createAction('IMAGE_DETAI_FETCH_IMAGE_FAIL', error => error);
