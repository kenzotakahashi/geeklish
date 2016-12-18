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