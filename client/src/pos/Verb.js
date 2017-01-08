import { createWord } from './util.js'

function categorize(adverbs) {
  const [before,middle,after] = [[],[],[]]
  const base = adverbs.map(o => createWord(o))
  for (const adv of base) {
    if (adv.position === 'before') {
      before.push(adv)
    }
    else if (adv.position === 'middle') {
      middle.push(adv)
    }
    else if (adv.position === 'after') {
      after.push(adv)
    }
  }
  return [before,middle,after]
}

const makePhrasalVerb = function(particle, complements) {
  if (!particle) return complements
  if (complements.length > 0 && !particle.before) {
    return [complements[0], particle, ...complements.slice(1)]
  } else {
    return [particle, ...complements]
  }
}

const getList = function(v) {
  let word = v || [this.word[this.form]] // gerund
  let verb = word.concat(makePhrasalVerb(this.particle, this.complements))
  verb = [...this.advBefore, ...verb, ...this.advAfter]
  verb = verb.concat(this.prepositions.filter(o => !o.before))
  return verb
}

const verbAfterTo = function() {
  const negative = this.negative ? ['not'] : []
  const verb = this.perfect ? [...negative, 'have', this.word.passive] :
               this.passive ? [...negative, 'be', this.word.passive] :
               this.continuous ? [...negative, 'be', this.word.progressive] :
               [...negative, this.word.base]
  return this.getList(verb)
}
const toString = function() {
  const verb = this.getList([this.word[this.form]])
  return verb.join(' ')
}

const initVerb = function(v) {
  this._id = v._id
  this.pos = v.pos
  this.word = v.word
  this.valid_complements = v.valid_complements
  this.valid_particles = v.valid_particles
  this.complementIndex = v.complementIndex
  this.form = v.form
  this.modal = v.modal
  this.past = v.past
  this.negative = v.negative
  this.continuous = v.continuous
  this.perfect = v.perfect
  this.passive = v.passive
  this.particle = createWord(v.particle)
  this.complements = v.complements.slice(this.passive ? 1 : 0)
                     .filter(t => !!t._id).map(o => createWord(o._id));
  [this.advBefore,this.advMiddle,this.advAfter] = categorize(v.adverbs)
  this.prepositions = v.prepositions.map(o => createWord(o))
  return this
}

export const Verb = {
  init: initVerb,
  getList: getList,
  verbAfterTo: verbAfterTo,
  toString: toString,
  isValid: function() {
    return this.complementIndex !== null
  },
  getWh: () => [null, false],
}

export const Be = Verb

export const VerbContainer = {
  init: function(v) {
    this._id = v._id
    this.pos = v.pos
    this.valid_complements = v.valid_complements
    this.form = v.form
    this.modal = v.modal
    this.past = v.past
    this.negative = v.negative
    this.continuous = v.continuous
    this.perfect = v.perfect
    this.passive = v.passive
    this.complements = v.complements.map(o => createWord(o));
    [this.advBefore,this.advMiddle,this.advAfter] = categorize(v.adverbs)
    this.prepositions = v.prepositions.map(o => createWord(o))
    this.verbs = v.verbs.map(o => createWord(o))
    this.conjunction = createWord(v.conjunction)
    return this
  },
  getList: getList,
  verbAfterTo: function() {
    if (!this.conjunction) return []
    const negative = this.negative ? ['not'] : []
    const verb = this.perfect ? [...negative, 'have', this.word.passive] :
                 this.passive ? [...negative, 'be', this.word.passive] :
                 this.continuous ? [...negative, 'be', this.word.progressive] :
                 [...negative, this.verbs.map(o => o.toString()).join(` ${this.conjunction} `)]
    return this.getList(verb)
  },
  // toString: function() {
  //   return this.getList(this.verbs.map(o => o.toString()).join(` ${this.conjunction} `))
  //         .map(o => o.toString()).join(' ')
  // },
  isValid: function() {
    return this.verbs.length > 0 && this.conjunction
  },
  getWh: () => [null, false],
}