import { takeEvery } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
import { hashHistory } from 'react-router'
import LgtmApi from 'infrastructure/LgtmApi'
import { loading } from 'ui/actions/loading'
import * as actions from 'ui/actions/images/detail'

function* fetchImage(action) {
  yield put(loading(true));
  try {
    const result = yield call(LgtmApi.getImage, action.payload);
    yield put(actions.fetchImageSuccess(result));
  } catch(e) {
    yield put(actions.fetchImageFail(e));
  }
  yield put(loading(false));
}

function* handleFetchImage() {
  yield* takeEvery(actions.fetchImage.toString(), fetchImage);
}

function* deleteImage(action) {
  yield put(loading(true));
  try {
    yield call(LgtmApi.deleteImage, action.payload);
    hashHistory.push('/');
  } catch(e) {
    yield put(actions.fetchImageFail(e));
  }
  yield put(loading(false));
}

function* handleDeleteImage() {
  yield* takeEvery(actions.deleteImage.toString(), deleteImage);
}

export default function* detail() {
  yield fork(handleFetchImage);
  yield fork(handleDeleteImage);
}
