import uuid from 'uuid'
import { desktopInitialState } from '../examples'
import { score } from '../../shared/score'
import { createWordHelper, setComplementHelper, deleteElementHelper, useConjunctionHelper,
         undoConjunctionHelper, changeAttributeHelper } from '../../shared/others'


function reducer(state, action) {
  switch (action.type) {
    // ======================= Route ================================
    case 'ROUTE_PROJECTS': {
      return {
        ...action.state,
        route: 'projects',
        saved: true,
        example: action._id,
        title: action.title,
        projects: action.projects
      }
    }
    case 'ROUTE_EXAMPLES': {
      // TODO title is used both for project and example
      return {
        ...state,
        route: 'examples',
        examples: action.examples,
        title: action.title,
        Words: desktopInitialState().Words,
        answer: action.words,
        isAnswer: false,
        isCorrect: false,
      }
    }
    case 'ROUTE_GUIDE': {
      return {
        ...state,
        route: 'guide'
      }
    }
    case 'ROUTE_ADMIN': {
      return {
        ...state,
        route: 'admin'
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
      const [parent, newWords, initialized] = createWordHelper(state, action)

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

      return score({
        ...state,
        saved: false,
        activeWord: newActiveWord,
        target: [],
        Words: newWords
      })
    }
    case 'CHANGE_ATTRIBUTE': {
      const newWords = changeAttributeHelper(state, action)
      return score({
        ...state,
        saved: false,
        Words: newWords,
      })
    }
    case 'DELETE_ELEMENT': {
      const newWords = deleteElementHelper(state, action)
      return score({
        ...state,
        saved: false,
        target: [],
        Words: newWords
      })
    }
    case 'USE_CONJUNCTION': {
      const [newWords, initialized] = useConjunctionHelper(state, action)
      return score({
        ...state,
        saved: false,
        activeWord: initialized._id,
        target: [],
        Words: newWords
      })
    }

    case 'UNDO_CONJUNCTION': {
      const newWords = undoConjunctionHelper(state, action)
      return score({
        ...state,
        saved: false,
        Words: newWords
      })
    }

    case 'SET_COMPLEMENT': {
      return score(setComplementHelper(state, action))
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

    // ======================= Project ================================
    case 'UPDATE_TITLE': {
      return {
        ...state,
        saved: false,
        title: action.title
      }
    }
    case 'SAVE_SENTENCE': {
      let _id, newProjects, title

      if (action.isNew) {
        _id = uuid.v1()
        title = 'Untitled'

        if (!sessionStorage.projects) {
          sessionStorage.projects = '[]'
        }
        const projects = JSON.parse(sessionStorage.projects)
        newProjects = [{_id: _id, title: title}, ...projects]
      }
      else {
        _id = state.example
        title = state.title === '' ? 'Untitled' : state.title

        const projects = JSON.parse(sessionStorage.projects)
        newProjects = projects.map(o => o._id === _id ? {_id: _id, title: title} : o)
      }
      sessionStorage.projects = JSON.stringify(newProjects)  

      const data = {
        _id,
        title: title,
        state: {
          ...action.state,
          example: _id
        }
      }
      sessionStorage[`project_${_id}`] = JSON.stringify(data)

      return {
        ...action.state,
        saved: true,
        example: _id,
        projects: newProjects
      }   
    }
    case 'DELETE_PROJECT': {
      sessionStorage.removeItem(`project_${state.example}`)
      const projects = JSON.parse(sessionStorage.projects)
      const newProjects = projects.filter(o => o._id !== state.example)
      sessionStorage.projects = JSON.stringify(newProjects)

      return {
        ...desktopInitialState(),
        example: null,
        projects: state.projects.filter(o => o._id !== state.example)
      }
    }    
    default: {
      return state
    }
  }
}

export default reducer