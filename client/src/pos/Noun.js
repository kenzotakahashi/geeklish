import { createWord } from './util.js'

const getWh = function() {
  if (this.isWh) return [this, true]
  for (const attr of ['adjectives','adjectivesAfter','prepositions']) {
    for (let i = 0; i < this[attr].length; i++) {
      const [wh, isWh] = this[attr][i].getWh()
      if (isWh) {
        this[attr].splice(i, 1)
      }
      if (wh) return [wh, false]
    }
  }
  return [null, false]
}

function beforeOrAfter(adjs) {
  const adjBeginning = []
  const adjectives = []
  const adjectivesAfter = []
  const base = adjs.map(o => createWord(o))
  for (let adj of base) {
    if (adj.pos === 'Participle' && adj.beginning) {
      adjBeginning.push(adj)
    } else if (adj.pos === 'Adjective' || (adj.pos === 'Participle' && !adj.isPhrase())) {
      adjectives.push(adj)
    } else {
      adjectivesAfter.push(adj)
    } 
  }
  return [adjBeginning, adjectives, adjectivesAfter]
}

function shouldUseAn(word) {
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

function checkArticle(phrase) {
  let newPhrase = []
  for (let i=0; i < phrase.length; i++) {
    newPhrase.push(phrase[i].word === 'a' && shouldUseAn(phrase[i+1].toString()) ? 'an' : phrase[i])
  }
  return newPhrase
}

export const Noun = {
  init: function(w) {
    this._id = w._id
    this.pos = w.pos
    this.word = w.word
    this.person = w.person
    this.number = w.number
    this.isWh = w.isWh;
    [this.adjBeginning, this.adjectives, this.adjectivesAfter] = beforeOrAfter(w.adjectives)
    this.quantifier = createWord(w.quantifier)
    this.determiner = createWord(w.determiner)
    this.prepositions = w.prepositions.map(o => createWord(o))
    this.nouns = w.nouns.map(o => createWord(o))
    return this
  },
  possessive: function() {
    if (this.adjectivesAfter.length > 0 || this.prepositions.length > 0) {
      const list = this.getList()
      const last = `${list.slice(-1)[0]}'s`
      return [...list.slice(0,-1), last]
    } else {
      const possessive = this.number === 'singular' ? `${this.word.singular}'s` :
              `${this.word.plural}${this.word.plural.slice(-1) === 's' ? "'" : "'s"}`
      return this.getRest(possessive)
    }
  },
  isValid: () => true,
  toString: function() {
    return this.getList().map(o => o.toString()).join(' ')
  },
  getList: function() {
    return checkArticle(this.getRest(this.word[this.number]))
  },
  getRest: function(noun) {
    return [this.quantifier || '',
            this.determiner || '',
            ...this.adjectives,
            ...this.nouns, 
            noun,
            ...this.adjectivesAfter,
            ...this.prepositions]
  },
  getBe: function(past) {
    if (this.number === 'plural' || this.person === 2) {
      return past ? 'were' : 'are'
    } else {
      return past ? 'was' : 'is'
    }
  },
  is3s: function() {
    return this.number === 'singular' && ![1,2].includes(this.person)
  },
  getWh: getWh
}

export const NounContainer = {
  init: function(w) {
    this._id = w._id
    this.pos = w.pos
    this.person = w.person
    this.number = w.number
    this.isWh = w.isWh;
    [this.adjectives, this.adjectivesAfter] = beforeOrAfter(w.adjectives)
    this.quantifier = createWord(w.quantifier)
    this.determiner = createWord(w.determiner)
    this.prepositions = w.prepositions.map(o => createWord(o))
    this.nouns = w.nouns.map(o => createWord(o))
    this.conjunction = createWord(w.conjunction)
    return this
  },
  possessive: function() {
    const list = this.getList()
    const last = `${list.slice(-1)[0]}'s`
    return [...list.slice(0,-1), last]
  },
  isValid: function() {
    return this.nouns.length > 0 && !!this.conjunction
  },
  toString: function() {
    return this.getList().map(o => o.toString()).join(' ')
  },
  getList: function() {
    let with_conj = []
    for (let i = 0; i < this.nouns.length; i++) {
      with_conj = with_conj.concat(i === this.nouns.length - 1 ?
                                   this.nouns[i] : [this.nouns[i], this.conjunction])
    }
    return this.getRest(with_conj)
  },
  getRest: function(noun) {
    return [this.quantifier || '',
            this.determiner || '',
            ...this.adjectives,
            ...noun,
            ...this.adjectivesAfter,
            ...this.prepositions]
  },
  getBe: function(form) {
    return form === 'past' ? 'were' : 'are'
  },
  is3s: function() {
    return false
  },
  getWh: getWh,
}

export const NounClause = {
  init: function(w) {
    this._id = w._id
    this.pos = w.pos
    this.person = w.person
    this.number = w.number
    this.that = w.that
    this.clause = createWord(w.clause)
    this.isWh = w.isWh;
    [this.adjectives, this.adjectivesAfter] = beforeOrAfter(w.adjectives)
    this.quantifier = createWord(w.quantifier)
    this.determiner = createWord(w.determiner)
    this.prepositions = w.prepositions.map(o => createWord(o))
    this.nouns = w.nouns.map(o => createWord(o))
    return this
  },
  isValid: function() {
    return this.clause && !Array.isArray(this.clause.print())
  },
  toString: function() {
    const list = this.getList()
    return !!list ? list.map(o => o.toString()).join(' ') : ''
  },
  getList: function() {
    if (!this.clause) return
    const result = this.clause.print()
    return Array.isArray(result) ? '' : this.getRest(`${this.that ? 'that ' : ''}${result}`)
  },
  getRest: function(noun) {
    return [this.quantifier || '',
            this.determiner || '',
            ...this.adjectives,
            ...this.nouns, 
            noun,
            ...this.adjectivesAfter,
            ...this.prepositions]
  },
  getBe: function(form) {
    return form === 'past' ? 'was' : 'is'
  },
  is3s: function() {
    return true
  },
  getWh: getWh,
}