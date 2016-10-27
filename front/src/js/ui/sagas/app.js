import rootSaga from 'ui/sagas/index/root'
import { fork } from 'redux-saga/effects'

export default function* saga() {
  yield fork(rootSaga);
}
