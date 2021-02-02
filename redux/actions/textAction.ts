import { Action } from 'redux'

export interface textAction extends Action {
  type: string
}

export const LARGE_TEXT = 'LARGE_TEXT'
export const largeText = (): textAction => ({
  type: LARGE_TEXT
})

export const SMALL_TEXT = 'SMALL_TEXT'
export const smallText = (): textAction => ({
  type: SMALL_TEXT
})

export const MEDIUM_TEXT = 'MEDIUM_TEXT'
export const mediumText = (): textAction => ({
  type: MEDIUM_TEXT
})
