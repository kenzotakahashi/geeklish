import { createWord } from './util.js'

const str_adverbs = function(verb, adverbs) {
  if (!adverbs) {
    return verb
  }
  const before = []
  const after = []
  for (const adv of adverbs) {
    if (adv.position === 'before') {
      before.push(adv)
    } else if (adv.position === 'after') {
      after.push(adv)
    }
  }
  return [...before, ...verb, ...after]
}
const getList = function(v) {
  let word = v || [this.word[this.form]] // gerund
  let verb = word.concat(this.complements)
  verb = this.str_adverbs(verb, this.adverbs)
  verb = verb.concat(this.prepositions)
  return verb
}
const verbAfterTo = function() {
  const negative = this.negative ? ['not'] : []
  const verb = this.perfect ? [...negative, 'have', this.word.passive] :
               this.passive ? [...negative, 'be', this.word.passive] :
               this.continuous ? [...negative, 'be', this.word.gerund] :
               [...negative, this.word.base]
  return this.getList(verb)
}
const toString = function() {
  const verb = this.getList([this.word[this.form]])
  return verb.join(' ')
}

const initVerb = function(v) {
  this.id = v.id
  this.pos = v.pos
  this.word = v.word
  this.valid_complements = v.valid_complements
  this.form = v.form
  this.modal = v.modal
  this.past = v.past
  this.negative = v.negative
  this.continuous = v.continuous
  this.perfect = v.perfect
  this.passive = v.passive
  this.complements = v.complements.map(o => createWord(o))
  this.adverbs = v.adverbs.map(o => createWord(o))
  this.prepositions = v.prepositions.map(o => createWord(o))
  return this
}

export const Verb = {
  init: initVerb,
  str_adverbs: str_adverbs,
  getList: getList,
  verbAfterTo: verbAfterTo,
  toString: toString,
  isValid: () => true,
  is3s: () => true,
  getWh: () => [null, false],
  getBe: (form) => form === 'past' ? 'was' : 'is',
}

export const Be = Verb

export const VerbContainer = {
  init: function(v) {
    this.id = v.id
    this.pos = v.pos
    this.valid_complements = v.valid_complements
    this.form = v.form
    this.modal = v.modal
    this.past = v.past
    this.negative = v.negative
    this.continuous = v.continuous
    this.perfect = v.perfect
    this.passive = v.passive
    this.complements = v.complements.map(o => createWord(o))
    this.adverbs = v.adverbs.map(o => createWord(o))
    this.prepositions = v.prepositions.map(o => createWord(o))
    this.verbs = v.verbs.map(o => createWord(o))
    this.conjunction = createWord(v.conjunction)
    return this
  },
  str_adverbs: str_adverbs,
  getList: getList,
  verbAfterTo: verbAfterTo,
  toString: function() {
    return this.getList(
      this.verbs.map(o => o.toString()).join(` ${this.conjunction} `))
      .map(o => o.toString()).join(' ')
  },
  isValid: function() {
    return this.verbs.length > 0 && this.conjunction
  },
  is3s: () => false,
  getWh: () => [null, false],
  getBe: (form) => form === 'past' ? 'were' : 'was'
}