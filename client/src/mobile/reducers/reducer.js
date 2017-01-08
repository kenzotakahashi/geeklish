// import { score } from '../../shared/score'
import { takeWord, getContainer, createWordHelper, setComplementHelper,
         deleteElementHelper } from '../../shared/others'
import { mobileInitialState } from '../initialState'

function reducer(state, action) {
  switch (action.type) {
    // ======================= Route ================================
    case 'ROUTE_SENTENCES': {
      return {
        ...state,
        route: 'examples',
        previous: action.previous,
        routeAction: action.routeAction,
        examples: action.examples,
      }
    }
    case 'ROUTE_CANVAS': {
      // quick fix
      if (action.routeAction === 'backward') {
        return {
          ...state,
          route: 'canvas',
          routeAction: action.routeAction
        }
      } else {
        return {
          ...state,
          route: 'canvas',
          previous: action.previous,
          routeAction: action.routeAction,
          example: action._id,
          title: action.project.project.title,
          Words: action.project.words,
          answer: action.project.words,
          userAnswer: mobileInitialState(),
        }
      }
    }
    case 'SHOW_DETAIL': {
      // Fake route
      return {
        ...state,
        route: 'detail',
        routeAction: action.routeAction,
        parent: action.parent || state.parent,
        role: action.role || state.role,
        activeWord: action._id,
      }
    }
    case 'ROUTE_OPTION': {
      // Fake route
      return {
        ...state,
        route: 'option',
        routeAction: 'forward',
        option: action.option
      }
    }
    case 'ROUTE_COMPLEMENT_OPTION': {
      return {
        ...state,
        route: 'complementOption',
        routeAction: 'forward'
      }
    }
    case 'ROUTE_WORD_FACTORY': {
      return {
        ...state,
        route: 'wordFactory',
        routeAction: 'slideup',
        target: action.target,
        dictionary: action.dictionary
      }
    }

    // ====================== App ====================================

    // case 'CHANGE_MODAL': {
    //   return {
    //     ...state,
    //     currentModal: action.currentModal
    //   }
    // }

    // ====================== Canvas ==================================
    case 'CREATE_WORD': {
      const [parent, newWords, initialized] = createWordHelper(state, action)

      return {
        ...state,
        route: 'detail',
        routeAction: 'slidedown',
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
      const newWords = deleteElementHelper(state, action)
      return {
        ...state,
        route: 'canvas',
        routeAction: 'backward',
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
      return setComplementHelper(state, action)
    }
  
    default: {
      return state
    }
  }
}

export default reducer