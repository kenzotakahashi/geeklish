import verb from './verbs/verbs.js'
import determiner from './nouns/determiners.js'
import noun from './nouns/nouns.js'
import pronoun from './nouns/pronouns.js'
import adjective from './adjectives.js'
import preposition from './prepositions.js'
import adverb from './adverbs.js'
import others from './others.js'
import conjunction from './conjunctions.js'

const Dictionary = [
  ...verb,
  ...determiner,
  ...noun,
  ...pronoun,
  ...adjective,
  ...preposition,
  ...adverb,
  ...others,
  ...conjunction
]

export default Dictionary
