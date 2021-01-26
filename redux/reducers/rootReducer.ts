import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers, Action } from 'redux'
// import testReducer, { TestStateType } from './testReducer'
// import { TestContent } from '../actions/testAction'
import loadingReducer from './loadingReducer'

export interface RootStateType {
  // tests: TestStateType
  isLoading: boolean
}
interface RootAction extends Action {
  type: string
  payload?: boolean
}

const rootReducer = (
  state: RootStateType,
  action: RootAction
): RootStateType => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      isLoading: action.payload
    }
  }

  return combineReducers({
    // tests: testReducer,
    isLoading: loadingReducer
  })(state, action)
}

export default rootReducer
