import { createWord } from './util.js'

const getWh = function() {
  if (this.isWh) return [this, true]
  for (const attr of ['adjectives','adjectivesAfter','determiners','prepositions']) {
    for (let i = 0; i < this[attr].length; i++) {
      const [wh, isWh] = this[attr][i].getWh()
      if (isWh) {
        this[attr].splice(i, 1)
      }
      if (wh) return [wh, false]
    }
  }
  return [null, false]
}

const beforeOrAfter = function(adjs) {
  const adjectives = []
  const adjectivesAfter = []
  const base = adjs.map(o => createWord(o))
  for (let adj of base) {
    if (adj.pos === 'Adjective') {
      adjectives.push(adj)
    } else {
      adjectivesAfter.push(adj)
    }
  }
  return [adjectives, adjectivesAfter]
}

export const Noun = {
  init: function(w) {
    this.id = w.id
    this.pos = w.pos
    this.word = w.word
    this.person = w.person
    this.number = w.number
    this.form = w.form
    this.isWh = w.isWh;
    [this.adjectives, this.adjectivesAfter] = this.beforeOrAfter(w.adjectives)
    this.determiners = w.determiners.map(o => createWord(o))
    this.prepositions = w.prepositions.map(o => createWord(o))
    this.nouns = w.nouns.map(o => createWord(o))
    return this
  },
  beforeOrAfter: beforeOrAfter,
  isValid: () => true,
  toString: function() {
    return this.getList().map(o => o.toString()).join(' ')
  },
  getList: function() {
    return this.getRest(this.word[this.form])
  },
  getRest: function(noun) {
    return [...this.determiners,
            ...this.adjectives,
            ...this.nouns, 
            noun,
            ...this.adjectivesAfter,
            ...this.prepositions]
  },
  getBe: function(past) {
    if (this.number === 'plural' || this.person === 2) {
      return past ? 'were' : 'are'
    } else {
      return past ? 'was' : 'is'
    }
  },
  is3s: function() {
    return this.number === 'singular' && ![1,2].includes(this.person)
  },
  getWh: getWh
}

export const NounContainer = {
  init: function(w) {
    this.id = w.id
    this.pos = w.pos
    this.person = w.person
    this.number = w.number
    this.isWh = w.isWh;
    [this.adjectives, this.adjectivesAfter] = this.beforeOrAfter(w.adjectives)
    this.determiners = w.determiners.map(o => createWord(o))
    this.prepositions = w.prepositions.map(o => createWord(o))
    this.nouns = w.nouns.map(o => createWord(o))
    this.conjunction = createWord(w.conjunction)
    return this
  },
  beforeOrAfter: beforeOrAfter,
  isValid: function() {
    return this.nouns.length > 0 && !!this.conjunction
  },
  toString: function() {
    return this.getList().map(o => o.toString()).join(' ')
  },
  getList: function() {
    let with_conj = []
    for (let i = 0; i < this.nouns.length; i++) {
      with_conj = with_conj.concat(i === this.nouns.length - 1 ?
                                   this.nouns[i] : [this.nouns[i], this.conjunction])
    }
    return this.getRest(with_conj)
  },
  getRest: function(noun) {
    return [...this.determiners,
            ...this.adjectives,
            ...noun,
            ...this.adjectivesAfter,
            ...this.prepositions]
  },
  getBe: function(form) {
    return form === 'past' ? 'were' : 'are'
  },
  is3s: function() {
    return false
  },
  getWh: getWh,
}

export const NounClause = {
  init: function(w) {
    this.id = w.id
    this.pos = w.pos
    this.person = w.person
    this.number = w.number
    this.clause = createWord(w.clause)
    this.isWh = w.isWh;
    [this.adjectives, this.adjectivesAfter] = this.beforeOrAfter(w.adjectives)
    this.determiners = w.determiners.map(o => createWord(o))
    this.prepositions = w.prepositions.map(o => createWord(o))
    this.nouns = w.nouns.map(o => createWord(o))
    return this
  },
  beforeOrAfter: beforeOrAfter,
  isValid: function() {
    return this.clause && !Array.isArray(this.clause.print())
  },
  toString: function() {
    const list = this.getList()
    return !!list ? list.map(o => o.toString()).join(' ') : ''
  },
  getList: function() {
    if (!this.clause) return
    const result = this.clause.print()
    return Array.isArray(result) ? '' : this.getRest(result)
  },
  getRest: function(noun) {
    return [...this.determiners,
            ...this.adjectives,
            ...this.nouns, 
            noun,
            ...this.adjectivesAfter,
            ...this.prepositions]
  },
  getBe: function(form) {
    return form === 'past' ? 'was' : 'is'
  },
  is3s: function() {
    return true
  },
  getWh: getWh,
}