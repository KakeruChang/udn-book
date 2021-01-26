import { Action } from 'redux'

export interface TestContent {
  [key: string]: string
}

export interface TestAction extends Action {
  type: string
  payload?: Array<TestContent>
  error?: Error
}

export const FAILURE = 'FAILURE'

export const GET_TESTS_BEGIN = 'GET_TESTS_BEGIN'
export const getTestsBegin = (): {
  type: string
} => ({
  type: GET_TESTS_BEGIN
})

export const GET_TESTS_SUCCESS = 'GET_TESTS_SUCCESS'
export const getTestsSuccess = (tests: Array<TestContent>): TestAction => ({
  type: GET_TESTS_SUCCESS,
  payload: tests
})

export const failure = (error: Error): TestAction => ({
  type: FAILURE,
  error
})
