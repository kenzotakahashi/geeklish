import uuid from 'uuid'
import factory from '../../factory.js'
import { desktopInitialState } from '../examples'
import { score } from '../../score'
import { getDescendantIds } from '../../getDescendantIds'

const getArgument = function(parent, wordPos, target) {
  if (wordPos === 'Pronoun' &&
      ['Verb','Be','VerbContainer','Preposition'].includes(parent.pos)) {
    return {form: 'accusative'}
  } else if ((parent.pos === 'Gerund' && ['Verb','Be','VerbContainer'].includes(wordPos)) ||
             (parent.pos === 'VerbContainer' && parent.form === 'progressive' &&
              ['Verb','Be'].includes(wordPos))) {
    return {form: 'progressive'}
  } else if (target[0] === 'particle') {
    return {before: true}
  }
  return {}
}

const takeWord = function(parent, wordBase, action_target, child={}) {
  const arg = getArgument(parent, wordBase.pos, action_target)
  const init = factory[wordBase.pos](wordBase, {...arg, ...child})
  let updated
  if (action_target[1] === null) {
    const target = parent[action_target[0]]
    updated = Array.isArray(target) ? target.concat(init._id) : init._id
  }
  else {
    updated = Object.assign([], parent.complements)
    updated[action_target[1]]._id = init._id
  }
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
        examples: action.examples,
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
                                isComplementChosen: false,
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
                                isComplementChosen: false,
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
        isComplementChosen: true,
        complements: complementArray.map(o => ({category: o, _id: null}))
      }

      return {
        ...state,
        currentModal: {name: null},
        target: [],
        Words: newWords
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