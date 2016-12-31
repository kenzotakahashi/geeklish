import factory from './factory.js'

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

export const takeWord = (parent, wordBase, action_target, child={}) => {
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