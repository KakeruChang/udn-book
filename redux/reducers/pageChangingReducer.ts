// import { HYDRATE } from 'next-redux-wrapper'
import {
  START_PAGE_CHANGING,
  END_PAGE_CHANGING,
  pageChangingAction
} from 'redux/actions/pageChangingAction'

const pageChangingReducer = (
  state = false,
  action: pageChangingAction
): boolean => {
  switch (action.type) {
    case START_PAGE_CHANGING:
      return true
    case END_PAGE_CHANGING:
      return false
    default:
      return state
  }
}

export default pageChangingReducer
