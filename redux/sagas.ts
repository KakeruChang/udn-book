import { all, AllEffect, ForkEffect, put, takeEvery } from 'redux-saga/effects'
// import axios from 'axios'

import {
  failure,
  getLanguageDataSuccess,
  GET_LANGUAGEDATA_BEGIN
} from './actions/languageDataAction'

function* getLanguageData() {
  try {
    const TestPromise = new Promise((resolve) => {
      setTimeout(() => {
        resolve({ zh: { test: true }, en: { test2: false } })
      }, 250)
    })
    // const res = yield axios.get('http://localhost:3000/apitest/test')
    const res = yield TestPromise
    yield put(getLanguageDataSuccess(res))
  } catch (err) {
    yield put(failure(err))
  }
}

function* testSaga(): Iterator<ForkEffect<never>> {
  yield takeEvery(GET_LANGUAGEDATA_BEGIN, getLanguageData)
}

function* rootSaga(): Iterator<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  AllEffect<Iterator<ForkEffect<never>, any, undefined>>
> {
  yield all([testSaga()])
}

export default rootSaga
