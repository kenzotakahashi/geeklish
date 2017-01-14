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
    return [...to, ...phrase]
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
    return this.getList()
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
      return this.verb.getList([this.verb.word.progressive])
    } else if (this.form === 'past') {
      return this.verb.getList([this.verb.word.passive])
    } else {
      return this.verb.getList(['having', this.verb.word.passive])
    }
  },
  getWh: () => [null, false], 
}

const shouldUseAn = (word) => {
  const a_specials = ['us','uni','one','once','eu']
  const an_specials = ['hour','honor','honest']
  for (const s of a_specials) {
    if (word.startsWith(s)) return false
  }
  for (const s of an_specials) {
    if (word.startsWith(s)) return true
  }
  return 'aeiou'.includes(word[0])
}

const checkArticle = (phrase) => {
  let newPhrase = []
  for (let i=0; i < phrase.length; i++) {
    newPhrase.push(phrase[i] === 'a' && shouldUseAn(phrase[i+1]) ? 'an' : phrase[i])
  }
  return newPhrase
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
  },
  joinElements: function(list) {
    return list.reduce((a, b) => `${a}${[",","'s"].includes(b) ? b : ' '+b}`, []).slice(1)
  },
  sentence: function(c) {
    let s = this.convertToString(c)
    s = checkArticle(s)
    // console.log(s)
    // For deleting the trailing comma for Adjective clause nonessential.
    s = s.slice(-1)[0] === ',' ? s.slice(0,-1) : s
    s = this.joinElements(s)
    return this.capitalize(s + this.punctuation())
  },
  toString: function() {
    if (!this.clause) return
    const result = this.clause.print()
    return Array.isArray(result) && result[0] === false
          ? result[1] : this.sentence(result)
  }
}