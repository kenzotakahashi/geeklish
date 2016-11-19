import Dictionary from '../dictionary/dictionary.js'
import factory from '../factory.js'

const takeWord = function(oldWord, wordBase, action_target, arg) {
  const target = oldWord[action_target]
  const init = factory[wordBase.pos](wordBase, arg)
  const updated = Array.isArray(target) ? target.concat(init.id) : init.id
  return [updated, init]
}

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_OPTIONS': {
      return {
        ...state,
        activeWord: state.activeWord === action.id ? 1 : action.id,
        target: null
      }
    }
    case 'SHOW_WORD_FACTORY': {
      return {
        ...state,
        activeWord: action.id,        
        target: action.target
      }
    }
    case 'CREATE_WORD': {
      const wordIndex = state.Words.findIndex(t => t.id === action.activeWord)
      const oldWord = state.Words[wordIndex]
      const wordBase = Dictionary.find(o => o.id === action.id)
      const [updated, initialized] = takeWord(oldWord, wordBase, action.target, action.arg)  
      const newWord = {
        ...oldWord,
        [action.target]: updated,
      }

      return {
        ...state,
        activeWord: state.Sentence,
        target: false,
        Words: [
          ...state.Words.slice(0, wordIndex),
          newWord,
          ...state.Words.slice(wordIndex + 1, state.Words.length),
          initialized,
        ],
      }
    }
    case 'CHANGE_ATTRIBUTE': {
      const wordIndex = state.Words.findIndex(t => t.id === action.id)
      const oldWord = state.Words[wordIndex]
      const newWord = {
        ...oldWord,
        [action.attr]: action.change_to,
      }
      return {
        ...state,
        Words: [
          ...state.Words.slice(0, wordIndex),
          newWord,
          ...state.Words.slice(wordIndex + 1, state.Words.length),
        ],
      }
    }
    case 'CHANGE_NUMBER': {
      const wordIndex = state.Words.findIndex(t => t.id === action.id)
      const oldWord = state.Words[wordIndex]

      const number = oldWord.number === 'singular' ? 'plural' : 'singular'
      const p = number === 'singular' ? `${oldWord.word.singular}'s` :
                `${oldWord.word.plural}${oldWord.word.plural[-1] === 's' ? "'" : "'s"}`

      const newWord = {
        ...oldWord,
        number: number,
        word: {
          ...oldWord.word,
          p: p,
        },
        mode: oldWord.mode === 'p' ? 'p' : number
      }
      return {
        ...state,
        Words: [
          ...state.Words.slice(0, wordIndex),
          newWord,
          ...state.Words.slice(wordIndex + 1, state.Words.length),
        ],
      }
    }
    default: {
      return state
    }
  }
}

export default reducer