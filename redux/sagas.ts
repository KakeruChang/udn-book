import { all, AllEffect, ForkEffect, put, takeEvery } from 'redux-saga/effects'
import axios from 'axios'

import { failure, getTestsSuccess, GET_TESTS_BEGIN } from './actions/testAction'

function* getSelfTests() {
  try {
    const res = yield axios.get('http://localhost:3000/apitest/test')
    yield put(getTestsSuccess(res.data))
  } catch (err) {
    yield put(failure(err))
  }
}

function* testSaga(): Iterator<ForkEffect<never>> {
  yield takeEvery(GET_TESTS_BEGIN, getSelfTests)
}

function* rootSaga(): Iterator<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AllEffect<Iterator<ForkEffect<never>, any, undefined>>
> {
  yield all([testSaga()])
}

export default rootSaga
// ===================================
// function* getTestsSaga() {
//   try {
//     const res = yield fetch('http://localhost:3000/apitest/test')
//     const data = yield res.json()
//     yield put(getTestsSuccess(data))
//   } catch (err) {
//     yield put(failure(err))
//   }
// }

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function* rootSaga(): Generator<AllEffect<ForkEffect<never>>, any, undefined> {
//   yield all([
//     // takeLatest(actionTypes.LOAD_DATA, loadDataSaga),
//     takeLatest(GET_TESTS_BEGIN, getTestsSaga)
//   ])
// }
// ===================================
