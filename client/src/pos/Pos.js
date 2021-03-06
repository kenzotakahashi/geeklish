import { Verb, Be, VerbContainer } from './Verb.js'
import { Clause, ClauseContainer } from './Clause.js'
import Pronoun from './Pronoun.js'
import { Noun, NounContainer, NounClause } from './Noun.js'
import { Determiner, Possessive } from './Determiner.js'
import { Adjective, AdjectiveClause, Appositive } from './Adjective.js'
import { Adverb, AdverbClause } from './Adverb.js'
import Preposition from './Preposition.js'
import Conjunction from  './Conjunction.js'
import { Infinitive, Gerund, Participle, Sentence} from './others'

const Pos = {
	Sentence,
	Verb,
	VerbContainer,
	Clause,
	ClauseContainer,
	Pronoun,
	Noun,
	NounContainer,
	NounClause,
	Determiner,
	Possessive,
	Adjective,
	AdjectiveClause,
	Appositive,
	Adverb,
	AdverbClause,
	Preposition,
	Conjunction,
	Be,
	Infinitive,
	Gerund,
	Participle,
}

export default Pos 