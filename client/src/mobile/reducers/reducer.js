// import { score } from '../../shared/score'
import { createWordHelper, setComplementHelper, deleteElementHelper, useConjunctionHelper,
         undoConjunctionHelper, changeAttributeHelper } from '../../shared/others'
import { mobileInitialState } from '../initialState'

function reducer(state, action) {
  switch (action.type) {
    // ======================= Route ================================
    case 'ROUTE_SENTENCES': {
      return {
        ...state,
        route: 'examples',
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
        const words = mobileInitialState().Words
        return {
          ...state,
          route: 'canvas',
          routeAction: action.routeAction,
          example: action._id,
          title: action.project.project.title,
          Words: words,
          answer: action.project.words,
          // userAnswer: ,
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
      const newWords = changeAttributeHelper(state, action)
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
      const [newWords, initialized] = useConjunctionHelper(state, action)
      return {
        ...state,
        route: 'canvas',
        routeAction: 'backward', 
        saved: false,
        activeWord: initialized._id,
        target: [],
        Words: newWords
      }
    }
    case 'UNDO_CONJUNCTION': {
      const newWords = undoConjunctionHelper(state, action)
      return {
        ...state,
        route: 'canvas',
        routeAction: 'backward',
        saved: false,
        Words: newWords
      }
    }
    case 'SET_COMPLEMENT': {
      return setComplementHelper(state, action)
    }
    case 'SWITCH_CANVAS': {
      if (state.isAnswer) {
        return {
          ...state,
          Words: state.userAnswer,
          isAnswer: false
        }
      } else {
        return {
          ...state,
          Words: state.answer,
          userAnswer: state.Words,
          isAnswer: true
        }
      }
    }
  
    default: {
      return state
    }
  }
}

export default reducer