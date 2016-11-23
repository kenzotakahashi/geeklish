import { createWord } from './util.js'

const Sentence = {
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
    return this.cType === 'question' ? '?' : '.'
  },
  sentence: function(c) {
    return this.capitalize(c + this.punctuation())
  },
  toString: function() {
    const result = this.clause.print()
    return Array.isArray(result) ? result[1] : this.sentence(result)
  }
}

export default Sentence