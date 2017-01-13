import { createWord } from './util.js'

const Preposition = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.word = p.word
    this.complement = createWord(p.complement)
    this.before = p.before
    this.isWh = p.isWh
    return this    
  },
  toString: function() {
    return !!this.complement ?
            [this.word, this.complement.toString()] : [this.word]
            // `${this.word} ${this.complement.toString()}` :
            // this.word
  },
  getWh: function() {
    if (this.isWh) return [this, true]
    if (this.complement) {
      const [wh, isWh] = this.complement.getWh()
      if (isWh) {
        this.complement = null
      }
      if (wh) return [wh, false]
    }
    return [null, false]
  }
}

export default Preposition