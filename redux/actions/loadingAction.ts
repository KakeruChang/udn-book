import { Action } from 'redux'

export interface loadingAction extends Action {
  type: string
}

export const START_LOADING = 'START_LOADING'
export const startLoading = (): loadingAction => ({
  type: START_LOADING
})

export const END_LOADING = 'END_LOADING'
export const endLoading = (): loadingAction => ({
  type: END_LOADING
})
