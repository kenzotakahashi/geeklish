// import { score } from '../../shared/score'
import { getDescendantIds } from '../../shared/getDescendantIds'
import { takeWord, getContainer } from '../../shared/others'
import { mobileInitialState } from '../initialState'

function reducer(state, action) {
  switch (action.type) {
    // ======================= Route ================================
    case 'ROUTE_SENTENCES': {
      return {
        ...state,
        route: 'sentences',
        routeAction: action.routeAction,
        examples: action.examples,
        Words: action.words,
      }
    }
    case 'ROUTE_CANVAS': {
      return {
        ...state,
        route: 'canvas',
        title: action.project.project.title,
        routeAction: action.routeAction,
        Words: action.project.words,
        answer: action.project.words,
        userAnswer: mobileInitialState(),
      }
    }

    // ====================== App ====================================

    case 'CHANGE_MODAL': {
      return {
        ...state,
        currentModal: action.currentModal
      }
    }

    // ====================== Canvas ==================================
    case 'SHOW_OPTIONS': {
      return {
        ...state,
        saved: false,
        activeWord: action._id,
        target: []
      }
    }
    case 'SHOW_WORD_FACTORY': {
      return {
        ...state,
        saved: false,
        activeWord: action._id, 
        target: action.target,
        dictionary: action.dictionary
      }
    }
    case 'CREATE_WORD': {      
      const elementIndex = state.Words.findIndex(t => t._id === action.activeWord)
      const parent = state.Words[elementIndex]
      const [updated, initialized] = takeWord(parent, action.wordBase, action.target)

      const newWords = Object.assign([], state.Words)
      const resetComplement = action.target[0] === 'particle' ? {
                                complementIndex: null,
                                complements: []
                              } : {}
      newWords[elementIndex] = {
        ...parent,
        [action.target[0]]: updated,
        ...resetComplement
      }
      newWords.push(initialized)

      let newActiveWord
      if (parent.pos === 'Clause') {
        if (action.target[0] === 'subject' && parent.verb === null) {
          newActiveWord = parent._id
        } else if (action.target[0] === 'verb' && parent.subject === null) {
          newActiveWord = parent._id
        } else {
          newActiveWord = initialized._id
        }
      } else {
        newActiveWord = initialized._id
      }

      return {
        ...state,
        saved: false,
        activeWord: newActiveWord,
        target: [],
        Words: newWords
      }
    }
    case 'CHANGE_ATTRIBUTE': {
      const elementIndex = state.Words.findIndex(t => t._id === action._id)
      const parent = state.Words[elementIndex]
      const newWords = Object.assign([], state.Words)
      newWords[elementIndex] = {
        ...parent,
        [action.attr]: action.change_to,
      }

      // console.log(score())

      return {
        ...state,
        saved: false,
        Words: newWords,
      }
    }
    case 'DELETE_ELEMENT': {
      const deletedIds = getDescendantIds(action._id, state.Words)
      const filtered = state.Words.filter(o => !deletedIds.includes(o._id))

      // console.log(`${state.Words.length} - ${filtered.length}`)

      const elementIndex = filtered.findIndex(t => t._id === action.parentId)
      const parent = filtered[elementIndex]

      let newRole
      if (action.role[1] === null) {
        newRole = action.role[0].slice(-1) === 's' ?
                  parent[action.role[0]].filter(o => o !== action._id) : null
      }
      else {
        newRole = Object.assign([], parent.complements)
        newRole[action.role[1]]._id = null
      }
      
      const newWords = Object.assign([], filtered)
      const resetComplement = action.role[0] === 'particle' ? {
                                complementIndex: null,
                                complements: []
                              } : {}
      newWords[elementIndex] = {
        ...parent,
        [action.role[0]]: newRole,
        ...resetComplement
      }
      return {
        ...state,
        saved: false,
        target: [],
        Words: newWords
      }
    }
    case 'USE_CONJUNCTION': {
      const elementIndex = state.Words.findIndex(t => t._id === action.parentId)
      const parent = state.Words[elementIndex]
      const [updated, initialized] = takeWord(
        parent,
        getContainer(action.element.pos),
        action.target,
        {child: action.element._id}
      )

      const newWords = Object.assign([], state.Words)
      newWords[elementIndex] = {
        ...parent,
        [action.target[0]]: updated,
      }
      newWords.push(initialized)

      return {
        ...state,
        saved: false,
        activeWord: initialized._id,
        target: [],
        Words: newWords
      }
    }

    case 'UNDO_CONJUNCTION': {
      const filtered = state.Words.filter(o => o._id !== action.element._id)
      const elementIndex = filtered.findIndex(t => t._id === action.parentId)
      const parent = filtered[elementIndex]
      const childId = action.element[action.childRole][0]

      let updated
      if (action.thisRole[1] === null) {
        updated = action.thisRole[0].slice(-1) === 's' ? [childId] : childId
      }
      else {
        updated = Object.assign([], parent.complements)
        updated[action.thisRole[1]]._id = childId
      }

      const newWords = Object.assign([], filtered)
      newWords[elementIndex] = {
        ...parent,
        [action.thisRole[0]]: updated
      }
      return {
        ...state,
        saved: false,
        Words: newWords
      }
    }

    case 'SET_COMPLEMENT': {
      const elementIndex = state.Words.findIndex(t => t._id === action._id)
      const oldElement = state.Words[elementIndex]
      const complementArray = oldElement.valid_complements[action.verbType][action.index]

      const newWords = Object.assign([], state.Words)
      newWords[elementIndex] = {
        ...oldElement,
        complementIndex: action.index,
        complements: complementArray.map(o => ({category: o, _id: null}))
      }

      return {
        ...state,
        currentModal: {name: null},
        target: [],
        Words: newWords
      }
    }
  
    default: {
      return state
    }
  }
}

export default reducer