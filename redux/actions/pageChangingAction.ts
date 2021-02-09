import { Action } from 'redux'

export interface pageChangingAction extends Action {
  type: string
}

export const START_PAGE_CHANGING = 'START_PAGE_CHANGING'
export const startPageChanging = (): pageChangingAction => ({
  type: START_PAGE_CHANGING
})

export const END_PAGE_CHANGING = 'END_PAGE_CHANGING'
export const endPageChanging = (): pageChangingAction => ({
  type: END_PAGE_CHANGING
})
