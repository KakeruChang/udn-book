// import { HYDRATE } from 'next-redux-wrapper'
import {
  FAILURE,
  GET_TESTS_SUCCESS,
  TestAction,
  TestContent
} from 'redux/actions/testAction'

export interface TestStateType {
  data?: Array<TestContent>
}

export const initialTestState: TestStateType = {
  data: []
}

const testReducer = (
  state: TestStateType = initialTestState,
  action: TestAction
): TestStateType => {
  switch (action.type) {
    case FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      }

    case GET_TESTS_SUCCESS:
      return {
        ...state,
        ...{ data: action.payload }
      }

    default:
      return state
  }
}

export default testReducer
