import { createWord } from './util.js'

export const Adverb = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.word = p.word
    this.form = p.form
    this.canModifyVerb = p.canModifyVerb
    this.canModifyAdj = p.canModifyAdj
    this.canModifyAdv = p.canModifAdvb
    this.canModifyClause = p.canModiClauserb  
    this.position = p.position
    this.adverb = createWord(p.adverb)
    this.isWh = p.isWh
    return this
  },
  toString: function() {
    return !!this.adverb ?
            `${this.adverb.toString()} ${this.word[this.form]}`:
            this.word[this.form]
  },
  getWh: function() {
    if (this.isWh) return [this, true]
    if (this.adverb) {
      const [wh, isWh] = this.adverb.getWh()
      if (isWh) {
        this.adverb = null
      }
      if (wh) return [wh, false]
    }
    return [null, false]
  }
}

export const AdverbClause = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.conjunction = createWord(p.conjunction)
    this.clause = createWord(p.clause)
    this.before = p.before
    this.isWh = p.isWh
    return this
  },
  toString: function() {
    if (!this.clause) return ''
    const result = this.clause.print()
    return Array.isArray(result) ? '' : `${this.conjunction} ${result}`
  },
  getWh: function() {
    return [null, false]
  }
}


