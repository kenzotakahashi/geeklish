import { Verb, VerbLink,VerbDetail, Be, VerbContainer } from './Verb.jsx'
import { Clause, ClauseContainer, ClauseDetail } from './Clause.jsx'
import { Pronoun, PronounLink, PronounDetail } from './Pronoun.jsx'
import Sentence from './Sentence.jsx'
import { Noun, NounContainer, NounClause } from './Noun.jsx'
import { Determiner, Possessive } from './Determiner.jsx'
import { Adjective, AdjectiveClause } from './Adjective.jsx'
import { Adverb, AdverbClause } from './Adverb.jsx'
import Preposition from './Preposition.jsx'
import Conjunction from './Conjunction.jsx'
import { Infinitive, Gerund, Participle } from './others.jsx'

export const pos_components = {
	Verb,
	Be,
	VerbContainer,
	Clause,
	ClauseContainer,
	Pronoun,
	Sentence,
	Noun,
	NounContainer,
	NounClause,
	Determiner,
	Adjective,
	AdjectiveClause,
	Adverb,
	AdverbClause,
	Preposition,
	Conjunction,
	Infinitive,
	Gerund,
	Participle,
	Possessive,
}

export const posDetails = {
	Clause: ClauseDetail,
	Pronoun: PronounDetail,
	Verb: VerbDetail
}

export const posLinks = {
	Pronoun: PronounLink,
	Verb: VerbLink
}