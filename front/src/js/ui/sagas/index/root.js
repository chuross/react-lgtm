import { takeEvery } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import LgtmApi from 'infrastructure/LgtmApi'
import { loading } from 'ui/actions/loading'
import * as actions from 'ui/actions/index/root'

function* fetchImages(action) {
  yield put(loading(true));
  try {
    const result = yield call(LgtmApi.getImages, action.payload.offset, action.payload.limit);
    yield put(actions.fetchImagesSuccess(result, action.payload.offset === 0));
  } catch(e) {
    yield put(actions.fetchImagesFail(e));
  }
  yield put(loading(false));
}

function* handleFetchImages() {
  yield* takeEvery(actions.fetchImages.toString(), fetchImages);
}

function* uploadImage(action) {
  try {
    const result = yield call(LgtmApi.uploadImage, action.payload);
    yield put(actions.uploadImageSuccess(result));
  } catch(e) {
    yield put(actions.uploadImageFail(e));
  }
}

function* handleUploadImage() {
  yield* takeEvery(actions.uploadImage.toString(), uploadImage);
}

export default function* root() {
  yield fork(handleFetchImages);
  yield fork(handleUploadImage);
}
