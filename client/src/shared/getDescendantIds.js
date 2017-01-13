export const references = {
  Sentence: ['clause'],
  Clause: ['subject','verb','adverbs','adjective'],
  ClauseContainer: ['clauses','conjunction'],
  Verb: ['complements','particle','adverbs','prepositions'],
  Be: ['complements','adverbs','prepositions'],
  VerbContainer: ['complements','adverbs','prepositions','verbs','conjunction'],
  Noun: ['quantifier','determiner','adjectives','nouns','prepositions'],
  NounContainer: ['nouns','adjectives','prepositions','quantifier','determiner','conjunction'],
  NounClause: ['clause','nouns','quantifier','adjectives','prepositions'],
  Pronoun: ['adjectives','prepositions'],
  Determiner: ['adverb'],
  Adjective: ['complement','adverbs','prepositions'],
  AdjectiveClause: ['clause'],
  Adverb: ['adverb'],
  AdverbClause: ['conjunction','clause'],
  Preposition: ['complement'],
  Infinitive: ['verb'],
  Gerund: ['verb'],
  Participle: ['verb'],
  Possessive: ['noun'],
  Conjunction: [],
  Appositive: ['noun']
}

export function getDescendantIds(_id, words) {
  const element = words.find(o => o._id === _id)
  const refs = references[element.pos]
  let refIds = []
  for (let ref of refs) {
    const ids = element[ref]
    refIds = refIds.concat(['Verb','Be'].includes(element.pos) && ref === 'complements' ? 
                            ids.map(o => o._id) : ids)
  }
  refIds = refIds.filter(o => o !== null)
  if (refIds.length > 0) {
    const childrenIds = refIds.map(o => getDescendantIds(o, words))
    return [].concat(_id, ...childrenIds)
  } else {
    return [_id]
  }
}