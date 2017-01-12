import { createWord } from './util.js'

export const Adjective = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.word = p.word
    this.form = p.form
    this.adverbs = p.adverbs.map(o => createWord(o))
    this.complement = createWord(p.complement)
    this.after = p.after
    this.isWh = p.isWh
    return this    
  },  
  toString: function() {
    let adj = [...this.adverbs, this.word[this.form]]
    adj = this.complement ? adj.concat(this.complement) : adj
    return adj.map(o => o.toString()).join(' ')
  },
  getWh: function() {
    if (this.isWh) return [this, true]
    for (const attr of ['adverbs']) {
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
    this._id = p._id
    this.pos = p.pos
    this.clause = createWord(p.clause)
    this.essential = p.essential
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

export const Appositive = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.noun = createWord(p.noun)
    this.essential = p.essential
    return this
  },
  isValid: function() {
    return !!this.noun
  },
  toString: function() {
    if (!this.noun) return ''
    return this.noun
  }
}