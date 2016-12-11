import { createWord } from './util.js'

export const Determiner = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.word = p.word
    this.number = p.number
    // this.isWh = p.isWh
    return this
  },
  toString: function() {
    return this.word
  },
  // getWh: function() {
  //   return this.isWh ? [this, true] : [null, false]
  // },
}

export const Possessive = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.noun = createWord(p.noun)
    return this    
  },
  toString: function() {
    if (!this.noun || !this.noun.isValid()) return ''
    if (this.noun.pos === 'Pronoun') {
      return this.noun.word.possessive
    } else if (['Noun', 'NounContainer'].includes(this.noun.pos)) {
      return this.noun.possessive()
    }
  },
}

