import { createWord } from './util.js'

export const Determiner = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.word = p.word
    this.type = p.type
    this.number = p.number
    this.mass = p.mass
    this.of = p.of
    this.isOf = p.isOf
    this.adverb = createWord(p.adverb)
    return this
  },
  toString: function() {
    const word = this.isOf ? `${this.of} of` : this.word
    return !!this.adverb ? [this.adverb, word] : [word]
  },
}

export const Possessive = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.number = p.number
    this.noun = createWord(p.noun)
    return this    
  },
  toString: function() {
    if (!this.noun || !this.noun.isValid()) return ''
    if (this.noun.pos === 'Pronoun') {
      return this.noun.word.possessive
    } else if (['Noun', 'NounContainer'].includes(this.noun.pos)) {
      return this.noun.possessive().filter(o => o !== '')
    }
  },
}

