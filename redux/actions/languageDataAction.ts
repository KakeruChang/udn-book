import { Action } from 'redux'

export interface LanguageDataContent {
  zh: { [key: string]: any }
  en: { [key: string]: any }
}

export interface LanguageDataAction extends Action {
  type: string
  payload?: LanguageDataContent
  error?: Error
}

export const GET_LANGUAGEDATA_BEGIN = 'GET_LANGUAGEDATA_BEGIN'
export const getLanguageBegin = (): {
  type: string
} => ({
  type: GET_LANGUAGEDATA_BEGIN
})

export const GET_LANGUAGEDATA_SUCCESS = 'GET_LANGUAGEDATA_SUCCESS'
export const getLanguageDataSuccess = ({
  zh,
  en
}: LanguageDataContent): LanguageDataAction => ({
  type: GET_LANGUAGEDATA_SUCCESS,
  payload: { zh, en }
})

export const FAILURE = 'FAILURE'
export const failure = (error: Error): LanguageDataAction => ({
  type: FAILURE,
  error
})
