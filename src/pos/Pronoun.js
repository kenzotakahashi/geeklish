const Pronoun = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.word = p.word
    this.person = p.person
    this.number = p.number
    this.mode = p.mode
    this.isWh = p.isWh
    return this    
  },
  toString: function() {
    return this.word[this.mode]
  },
  getList: function() {
    return [this]
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