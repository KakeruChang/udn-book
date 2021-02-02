import {
  textAction,
  LARGE_TEXT,
  SMALL_TEXT,
  MEDIUM_TEXT
} from 'redux/actions/textAction'

const textSize = {
  L: 'L',
  M: 'M',
  S: 'S'
}

const textReducer = (state = 'M', action: textAction): string => {
  switch (action.type) {
    case LARGE_TEXT:
      return textSize.L
    case MEDIUM_TEXT:
      return textSize.M
    case SMALL_TEXT:
      return textSize.S
    default:
      return state
  }
}

export default textReducer
