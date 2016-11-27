// import Dictionary from '../dictionary/dictionary.js'
import factory from '../factory.js'
// import Client from '../Client'

const takeWord = function(oldElement, wordBase, action_target, arg) {
  const target = oldElement[action_target]
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
    case 'INSERT_DICTIONARY': {
      return {
        ...state,
        dictionary: action.dictionary
      }
    }
    case 'SHOW_WORD_FACTORY': {
      return {
        ...state,
        activeWord: action.id,        
        target: action.target,
        dictionary: action.dictionary
      }
    }
    case 'CREATE_WORD': {
      const elementIndex = state.Words.findIndex(t => t.id === action.activeWord)
      const oldElement = state.Words[elementIndex]
      // const wordBase = Dictionary.find(o => o.id === action.id)
      const [updated, initialized] = takeWord(oldElement, action.wordBase, action.target, action.arg)  
      const newElement = {
        ...oldElement,
        [action.target]: updated,
      }
      return {
        ...state,
        activeWord: initialized.id,
        target: false,
        Words: [
          ...state.Words.slice(0, elementIndex),
          newElement,
          ...state.Words.slice(elementIndex + 1, state.Words.length),
          initialized,
        ],
      }
    }
    case 'CHANGE_ATTRIBUTE': {
      const elementIndex = state.Words.findIndex(t => t.id === action.id)
      const oldElement = state.Words[elementIndex]
      const newElement = {
        ...oldElement,
        [action.attr]: action.change_to,
      }
      return {
        ...state,
        Words: [
          ...state.Words.slice(0, elementIndex),
          newElement,
          ...state.Words.slice(elementIndex + 1, state.Words.length),
        ],
      }
    }
    case 'CHANGE_NUMBER': {
      const elementIndex = state.Words.findIndex(t => t.id === action.id)
      const oldElement = state.Words[elementIndex]

      const number = oldElement.number === 'singular' ? 'plural' : 'singular'
      const possessive = number === 'singular' ? `${oldElement.word.singular}'s` :
                        `${oldElement.word.plural}${oldElement.word.plural[-1] === 's' ? "'" : "'s"}`

      const newElement = {
        ...oldElement,
        number: number,
        word: {
          ...oldElement.word,
          possessive: possessive,
        },
        form: oldElement.form === 'possessive' ? 'possessive' : number
      }
      return {
        ...state,
        Words: [
          ...state.Words.slice(0, elementIndex),
          newElement,
          ...state.Words.slice(elementIndex + 1, state.Words.length),
        ],
      }
    }
    case 'DELETE_ELEMENT': {
      const filtered = state.Words.filter(o => o.id !== action.id)
      const elementIndex = filtered.findIndex(t => t.id === action.parentId)
      const oldElement = state.Words[elementIndex]
      const newRole = action.role.slice(-1) === 's' ?
                      oldElement[action.role].filter(o => o !== action.id) : null   
      const newElement = {
        ...oldElement,
        [action.role]: newRole
      }
      return {
        ...state,
        Words: [
          ...filtered.slice(0, elementIndex),
          newElement,
          ...filtered.slice(elementIndex + 1, filtered.length)
        ]
      }
    }
    case 'CHANGE_EXAMPLE': {
      return action.state
    }
    default: {
      return state
    }
  }
}

export default reducer