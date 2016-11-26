export const showOptions = (id) => ({
  type: 'SHOW_OPTIONS',
  id
})

export const showWordFactory = (id, target, dictionary) => ({
  type: 'SHOW_WORD_FACTORY',
  id,
  target,
  dictionary
})

export const changeAttribute = (id, attr, change_to) => ({
  type: 'CHANGE_ATTRIBUTE',
  id,
  attr,
  change_to,
})

export const deleteElement = (id, role, parentId) => ({
	type: 'DELETE_ELEMENT',
	id,
  role,
  parentId
})

export const changeNumber = (id) => ({
  type: 'CHANGE_NUMBER',
  id
})