import { createWord } from './util.js'

export const To = {
  init: function(p) {
    this.id = p.id
    this.pos = p.pos
    this.verb = createWord(p.verb)
    return this    
  },
  toString: function() {
    const phrase = !!this.verb ? this.verb.verbAfterTo() : []
    return ['to', ...phrase.map(o => o.toString())].join(' ')
  }
}