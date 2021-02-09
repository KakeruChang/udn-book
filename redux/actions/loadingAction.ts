import { Action } from 'redux'

export interface loadingAction extends Action {
  type: string
  payload?: {
    title: string
  }
}

export const START_LOADING = 'START_LOADING'
export const startLoading = (title: string): loadingAction => ({
  type: START_LOADING,
  payload: { title }
})

export const END_LOADING = 'END_LOADING'
export const endLoading = (): loadingAction => ({
  type: END_LOADING
})
