export const showOptions = (id) => ({
  type: 'SHOW_OPTIONS',
  id
})

export const showWordFactory = (id, target) => ({
  type: 'SHOW_WORD_FACTORY',
  id,
  target
})

export const changeAttribute = (id, attr, change_to) => ({
  type: 'CHANGE_ATTRIBUTE',
  id,
  attr,
  change_to,
})