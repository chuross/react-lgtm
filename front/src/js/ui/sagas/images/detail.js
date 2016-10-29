import { takeEvery } from 'redux-saga'
import { call, put, fork } from 'redux-saga/effects'
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

export default function* detail() {
  yield fork(handleFetchImage);
}
