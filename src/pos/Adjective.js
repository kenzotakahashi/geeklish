import { createWord } from './util.js'

export const Adjective = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.word = p.word
    this.form = p.form
    this.adverbs = p.adverbs.map(o => createWord(o))
    this.prepositions = p.prepositions.map(o => createWord(o))
    this.isWh = p.isWh
    return this    
  },  
  toString: function() {
   return [
     ...this.adverbs,
     this.word[this.form],
     ...this.prepositions
   ].map(o => o.toString()).join(' ') 
  },
  getWh: function() {
    if (this.isWh) return (this, true)
    for (const attr of ['adverbs','prepositions']) {
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
}

export const AdjectiveClause = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.clause = createWord(p.clause)
    this.isWh = p.isWh
    return this
  },
  toString: function() {
    if (!this.clause) return ''
    const result = this.clause.print()
    return Array.isArray(result) ? '' : result
  },
  getWh: function() {
    return [null, false]
  }
}