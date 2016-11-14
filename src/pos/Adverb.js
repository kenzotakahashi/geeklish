import { createWord } from './util.js'

const Adverb = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.word = p.word
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
    return !!this.word.adverb ?
            `${this.word.adverb.toString()} ${this.word}`:
            this.word
  },
  getWh: function() {
    if (this.isWh) return (this, true)
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

export default Adverb