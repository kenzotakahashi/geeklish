import { createWord } from './util.js'

export const Infinitive = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.verb = createWord(p.verb)
    this.omit = p.omit
    this.before = p.before
    return this    
  },
  toString: function() {
    const phrase = !!this.verb ? this.verb.verbAfterTo() : []
    const to = this.omit ? [] : ['to']
    return [...to, ...phrase.map(o => o.toString())].join(' ')
  },
  getWh: () => [null, false],
}

export const Gerund = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.verb = createWord(p.verb)
    return this    
  },
  getList: function() {
    return !!this.verb ? this.verb.getList() : []
  },
  toString: function() {
    return this.getList().map(o => o.toString()).join(' ')
  },
  getBe: (past) => past ? 'was' : 'is',
  getWh: () => [null, false],
  isValid: () => true,
  is3s: () => true,
}

export const Participle = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.verb = createWord(p.verb)
    this.form = p.form
    this.beginning = p.beginning
    return this
  },
  isPhrase: function() {
    return !!this.verb && this.verb.getList([]).length > 0
  },
  toString: function() {
    if (!this.verb) return ''
    if (this.form === 'present') {
      return this.verb.getList([this.verb.word.progressive]).join(' ')
    } else if (this.form === 'past') {
      return this.verb.getList([this.verb.word.passive]).join(' ')
    } else {
      return this.verb.getList(['having', this.verb.word.passive]).join(' ')
    }
  },
  getWh: () => [null, false], 
}

export const Sentence = {
  init: function(p) {
    this._id = p._id
    this.pos = p.pos
    this.clause = createWord(p.clause)
    return this
  },
  capitalize: function(s) {
    return s[0].toUpperCase() + s.slice(1)
  },
  punctuation: function() {
    return this.clause.cType === 'question' ? '?' : '.'
  },
  convertToString: function(c) {
    if (c.filter(o => typeof o === 'object').length > 0) {
      return this.convertToString(
        c.filter(t => !['', null].includes(t))
         .map(o => Array.isArray(o) ? o : o.toString())
         .reduce((a, b) => a.concat(b), [])
      )
    }
    return c
            // .filter(t => !['', null].includes(t))
            // .map(o => o.toString())
  },
  joinElements: function(list) {
    return list.reduce((a, b) => `${a}${b === ',' ? ',' : ' '+b}`, []).slice(1)
  },
  sentence: function(c) {
    console.log(s)
    let s = this.convertToString(c)
    console.log(s)
    s = s.slice(-1)[0] === ',' ? s.slice(0,-1) : s
    s = this.joinElements(s)
    // For deleting the trailing comma for Adjective clause nonessential.
    return this.capitalize(s + this.punctuation())
  },
  toString: function() {
    if (!this.clause) return
    const result = this.clause.print()
    return Array.isArray(result) && result[0] === false
          ? result[1] : this.sentence(result)
  }
}