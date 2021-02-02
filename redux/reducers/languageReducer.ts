import { languageAction, CHINESE, ENGLISH } from 'redux/actions/languageAction'

const language = {
  zh: 'zh-tw',
  en: 'en'
}

const textReducer = (state = 'zh-tw', action: languageAction): string => {
  switch (action.type) {
    case CHINESE:
      return language.zh
    case ENGLISH:
      return language.en
    default:
      return state
  }
}

export default textReducer
