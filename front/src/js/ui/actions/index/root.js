import { createAction } from 'redux-actions'

export const fetchImages = createAction('INDEX_FETCH_IMAGES', (offset = 0, limit = 20) => ({offset: offset, limit: limit}));
export const fetchImagesSuccess = createAction('INDEX_FETCH_IMAGES_SUCCESS', images => images);
export const fetchImagesFail = createAction('INDEX_FETCH_IMAGES_FAIL', error => error);

export const uploadImage = createAction('INDEX_UPLOAD_IMAGE', blob => blob);
export const uploadImageSuccess = createAction('INDEX_UPLOAD_IMAGE_SUCCESS', image => image);
export const uploadImageFail = createAction('INDEX_UPLOAD_IMAGE_FAIL', error => error);
