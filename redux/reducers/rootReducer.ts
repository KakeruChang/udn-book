import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers, Action } from 'redux'

import loadingReducer, { LoadingContent } from './loadingReducer'
import pageChangingReducer from './pageChangingReducer'
import languageReducer from './languageReducer'
import languageDataReducer from './languageDataReducer'
import { LanguageDataContent } from '../actions/languageDataAction'

export interface RootStateType {
  isLoading: LoadingContent
  isPageChanging: boolean
  language: string
  data: LanguageDataContent
}

interface RootAction extends Action {
  type: string
  payload?: RootStateType
}

const rootReducer = (
  state: RootStateType,
  action: RootAction
): RootStateType => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload
    }
  }

  return combineReducers({
    isLoading: loadingReducer,
    isPageChanging: pageChangingReducer,
    language: languageReducer,
    data: languageDataReducer
  })(state, action)
}

export default rootReducer
