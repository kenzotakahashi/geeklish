const mongoose = require('mongoose')
const Schema = mongoose.Schema

var options = {discriminatorKey: 'dicPos'}

export const Dictionary = mongoose.model('Dictionary', new Schema({
	base: {type: String, required: true},
	order: {type: Number, required: true},
	createdAt: {type: Date, default: Date.now},
}, options))

export const PronounDic = Dictionary.discriminator('PronounDic', new Schema({
	a: {type: String},
	p: {type: String},
	pp: {type: String},
	r: {type: String},
	person: {type: Number},
	number: {type: String},
	pos: {type: String, default: 'Pronoun'}
}, options))

export const NounDic = Dictionary.discriminator('NounDic', new Schema({
	type: {type: String, required: true},
	plural: {type: String},
	pos: {type: String, default: 'Noun'},
}, options))

export const DeterminerDic = Dictionary.discriminator('DeterminerDic', new Schema({
	number: {type: String, required: true},
	pos: {type: String, default: 'Determiner'},
}, options))

export const VerbDic = Dictionary.discriminator('VerbDic', new Schema({
	tps: {type: String, required: true},
	past: {type: String, required: true},
	passive: {type: String},
	gerund: {type: String, required: true},
	pos: {type: String, default: 'Verb'},
}, options))

export const AdjectiveDic = Dictionary.discriminator('AdjectiveDic', new Schema({
	comparative: {type: String},
	superlative: {type: String},
	pos: {type: String, default: 'Adjective'},
}, options))

export const AdverbDic = Dictionary.discriminator('AdverbDic', new Schema({
	comparative: {type: String},
	superlative: {type: String},
	canModify: [{type: String}],
	pos: {type: String, default: 'Adverb'},
}, options))

export const ConjunctionDic = Dictionary.discriminator('ConjunctionDic', new Schema({
	type: {type: String, required: true},
	pos: {type: String, default: 'Conjunction'},
}, options))

export const PrepositionDic = Dictionary.discriminator('PrepositionDic',
	new Schema({pos: {type: String, default: 'Preposition'}}, options))

export const InfinitiveDic = Dictionary.discriminator('InfinitiveDic',
	new Schema({pos: {type: String, default: 'Infinitive'}}, options))

export const GerundDic = Dictionary.discriminator('GerundDic',
	new Schema({pos: {type: String, default: 'Gerund'}}, options))

export const ParticipleDic = Dictionary.discriminator('ParticipleDic',
	new Schema({pos: {type: String, default: 'Participle'}}, options))

export const PossessiveDic = Dictionary.discriminator('PossessiveDic',
	new Schema({pos: {type: String, default: 'Possessive'}}, options))

export const BeDic = Dictionary.discriminator('BeDic',
	new Schema({pos: {type: String, default: 'Be'}}, options))

export const ClauseDic = Dictionary.discriminator('ClauseDic',
	new Schema({pos: {type: String, default: 'Clause'}}, options))

export const NounContainerDic = Dictionary.discriminator('NounContainerDic',
	new Schema({pos: {type: String, default: 'NounContainer'}}, options))

export const NounClauseDic = Dictionary.discriminator('NounClauseDic',
	new Schema({pos: {type: String, default: 'NounClause'}}, options))

export const AdjectiveClauseDic = Dictionary.discriminator('AdjectiveClauseDic',
	new Schema({pos: {type: String, default: 'AdjectiveClause'}}, options))

export const AdverbClauseDic = Dictionary.discriminator('AdverbClauseDic',
	new Schema({pos: {type: String, default: 'AdverbClause'}}, options))

export const ClauseContainerDic = Dictionary.discriminator('ClauseContainerDic',
	new Schema({pos: {type: String, default: 'ClauseContainer'}}, options))

export const VerbContainerDic = Dictionary.discriminator('VerbContainerDic',
	new Schema({pos: {type: String, default: 'VerbContainer'}}, options))


