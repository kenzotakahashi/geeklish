const mongoose = require('mongoose')
const Schema = mongoose.Schema

var options = {discriminatorKey: 'pos'}

const dictionarySchema = new Schema({
	createdAt: {type: Date, default: Date.now},
}, options)
export const Dictionary = mongoose.model('Dictionary', dictionarySchema)

const PronounDicSchema = new Schema({
	base: {type: String, required: true},
	a: {type: String},
	p: {type: String},
	pp: {type: String},
	r: {type: String},
	person: {type: Number},
	number: {type: String},
}, options)
export const PronounDic = Dictionary.discriminator('Pronoun', PronounDicSchema)

const NounDicSchema = new Schema({
	type: {type: String, required: true},
	base: {type: String, required: true},
	plural: {type: String}
}, options)
export const NounDic = Dictionary.discriminator('Noun', NounDicSchema)

const DeterminerDicSchema = new Schema({
	base: {type: String, required: true},
	number: {type: String, required: true},
	independent: {type: String, required: true}
}, options)
export const DeterminerDic = Dictionary.discriminator('Determiner', DeterminerDicSchema)

const VerbDicSchema = new Schema({
	base: {type: String, required: true},
	tps: {type: String, required: true},
	past: {type: String, required: true},
	passive: {type: String},
	gerund: {type: String, required: true}
}, options)
export const VerbDic = Dictionary.discriminator('Verb', VerbDicSchema)

const AdjectiveDicSchema = new Schema({
	base: {type: String, required: true},
	comparative: {type: String},
	superlative: {type: String}
}, options)
export const AdjectiveDic = Dictionary.discriminator('Adjective', AdjectiveDicSchema)

const AdverbDicSchema = new Schema({
	base: {type: String, required: true},
}, options)
export const AdverbDic = Dictionary.discriminator('Adverb', AdverbDicSchema)

const ConjunctionDicSchema = new Schema({
	base: {type: String, required: true},
	type: {type: String, required: true},
}, options)
export const ConjunctionDic = Dictionary.discriminator('Conjunction', ConjunctionDicSchema)

const PrepositionDicSchema = new Schema({
	base: {type: String, required: true},
}, options)
export const PrepositionDic = Dictionary.discriminator('Preposition', PrepositionDicSchema)

const InfinitiveDicSchema = new Schema({
	base: {type: String, required: true},
}, options)
export const InfinitiveDic = Dictionary.discriminator('Infinitive', InfinitiveDicSchema)

const BeDicSchema = new Schema({
	base: {type: String, required: true},
}, options)
export const BeDic = Dictionary.discriminator('Be', BeDicSchema)

const ClauseDicSchema = new Schema({
	base: {type: String, required: true},
}, options)
export const ClauseDic = Dictionary.discriminator('Clause', ClauseDicSchema)

const NounContainerDicSchema = new Schema({
	base: {type: String, required: true},
}, options)
export const NounContainerDic = Dictionary.discriminator('NounContainer', NounContainerDicSchema)

const NounClauseDicSchema = new Schema({
	base: {type: String, required: true},
}, options)
export const NounClauseDic = Dictionary.discriminator('NounClause', NounClauseDicSchema)

const AdjectiveClauseDicSchema = new Schema({
	base: {type: String, required: true},
}, options)
export const AdjectiveClauseDic = Dictionary.discriminator('AdjectiveClause', AdjectiveClauseDicSchema)

const ClauseContainerDicSchema = new Schema({
	base: {type: String, required: true},
}, options)
export const ClauseContainerDic = Dictionary.discriminator('ClauseContainer', ClauseContainerDicSchema)

const VerbContainerDicSchema = new Schema({
	base: {type: String, required: true},
}, options)
export const VerbContainerDic = Dictionary.discriminator('VerbContainer', VerbContainerDicSchema)





