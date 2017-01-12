import { createWord } from './util.js'

function beforeOrAfter(adjs) {
  const adjBeginning = []
  let adjectives = []
  const base = adjs.map(o => createWord(o))
  for (let adj of base) {
    if (adj.pos === 'Participle' && adj.beginning) {
      adjBeginning.push(adj)
    } else {
      if (adj.pos === 'AdjectiveClause' && !adj.essential) {
        adjectives = adjectives.concat([',',adj,','])
      } else {
        adjectives.push(adj)
      }
    } 
  }
  return [adjBeginning, adjectives]
}

const Pronoun = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.word = p.word
    this.person = p.person
    this.number = p.number
    this.form = p.form;
    [this.adjBeginning, this.adjectives] = beforeOrAfter(p.adjectives)
    this.prepositions = p.prepositions.map(o => createWord(o))
    this.isWh = p.isWh
    return this    
  },
  isValid: () => true,
  toString: function() {
    return this.getList().map(o => o.toString()).join(' ')
  },
  getList: function() {
    const adj = this.adjectives || []
    const prep = this.prepositions || []
    return [this.word[this.form], ...adj, ...prep]
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