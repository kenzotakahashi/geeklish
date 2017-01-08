import { Verb, VerbDetail, Be, BeDetail,
				 VerbContainer } from './Verb.jsx'
import { Clause, ClauseContainer, ClauseDetail } from './Clause.jsx'
import { Pronoun, PronounDetail } from './Pronoun.jsx'
import Sentence from './Sentence.jsx'
import { Noun, NounDetail,
				 NounContainer, NounContainerDetail,
				 NounClause } from './Noun.jsx'
import { Determiner, DeterminerDetail,
				 Possessive } from './Determiner.jsx'
import { Adjective,
				 AdjectiveClause } from './Adjective.jsx'
import { Adverb,
				 AdverbClause } from './Adverb.jsx'
import { Preposition } from './Preposition.jsx'
import { Conjunction, ConjunctionDetail } from './Conjunction.jsx'
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
	Verb: VerbDetail,
	Be: BeDetail,
	Determiner: DeterminerDetail,
	Noun: NounDetail,
	Conjunction: ConjunctionDetail,
	NounContainer: NounContainerDetail,
	// Adjective: AdjectiveDetail,
	// Adverb: AdverbDetail,
	// Preposition: PrepositionDetail
}

// export const posLinks = {
// 	Pronoun: PronounLink,
// 	Verb: VerbLink,
// 	Be: BeLink,
// 	Determiner: DeterminerLink,
// 	Noun: NounLink,
// 	Conjunction: ConjunctionLink,
// 	NounContainer: NounContainerLink
// }