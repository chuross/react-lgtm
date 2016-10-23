import { createAction } from 'redux-actions'

export const fetchImages = createAction('FETCH_IMAGES');
export const fetchImagesSuccess = createAction('FETCH_IMAGES_SUCCESS');
export const fetchImagesFail = createAction('FETCH_IMAGES_FAIL');

export const uploadImage = createAction('UPLOAD_IMAGE');
export const uploadImageSuccess = createAction('UPLOAD_IMAGE_SUCCESS');
export const uploadImageFail = createAction('UPLOAD_IMAGE_FAIL');
