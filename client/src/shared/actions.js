export const showOptions = (_id) => ({
  type: 'SHOW_OPTIONS',
  _id
})

export const showWordFactory = (_id, target, dictionary) => ({
  type: 'SHOW_WORD_FACTORY',
  _id,
  target,
  dictionary
})

export const changeAttribute = (_id, attr, change_to) => ({
  type: 'CHANGE_ATTRIBUTE',
  _id,
  attr,
  change_to,
})

export const deleteElement = (_id, role, parentId) => ({
	type: 'DELETE_ELEMENT',
	_id,
  role,
  parentId
})

export const useConjunction = (element, target, parentId) => ({
  type: 'USE_CONJUNCTION',
  element,
  target,
  parentId
})

export const undoConjunction = (element, thisRole, childRole, parentId) => ({
  type: 'UNDO_CONJUNCTION',
  element,
  thisRole,
  childRole,
  parentId
})

export const createNewWord = (wordBase, activeWord, target) => ({
  type: 'CREATE_WORD',
  wordBase,
  activeWord,
  target,
})

export const routeExample = (examples, words) => ({
  type: 'ROUTE_EXAMPLES',
  examples,
  words
})

export const changeModal = (currentModal) => ({
  type: 'CHANGE_MODAL',
  currentModal
})

// ================ Mobile =================

export const routeCanvas = (_id, project, previous, routeAction) => ({
  type: 'ROUTE_CANVAS',
  _id,
  project,
  previous,
  routeAction
})

export const routeSentences = (examples, previous, routeAction) => ({
  type: 'ROUTE_SENTENCES',
  examples,
  previous,
  routeAction
})

export const showDetail = (_id, routeAction, parent, role) => ({
  type: 'SHOW_DETAIL',
  _id,
  routeAction,
  parent,
  role
})

export const routeOption = (option) => ({
  type: 'ROUTE_OPTION',
  option
})