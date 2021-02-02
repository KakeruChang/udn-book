import {
  FAILURE,
  GET_LANGUAGEDATA_SUCCESS,
  LanguageDataAction,
  LanguageDataContent
} from 'redux/actions/languageDataAction'

export const initialTestState: LanguageDataContent = {
  zh: {},
  en: {}
}

const languageDataReducer = (
  state: LanguageDataContent = initialTestState,
  action: LanguageDataAction
): LanguageDataContent => {
  switch (action.type) {
    case FAILURE:
      return {
        ...state,
        ...{ error: action.error }
      }

    case GET_LANGUAGEDATA_SUCCESS:
      return {
        ...state,
        ...{ zh: action.payload.zh, en: action.payload.en }
      }

    default:
      return state
  }
}

export default languageDataReducer
