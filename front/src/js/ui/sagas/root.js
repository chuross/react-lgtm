import { takeEvery } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import { uploadFileAction, uploadFileSuccessAction, uploadFileFailAction } from 'ui/actions/root'

function* uploadFile(action) {
  try {
    yield put(uploadFileSuccessAction());
  } catch(e) {
    yield put(uploadFileFailAction(e));
  }
}

export default function* root() {
  yield* takeEvery(uploadFileAction().type, uploadFile);
}
