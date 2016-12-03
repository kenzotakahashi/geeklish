import { createWord } from './util.js'

export const Infinitive = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.verb = createWord(p.verb)
    return this    
  },
  toString: function() {
    const phrase = !!this.verb ? this.verb.verbAfterTo() : []
    return ['to', ...phrase.map(o => o.toString())].join(' ')
  },
  getWh: function() {
    return [null, false]
  }
}

export const Sentence = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.clause = createWord(p.clause)
    return this
  },
  capitalize: function(s) {
    return s[0].toUpperCase() + s.slice(1)
  },
  punctuation: function() {
    return this.clause.cType === 'question' ? '?' : '.'
  },
  sentence: function(c) {
    return this.capitalize(c + this.punctuation())
  },
  toString: function() {
    if (!this.clause) return
    const result = this.clause.print()
    return Array.isArray(result) ? result[1] : this.sentence(result)
  }
}