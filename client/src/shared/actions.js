// ============== Common ============================

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

export const setComplement = (_id, verbType, index) => ({
  type: 'SET_COMPLEMENT',
  _id,
  verbType,
  index
})

export const switchCanvas = () =>({
  type: 'SWITCH_CANVAS'
})

// ============== Desktop ===========================

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

export const routeCanvas = (_id, project, routeAction) => ({
  type: 'ROUTE_CANVAS',
  _id,
  project,
  routeAction
})

export const routeSentences = (examples, routeAction) => ({
  type: 'ROUTE_SENTENCES',
  examples,
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

export const routeComplementOption = () => ({
  type: 'ROUTE_COMPLEMENT_OPTION',
})

export const routeWordFactory = (target, dictionary) => ({
  type: 'ROUTE_WORD_FACTORY',
  target,
  dictionary
})