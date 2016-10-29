import indexSaga from 'ui/sagas/index/root'
import imageDetailSaga from 'ui/sagas/images/detail'
import { fork } from 'redux-saga/effects'

export default function* saga() {
  yield fork(indexSaga);
  yield fork(imageDetailSaga);
}
