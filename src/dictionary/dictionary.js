import verb from './verbs/verbs.js';
import determiner from './nouns/determiners.js';
import noun from './nouns/nouns.js';
import pronoun from './nouns/pronouns.js';
import adjective from './adjectives.js';
import preposition from './prepositions.js';

// const Dictionary = {
//   verb,
//   determiner,
//   noun,
//   pronoun,
//   adjective,
//   preposition
// };

const Dictionary = [
  ...verb,
  ...determiner,
  ...noun,
  ...pronoun,
  ...adjective,
  ...preposition
]

export default Dictionary;
