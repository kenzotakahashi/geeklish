const mongoose = require('mongoose')
const Schema = mongoose.Schema

var options = {discriminatorKey: 'dicPos'}

export const Dictionary = mongoose.model('Dictionary', new Schema({
	base: {type: String, required: true},
	order: {type: Number, required: true},
	createdAt: {type: Date, default: Date.now},
}, options))

const PronounDic = Dictionary.discriminator('PronounDic', new Schema({
	a: {type: String},
	p: {type: String},
	pp: {type: String},
	r: {type: String},
	person: {type: Number},
	number: {type: String},
	pos: {type: String, default: 'Pronoun'}
}, options))

const NounDic = Dictionary.discriminator('NounDic', new Schema({
	type: {type: String, required: true},
	plural: {type: String},
	pos: {type: String, default: 'Noun'},
}, options))

const DeterminerDic = Dictionary.discriminator('DeterminerDic', new Schema({
	type: {type: String, required: true},
	number: String,
	mass: Boolean,
	of: String,
	pos: {type: String, default: 'Determiner'},
}, options))

const VerbDic = Dictionary.discriminator('VerbDic', new Schema({
	present: {type: String},
	past: String,
	passive: {type: String},
	progressive: {type: String, required: true},
	particles: [String],
	complements: Schema.Types.Mixed,
	pos: {type: String, default: 'Verb'},
}, options))

const AdjectiveDic = Dictionary.discriminator('AdjectiveDic', new Schema({
	comparative: {type: String},
	superlative: {type: String},
	pos: {type: String, default: 'Adjective'},
}, options))

const AdverbDic = Dictionary.discriminator('AdverbDic', new Schema({
	comparative: {type: String},
	superlative: {type: String},
	canModify: [{type: String}],
	pos: {type: String, default: 'Adverb'},
}, options))

const ConjunctionDic = Dictionary.discriminator('ConjunctionDic', new Schema({
	type: {type: String, required: true},
	pos: {type: String, default: 'Conjunction'},
}, options))

const PrepositionDic = Dictionary.discriminator('PrepositionDic',
	new Schema({pos: {type: String, default: 'Preposition'}}, options))

const InfinitiveDic = Dictionary.discriminator('InfinitiveDic',
	new Schema({pos: {type: String, default: 'Infinitive'}}, options))

const GerundDic = Dictionary.discriminator('GerundDic',
	new Schema({pos: {type: String, default: 'Gerund'}}, options))

const ParticipleDic = Dictionary.discriminator('ParticipleDic',
	new Schema({pos: {type: String, default: 'Participle'}}, options))

const PossessiveDic = Dictionary.discriminator('PossessiveDic',
	new Schema({pos: {type: String, default: 'Possessive'}}, options))

const BeDic = Dictionary.discriminator('BeDic',
	new Schema({pos: {type: String, default: 'Be'}}, options))

const ClauseDic = Dictionary.discriminator('ClauseDic',
	new Schema({pos: {type: String, default: 'Clause'}}, options))

const NounContainerDic = Dictionary.discriminator('NounContainerDic',
	new Schema({pos: {type: String, default: 'NounContainer'}}, options))

const NounClauseDic = Dictionary.discriminator('NounClauseDic',
	new Schema({pos: {type: String, default: 'NounClause'}}, options))

const AdjectiveClauseDic = Dictionary.discriminator('AdjectiveClauseDic',
	new Schema({pos: {type: String, default: 'AdjectiveClause'}}, options))

const AdverbClauseDic = Dictionary.discriminator('AdverbClauseDic',
	new Schema({pos: {type: String, default: 'AdverbClause'}}, options))

const ClauseContainerDic = Dictionary.discriminator('ClauseContainerDic',
	new Schema({pos: {type: String, default: 'ClauseContainer'}}, options))

const VerbContainerDic = Dictionary.discriminator('VerbContainerDic',
	new Schema({pos: {type: String, default: 'VerbContainer'}}, options))

export const DicPos = {
	Verb: VerbDic,
	Pronoun: PronounDic,
	Noun: NounDic,
	Determiner: DeterminerDic,
	Adjective: AdjectiveDic,
	Adverb: AdverbDic,
	Preposition: PrepositionDic,
	Conjunction: ConjunctionDic,
  Infinitive: InfinitiveDic,
  Gerund: GerundDic,
  Participle: ParticipleDic,
  Possessive: PossessiveDic,
  Be: BeDic,
  Clause: ClauseDic,
  NounContainer: NounContainerDic,
  NounClause: NounClauseDic,
  AdjectiveClause: AdjectiveClauseDic,
  AdverbClause: AdverbClauseDic,
  ClauseContainer: ClauseContainerDic,
  VerbContainer: VerbContainerDic
}
