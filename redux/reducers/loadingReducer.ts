// import { HYDRATE } from 'next-redux-wrapper'
import {
  START_LOADING,
  END_LOADING,
  loadingAction
} from 'redux/actions/loadingAction'

export interface LoadingContent {
  status: boolean
  title: string
}

const initialState = {
  status: false,
  title: ''
}

const loadingReducer = (
  state = initialState,
  action: loadingAction
): LoadingContent => {
  switch (action.type) {
    case START_LOADING:
      return { ...state, status: true, title: action.payload.title }
    case END_LOADING:
      return { ...state, status: false }
    default:
      return state
  }
}

export default loadingReducer
