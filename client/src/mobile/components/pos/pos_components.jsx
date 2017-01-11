import { Verb, VerbDetail, Be, BeDetail,
				 VerbContainer, VerbContainerDetail } from './Verb.jsx'
import { Clause, ClauseDetail,
				 ClauseContainer, ClauseContainerDetail } from './Clause.jsx'
import { Pronoun, PronounDetail } from './Pronoun.jsx'
import { Sentence, SentenceDetail } from './Sentence.jsx'
import { Noun, NounDetail,
				 NounContainer, NounContainerDetail,
				 NounClause, NounClauseDetail } from './Noun.jsx'
import { Determiner, DeterminerDetail,
				 Possessive, PossessiveDetail } from './Determiner.jsx'
import { Adjective, AdjectiveDetail,
				 AdjectiveClause, AdjectiveClauseDetail,
				 Appositive, AppositiveDetail } from './Adjective.jsx'
import { Adverb, AdverbDetail,
				 AdverbClause, AdverbClauseDetail } from './Adverb.jsx'
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
	Appositive,
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
	Sentence: SentenceDetail,
	Clause: ClauseDetail,
	ClauseContainer: ClauseContainerDetail,
	Pronoun: PronounDetail,
	Verb: VerbDetail,
	Be: BeDetail,
	VerbContainer: VerbContainerDetail,
	Determiner: DeterminerDetail,
	Noun: NounDetail,
	NounContainer: NounContainerDetail,
	NounClause: NounClauseDetail,
	Adjective: AdjectiveDetail,
	AdjectiveClause: AdjectiveClauseDetail,
	Appositive: AppositiveDetail,
	Adverb: AdverbDetail,
	AdverbClause: AdverbClauseDetail,
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