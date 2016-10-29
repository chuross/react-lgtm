import { createAction } from 'redux-actions'

export const fetchImages = createAction('INDEX_FETCH_IMAGES');
export const fetchImagesSuccess = createAction('INDEX_FETCH_IMAGES_SUCCESS');
export const fetchImagesFail = createAction('INDEX_FETCH_IMAGES_FAIL');

export const uploadImage = createAction('INDEX_UPLOAD_IMAGE');
export const uploadImageSuccess = createAction('INDEX_UPLOAD_IMAGE_SUCCESS');
export const uploadImageFail = createAction('INDEX_UPLOAD_IMAGE_FAIL');
