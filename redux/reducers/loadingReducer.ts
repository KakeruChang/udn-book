// import { HYDRATE } from 'next-redux-wrapper'
import {
  START_LOADING,
  END_LOADING,
  loadingAction
} from 'redux/actions/loadingAction'

const loadingReducer = (state = false, action: loadingAction): boolean => {
  switch (action.type) {
    case START_LOADING:
      return true
    case END_LOADING:
      return false
    default:
      return state
  }
}

export default loadingReducer
