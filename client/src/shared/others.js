import factory from './factory.js'
import { getDescendantIds } from './getDescendantIds'

export const getContainer = (pos) => {
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

export const getLabel = (element, parent) => {
  const pos = element.pos
  if (['Adjective','Adverb','Be'].includes(pos)) {
    return element.word.base
  }
  if (['Conjunction','Determiner','Preposition'].includes(pos)) {
    return element.word
  }
  if (pos === 'Noun') {
    return element.word.singular
  }
  if (pos === 'Verb') {
    return parent.pos === 'Gerund' ? element.word[element.form] : element.word.base
  }
  if (pos === 'Pronoun') {
    return element.word[element.form]
  }
  return element.pos
}

const getArgument = (parent, wordPos, target) => {
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

const takeWord = (parent, wordBase, actionTarget, child={}) => {
  const arg = getArgument(parent, wordBase.pos, actionTarget)
  const init = factory[wordBase.pos](wordBase, {...arg, ...child})
  let updated
  if (actionTarget[1] === null) {
    const target = parent[actionTarget[0]]
    updated = Array.isArray(target) ? target.concat(init._id) : init._id
  }
  else {
    updated = Object.assign([], parent.complements)
    updated[actionTarget[1]]._id = init._id
  }
  return [updated, init]
}

export const createWordHelper = (state, action) => {
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

  return [parent, newWords, initialized]
}

export const setComplementHelper = (state, action) => {
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

export const deleteElementHelper = (state, action) => {
  const deletedIds = getDescendantIds(action._id, state.Words)
  const filtered = state.Words.filter(o => !deletedIds.includes(o._id))

  const elementIndex = filtered.findIndex(t => t._id === action.parentId)
  const parent = filtered[elementIndex]

  let newRole
  if (action.role[1] === null) {
    newRole = action.role[0].slice(-1) === 's' ?
              parent[action.role[0]].filter(o => o !== action._id) : null
  }
  else { // Complement
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
  return newWords
}

export const useConjunctionHelper = (state, action) => {
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
  return [newWords, initialized]
}

export const undoConjunctionHelper = (state, action) => {
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
  return newWords
}