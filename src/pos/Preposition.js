import { createWord } from './util.js'

const Preposition = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.word = p.word
    this.isWh = p.isWh
    this.complement = createWord(p.complement)
    return this    
  },
  toString: function() {
    return !!this.complement ?
            `${this.word} ${this.complement.toString()}` :
            this.word
  },
  getWh: function() {
    if (this.isWh) return (this, true)
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