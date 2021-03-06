const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var options = {discriminatorKey: 'pos', _id: false}

export const Element = mongoose.model('Element', new Schema({
  _id: String,
  projectId: String,
  createdAt: {type: Date, default: Date.now},
}, options))

export const Sentence = Element.discriminator('Sentence', new Schema({
  clause: String,
}, options))

export const Clause = Element.discriminator('Clause', new Schema({
  cType: String,
  subject: String,
  verb: String,
  adjective: String,
  adverbs: [String]
}, options))

export const Pronoun = Element.discriminator('Pronoun', new Schema({
  word: {
    nominative: String,
    accusative: String,
    possessive: String,
    "possessive pronoun": String,
    reflexive: String,
  },
  person: Number,
  number: String,
  form: String,
  adjectives: [String],
  prepositions: [String],
  isWh: Boolean
}, options))

export const Verb = Element.discriminator('Verb', new Schema({
  word: {
    base: String,
    present: String,
    past: String,
    passive: String,
    progressive: String,
  },
  valid_particles: [],
  valid_complements: Schema.Types.Mixed,
  complementIndex: Number,
  form: String,
  negative: Boolean,
  past: Boolean,
  continuous: Boolean,
  perfect: Boolean,
  passive: Boolean,
  modal: String,
  particle: String,
  complements: [{
    category: String,
    _id: String
  }],
  adverbs: [String],
  prepositions: [String]
}, options))

export const Be = Element.discriminator('Be', new Schema({
  word: {
    base: String,
    first: String,
    present: String,
    plural: String,
    past_s: String,
    past_p: String,
    past: String,
    passive: String,
    progressive: String
  },
  valid_complements: Schema.Types.Mixed,
  complementIndex: Number,
  form: String,
  negative: Boolean,
  modal: String,
  past: Boolean,
  perfect: Boolean,
  continuous: Boolean,
  complements: [{
    category: String,
    _id: String
  }],
  adverbs: [String],
  prepositions: [String]
}, options))

export const Noun = Element.discriminator('Noun', new Schema({
  type: String,
  word: {
    singular: String,
    plural: String
  },
  person: Number,
  number: String,
  isWh: Boolean,
  quantifier: String,
  determiner: String,
  adjectives: [String],
  prepositions: [String],
  nouns: [String]
}, options))

export const NounContainer = Element.discriminator('NounContainer', new Schema({
  person: Number,
  number: String,
  isWh: Boolean,
  adjectives: [String],
  quantifier: String,
  determiner: String,
  prepositions: [String],
  nouns: [String],
  conjunction: String,
}, options))

export const NounClause = Element.discriminator('NounClause', new Schema({
  person: Number,
  number: String,
  isWh: Boolean,
  that: Boolean,
  clause: String,
  quantifier: String,
  adjectives: [String],
  prepositions: [String],
  nouns: [String],
}, options))

export const Determiner = Element.discriminator('Determiner', new Schema({
  word: String,
  type: String,
  number: String,
  mass: Boolean,
  of: String,
  isOf: Boolean,
  adverb: String,
}, options))

export const Possessive = Element.discriminator('Possessive', new Schema({
  noun: String,
  number: String,
}, options))

export const VerbContainer = Element.discriminator('VerbContainer', new Schema({
  valid_complements: [],
  form: String,
  negative: Boolean,
  past: Boolean,
  continuous: Boolean,
  perfect: Boolean,
  passive: Boolean,
  modal: String,
  complements: [String],
  adverbs: [String],
  prepositions: [String],
  verbs: [String],
  conjunction: String
}, options))

export const Adjective = Element.discriminator('Adjective', new Schema({
  word: {
    base: String,
    comparative: String,
    superlative: String
  },
  form: String,
  complement: String,
  adverbs: [String],
  prepositions: [String],
  after: Boolean,
  isWh: Boolean
}, options))

export const AdjectiveClause = Element.discriminator('AdjectiveClause', new Schema({
  clause: String,
  essential: Boolean,
  isWh: Boolean
}, options))

export const Appositive = Element.discriminator('Appositive', new Schema({
  noun: String,
  essential: Boolean
}, options))

export const Adverb = Element.discriminator('Adverb', new Schema({
  word: {
    base: String,
    comparative: String,
    superlative: String
  },
  form: String,
  usage: [String],
  position: String,
  adverb: String,
  isWh: Boolean
}, options))

export const AdverbClause = Element.discriminator('AdverbClause', new Schema({
  conjunction: String,
  clause: String,
  position: String,
  isWh: Boolean
}, options))

export const Preposition = Element.discriminator('Preposition', new Schema({
  word: String,
  complement: String,
  before: Boolean,
  isWh: Boolean
}, options))

export const Infinitive = Element.discriminator('Infinitive', new Schema({
  word: String,
  verb: String,
  omit: Boolean,
  before: Boolean,
}, options))

export const Gerund = Element.discriminator('Gerund', new Schema({
  verb: String
}, options))

export const Participle = Element.discriminator('Participle', new Schema({
  verb: String,
  form: String,
  beginning: Boolean,
}, options))

export const ClauseContainer = Element.discriminator('ClauseContainer', new Schema({
  conjunction: String,
  clauses: [String],
}, options))

export const Conjunction = Element.discriminator('Conjunction', new Schema({
  word: String,
  type: String
}, options))


export const Pos = {
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
