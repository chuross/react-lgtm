import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import LgtmApi from 'infrastructure/LgtmApi'
import { uploadFileAction, uploadFileSuccessAction, uploadFileFailAction } from 'ui/actions/root'

function* uploadFile(action) {
  try {
    const { result, error } = yield call(LgtmApi.uploadImage, action.payload);
    yield put(uploadFileSuccessAction(result));
  } catch(e) {
    yield put(uploadFileFailAction(e));
  }
}

export default function* root() {
  yield* takeEvery(uploadFileAction().type, uploadFile);
}
