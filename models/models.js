const mongoose = require('mongoose')
const Schema = mongoose.Schema

var options = {discriminatorKey: 'pos'}

const dictionarySchema = new Schema({
	base: {type: String, required: true},
	order: {type: Number, required: true},
	createdAt: {type: Date, default: Date.now},
}, options)
export const Dictionary = mongoose.model('Dictionary', dictionarySchema)

const PronounDicSchema = new Schema({
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
	plural: {type: String}
}, options)
export const NounDic = Dictionary.discriminator('Noun', NounDicSchema)

const DeterminerDicSchema = new Schema({
	number: {type: String, required: true}
}, options)
export const DeterminerDic = Dictionary.discriminator('Determiner', DeterminerDicSchema)

const VerbDicSchema = new Schema({
	tps: {type: String, required: true},
	past: {type: String, required: true},
	passive: {type: String},
	gerund: {type: String, required: true}
}, options)
export const VerbDic = Dictionary.discriminator('Verb', VerbDicSchema)

const AdjectiveDicSchema = new Schema({
	comparative: {type: String},
	superlative: {type: String}
}, options)
export const AdjectiveDic = Dictionary.discriminator('Adjective', AdjectiveDicSchema)

const AdverbDicSchema = new Schema({
	comparative: {type: String},
	superlative: {type: String},
	canModify: [{type: String}]
}, options)
export const AdverbDic = Dictionary.discriminator('Adverb', AdverbDicSchema)

const ConjunctionDicSchema = new Schema({
	type: {type: String, required: true},
}, options)
export const ConjunctionDic = Dictionary.discriminator('Conjunction', ConjunctionDicSchema)

const PrepositionDicSchema = new Schema({}, options)
export const PrepositionDic = Dictionary.discriminator('Preposition', PrepositionDicSchema)

const InfinitiveDicSchema = new Schema({}, options)
export const InfinitiveDic = Dictionary.discriminator('Infinitive', InfinitiveDicSchema)

const GerundDicSchema = new Schema({}, options)
export const GerundDic = Dictionary.discriminator('Gerund', GerundDicSchema)

const ParticipleDicSchema = new Schema({}, options)
export const ParticipleDic = Dictionary.discriminator('Participle', ParticipleDicSchema)

const PossessiveDicSchema = new Schema({}, options)
export const PossessiveDic = Dictionary.discriminator('Possessive', PossessiveDicSchema)

const BeDicSchema = new Schema({}, options)
export const BeDic = Dictionary.discriminator('Be', BeDicSchema)

const ClauseDicSchema = new Schema({}, options)
export const ClauseDic = Dictionary.discriminator('Clause', ClauseDicSchema)

const NounContainerDicSchema = new Schema({}, options)
export const NounContainerDic = Dictionary.discriminator('NounContainer', NounContainerDicSchema)

const NounClauseDicSchema = new Schema({}, options)
export const NounClauseDic = Dictionary.discriminator('NounClause', NounClauseDicSchema)

const AdjectiveClauseDicSchema = new Schema({}, options)
export const AdjectiveClauseDic = Dictionary.discriminator('AdjectiveClause', AdjectiveClauseDicSchema)

const AdverbClauseDicSchema = new Schema({}, options)
export const AdverbClauseDic = Dictionary.discriminator('AdverbClause', AdverbClauseDicSchema)

const ClauseContainerDicSchema = new Schema({}, options)
export const ClauseContainerDic = Dictionary.discriminator('ClauseContainer', ClauseContainerDicSchema)

const VerbContainerDicSchema = new Schema({}, options)
export const VerbContainerDic = Dictionary.discriminator('VerbContainer', VerbContainerDicSchema)





