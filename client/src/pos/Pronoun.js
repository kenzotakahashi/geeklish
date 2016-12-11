import { createWord } from './util.js'

const Pronoun = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.word = p.word
    this.person = p.person
    this.number = p.number
    this.form = p.form
    this.adjective = createWord(p.adjective)
    this.isWh = p.isWh
    return this    
  },
  isValid: () => true,
  toString: function() {
    return this.getList().map(o => o.toString()).join(' ')
  },
  getList: function() {
    const adj = this.adjective || []
    return [this.word[this.form], adj]
  },
  getBe: function(past) {
    if (this.number === 'plural' || this.person === 2) {
      return past ? 'were' : 'are'
    } else {
      return past ? 'was' : this.person === 1 ? 'am' : 'is'
    }
  },
  is3s: function() {
    return this.number === 'singular' && ![1,2].includes(this.person)
  },
  getWh: function() {
    return this.isWh ? [this, true] : [null, false] 
  }
}

export default Pronoun