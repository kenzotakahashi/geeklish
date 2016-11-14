// import { createWord } from './util.js'

const Determiner = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.word = p.word
    this.number = p.number
    this.isWh = p.isWh
    return this
  },
  toString: function() {
    return this.word
  },
  getBe: function(past) {
    if (this.number === 'plural' || this.person === 2) {
      return past ? 'were' : 'are'
    } else {
      return past ? 'was' : 'is'
    }
  },
  is3s: function() {
    return this.number === 'singular'
  },
  getWh: function() {
    return this.isWh ? [this, true] : [null, false]
  },
}

export default Determiner