import factory from '../factory.js'
// import Client from '../Client'
import uuid from 'uuid'
import { initialState } from '../examples'

const getArgument = function(parent, wordPos, target) {
  if (wordPos === 'Pronoun' &&
      ['Verb','Be','VerbContainer','Preposition'].includes(parent.pos)) {
    return {form: 'accusative'}
  } else if ((parent.pos === 'Gerund' && ['Verb','Be','VerbContainer'].includes(wordPos)) ||
             (parent.pos === 'VerbContainer' && parent.form === 'gerund' &&
              ['Verb','Be'].includes(wordPos))) {
    return {form: 'gerund'}
  } else if (target === 'particle') {
    return {before: true}
  }
  return {}
}

const takeWord = function(parent, wordBase, action_target, child={}) {
  const arg = getArgument(parent, wordBase.pos, action_target)
  const init = factory[wordBase.pos](wordBase, {...arg, ...child})
  const target = parent[action_target]
  const updated = Array.isArray(target) ? target.concat(init._id) : init._id
  return [updated, init]
}

function getContainer(pos) {
  if (pos === 'Clause') {
    return {pos: 'ClauseContainer'}   
  }
  if (['Pronoun','Noun','Gerund','NounClause','NounContainer'].includes(pos)) {
    return {pos: 'NounContainer'}
  }
  if (['Verb','Be'].includes(pos)) {
    return {pos: 'VerbContainer'}
  }
}


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
      return {
        ...state,
        route: 'examples',
        Words: action.words
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

    // ====================== Main ==================================
    case 'SHOW_OPTIONS': {
      return {
        ...state,
        saved: false,
        activeWord: state.activeWord === action._id ? 1 : action._id,
        target: null
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
      const newElement = {
        ...parent,
        [action.target]: updated,
      }

      let newActiveWord
      if (parent.pos === 'Clause') {
        if (action.target === 'subject' && parent.verb === null) {
          newActiveWord = parent._id
        } else if (action.target === 'verb' && parent.subject === null) {
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
      const elementIndex = state.Words.findIndex(t => t._id === action._id)
      const parent = state.Words[elementIndex]
      const newElement = {
        ...parent,
        [action.attr]: action.change_to,
      }
      return {
        ...state,
        saved: false,
        Words: [
          ...state.Words.slice(0, elementIndex),
          newElement,
          ...state.Words.slice(elementIndex + 1, state.Words.length),
        ],
      }
    }
    case 'DELETE_ELEMENT': {
      const filtered = state.Words.filter(o => o._id !== action._id)
      const elementIndex = filtered.findIndex(t => t._id === action.parentId)
      const oldElement = filtered[elementIndex]
      const newRole = action.role.slice(-1) === 's' ?
                      oldElement[action.role].filter(o => o !== action._id) : null   
      const newElement = {
        ...oldElement,
        [action.role]: newRole
      }
      return {
        ...state,
        saved: false,
        Words: [
          ...filtered.slice(0, elementIndex),
          newElement,
          ...filtered.slice(elementIndex + 1, filtered.length)
        ]
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
      const newElement = {
        ...parent,
        [action.target]: updated,
      }

      return {
        ...state,
        saved: false,
        activeWord: initialized._id,
        target: false,
        Words: [
          ...state.Words.slice(0, elementIndex),
          newElement,
          ...state.Words.slice(elementIndex + 1, state.Words.length),
          initialized,
        ],
      }
    }

    case 'UNDO_CONJUNCTION': {
      const filtered = state.Words.filter(o => o._id !== action.element._id)
      const elementIndex = filtered.findIndex(t => t._id === action.parentId)
      const parent = filtered[elementIndex]
      const childId = action.element[action.childRole][0]
      const newParent = {
        ...parent,
        [action.thisRole]: action.thisRole.slice(-1) === 's' ? [childId] : childId
      }
      return {
        ...state,
        saved: false,
        Words: [
          ...filtered.slice(0, elementIndex),
          newParent,
          ...filtered.slice(elementIndex + 1, filtered.length)
        ]
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
        ...initialState,
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