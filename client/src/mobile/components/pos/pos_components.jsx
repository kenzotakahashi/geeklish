import { Verb, VerbDetail, Be, BeDetail,
				 VerbContainer } from './Verb.jsx'
import { Clause, ClauseDetail,
				 ClauseContainer } from './Clause.jsx'
import { Pronoun, PronounDetail } from './Pronoun.jsx'
import Sentence from './Sentence.jsx'
import { Noun, NounDetail,
				 NounContainer, NounContainerDetail,
				 NounClause } from './Noun.jsx'
import { Determiner, DeterminerDetail,
				 Possessive, PossessiveDetail } from './Determiner.jsx'
import { Adjective, AdjectiveDetail,
				 AdjectiveClause } from './Adjective.jsx'
import { Adverb, AdverbDetail,
				 AdverbClause } from './Adverb.jsx'
import { Preposition, PrepositionDetail } from './Preposition.jsx'
import { Conjunction, ConjunctionDetail } from './Conjunction.jsx'
import { Infinitive, InfinitiveDetail,
				 Gerund, GerundDetail,
				 Participle, ParticipleDetail } from './others.jsx'

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
	NounContainer: NounContainerDetail,
	Adjective: AdjectiveDetail,
	Adverb: AdverbDetail,
	Preposition: PrepositionDetail,
	Conjunction: ConjunctionDetail,
	Infinitive: InfinitiveDetail,
	Gerund: GerundDetail,
	Participle: ParticipleDetail,
	Possessive: PossessiveDetail,
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