import { Action } from 'redux'

export interface languageAction extends Action {
  type: string
}

export const CHINESE = 'CHINESE'
export const largeText = (): languageAction => ({
  type: CHINESE
})

export const ENGLISH = 'ENGLISH'
export const smallText = (): languageAction => ({
  type: ENGLISH
})
