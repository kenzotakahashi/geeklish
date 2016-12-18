const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

var options = {discriminatorKey: 'pos', _id: false}

export const Element = mongoose.model('Element', new Schema({
  _id: String,
  createdAt: {type: Date, default: Date.now},
}, options))

export const Sentence = Element.discriminator('Sentence', new Schema({
  clause: ObjectId,
}, options))

export const Clause = Element.discriminator('Clause', new Schema({
  cType: String,
  subject: ObjectId,
  verb: ObjectId,
  adjective: ObjectId,
  adverbs: [ObjectId]
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
  adjectives: [ObjectId],
  prepositions: [ObjectId],
  isWh: Boolean
}, options))

export const Verb = Element.discriminator('Verb', new Schema({
  word: {
    base: String,
    tps: String,
    past: String,
    passive: String,
    gerund: String,
  },
  valid_complements: [],
  form: String,
  negative: Boolean,
  past: Boolean,
  continuous: Boolean,
  perfect: Boolean,
  passive: Boolean,
  modal: String,
  particle: ObjectId,
  complements: [ObjectId],
  adverbs: [ObjectId],
  prepositions: [ObjectId]
}, options))


//   Noun: function(w) {
//     const init = {
//       id: uuid.v1(),
//       pos: 'Noun',
//       type: w.type,
//       word: {
//         singular: w.base,
//         plural: w.type === 'uncountable' ? w.base : w.plural || `${w.base}s`, 
//       },
//       person: null,
//       number: 'singular',
//       isWh: false,
//       adjectives: [],
//       adjectivesAfter: [],
//       determiners: [],
//       prepositions: [],
//       nouns: []
//     }
//     return init
//   },
//   NounContainer: function(w, arg) {
//     return {
//       id: uuid.v1(),
//       pos: 'NounContainer',
//       person: null,
//       number: 'plural',
//       isWh: false,
//       adjectives: [],
//       adjectivesAfter: [],
//       determiners: [],
//       prepositions: [],
//       nouns: [arg.child],
//       conjunction: null,
//     }
//   },
//   NounClause: function() {
//     return {
//       id: uuid.v1(),
//       pos: 'NounClause',
//       person: null,
//       number: 'singular',
//       isWh: false,
//       that: false,
//       clause: null,
//       adjectives: [],
//       adjectivesAfter: [],
//       determiners: [],
//       prepositions: [],
//       nouns: [],
//     }
//   },
//   Determiner: function(w) {
//     return {
//       id: uuid.v1(),
//       pos: 'Determiner',
//       word: w.base,
//       number: w.number,
//       adverb: null,
//       // isWh: ['what','whose','which'].includes(w.base) ? true : false
//     }
//   },
//   Possessive: function() {
//     return {
//       id: uuid.v1(),
//       pos: 'Possessive',
//       noun: null,
//     }
//   },

//   Be: function(w, arg) {
//     return {
//       id: uuid.v1(),
//       pos: 'Be',
//       word: {
//         base: 'be',
//         first: 'am',
//         tps: 'is',
//         'plural': 'are',
//         'past_s': 'was',
//         'past_p': 'were',
//         'past': null,
//         'passive': 'been',
//         'gerund': 'being'
//       },
//       valid_complements: [],
//       form: arg.form || 'base',
//       negative: false,
//       modal: '',
//       past: false,
//       perfect: false,
//       continuous: false,
//       complements: [],
//       adverbs: [],
//       prepositions: []
//     }
//   },
//   VerbContainer: function(w, arg) {
//     return {
//       id: uuid.v1(),
//       pos: 'VerbContainer',
//       valid_complements: null,
//       form: arg.form || null,
//       negative: false,
//       past: false,
//       continuous: false,
//       perfect: false,
//       passive: false,
//       modal: '',
//       complements: [],
//       adverbs: [],
//       prepositions: [],
//       verbs: arg.child ? [arg.child] : [],
//       conjunction: null
//     }
//   },
//   Adjective: function(w) {
//     return {
//       id: uuid.v1(),
//       pos: 'Adjective',
//       word: {
//         base: w.base,
//         comparative: w.comparative || `more ${w.base}`,
//         superlative: w.superlative || `most ${w.base}`
//       },
//       form: 'base',
//       adverbs: [],
//       prepositions: [],
//       isWh: false
//     }
//   },
//   AdjectiveClause: function(w) {
//     return {
//       id: uuid.v1(),
//       pos: 'AdjectiveClause',
//       clause: null,
//       isWh: false
//     }
//   },
//   Adverb: function(w) {
//     return {
//       id: uuid.v1(),
//       pos: 'Adverb',
//       word: {
//         base: w.base,
//         comparative: w.comparative === 'n' ? false : w.comparative || `more ${w.base}`,
//         superlative: w.superlative || `most ${w.base}`
//       },
//       form: 'base',
//       canModifyVerb: w.canModify.includes('verb'),
//       canModifyAdj: w.canModify.includes('adj'),
//       canModifyAdv: w.canModify.includes('adv'),
//       canModifyDet: w.canModify.includes('det'),
//       canModifyClause: w.canModify.includes('clause'),
//       position: 'before',
//       adverb: null,
//       isWh: ['when','where','how','why'].includes(w.base) ? true : false
//     }
//   },
//   AdverbClause: function(w) {
//     return {
//       id: uuid.v1(),
//       pos: 'AdverbClause',
//       conjunction: null,
//       clause: null,
//       position: 'after',
//       isWh: false
//     }
//   },
//   Preposition: function(w, arg) {
//     return {
//       id: uuid.v1(),
//       pos: 'Preposition',
//       word: w.base,
//       complement: null,
//       before: arg.before || false,
//       isWh: false
//     }
//   },
//   Infinitive: function() {
//     return {
//       id: uuid.v1(),
//       pos: 'Infinitive',
//       word: 'to',
//       verb: null,
//       omit: false,
//     }
//   },
//   Gerund: function() {
//     return {
//       id: uuid.v1(),
//       pos: 'Gerund',
//       verb: null
//     }
//   },
//   Participle: function() {
//     return {
//       id: uuid.v1(),
//       pos: 'Participle',
//       verb: null,
//       form: 'present',
//       beginning: false,
//     }
//   },

//   ClauseContainer: function(w, arg) {
//     return {
//       id: uuid.v1(),
//       pos: 'ClauseContainer',
//       conjunction: null,
//       clauses: [arg.child],
//     }
//   },
//   Conjunction: function(w) {
//     return {
//       id: uuid.v1(),
//       pos: 'Conjunction',
//       word: w.base,
//       type: w.type
//     }
//   }
// }

