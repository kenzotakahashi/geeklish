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
  const updated = Array.isArray(target) ? target.concat(init.id) : init.id
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
      const parent = state.Words[elementIndex]
      const [updated, initialized] = takeWord(parent, action.wordBase, action.target)
      const newElement = {
        ...parent,
        [action.target]: updated,
      }

      let newActiveWord
      if (parent.pos === 'Clause') {
        if (action.target === 'subject' && parent.verb === null) {
          newActiveWord = parent.id
        } else if (action.target === 'verb' && parent.subject === null) {
          newActiveWord = parent.id
        } else {
          newActiveWord = initialized.id
        }
      } else {
        newActiveWord = initialized.id
      }

      return {
        ...state,
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
      const elementIndex = state.Words.findIndex(t => t.id === action.id)
      const parent = state.Words[elementIndex]
      const newElement = {
        ...parent,
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
    case 'DELETE_ELEMENT': {
      const filtered = state.Words.filter(o => o.id !== action.id)
      const elementIndex = filtered.findIndex(t => t.id === action.parentId)
      const oldElement = filtered[elementIndex]
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
    case 'USE_CONJUNCTION': {
      const elementIndex = state.Words.findIndex(t => t.id === action.parentId)
      const parent = state.Words[elementIndex]
      const [updated, initialized] = takeWord(
        parent,
        getContainer(action.element.pos),
        action.target,
        {child: action.element.id}
      )  
      const newElement = {
        ...parent,
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

    case 'UNDO_CONJUNCTION': {
      const filtered = state.Words.filter(o => o.id !== action.element.id)
      const elementIndex = filtered.findIndex(t => t.id === action.parentId)
      const parent = filtered[elementIndex]
      const childId = action.element[action.childRole][0]
      const newParent = {
        ...parent,
        [action.thisRole]: action.thisRole.slice(-1) === 's' ? [childId] : childId
      }
      return {
        ...state,
        Words: [
          ...filtered.slice(0, elementIndex),
          newParent,
          ...filtered.slice(elementIndex + 1, filtered.length)
        ]
      }
    }

    // ======================= Project ================================
    case 'CHANGE_EXAMPLE': {
      return {
        ...action.state,
        projects: state.projects
      }
    }
    case 'SAVE_SENTENCE': {
      let id, newProjects
      const title = action.title === '' ? 'Untitled' : action.title

      if (!action.id) {
        id = uuid.v4()

        if (!sessionStorage.projects) {
          sessionStorage.projects = '[]'
        }
        const projects = JSON.parse(sessionStorage.projects)
        newProjects = [{id: id, title: title}, ...projects]
      } else {
        id = action.id

        const projects = JSON.parse(sessionStorage.projects)
        newProjects = projects.map(o => o.id === id ? {id: id, title: title} : o)
      }
      sessionStorage.projects = JSON.stringify(newProjects)  

      const data = {
        id,
        title: title,
        state: {
          ...action.state,
          example: id
        }
      }
      sessionStorage[`project_${id}`] = JSON.stringify(data)

      return {
        ...action.state,
        example: action.id,
        projects: newProjects
      }   
    }
    case 'DELETE_PROJECT': {
      sessionStorage.removeItem(`project_${action.id}`)
      const projects = JSON.parse(sessionStorage.projects)
      const newProjects = projects.filter(o => o.id !== action.id)
      sessionStorage.projects = JSON.stringify(newProjects)

      return {
        ...initialState,
        example: null,
        projects: state.projects.filter(o => o.id !== action.id)
      }
    }
    default: {
      return state
    }
  }
}

export default reducer