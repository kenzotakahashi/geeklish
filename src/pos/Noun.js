import { createWord } from './util.js';

const Noun = {
  init: function(w) {
    this.id = w.id;
    this.pos = w.pos;
    this.word = w.word;
    this.person = w.person;
    this.number = w.number;
    this.mode = w.mode;
    this.isWh = w.isWh;
    this.adjectives = w.adjectives.map(o => createWord(o));
    this.adjectivesAfter = w.adjectivesAfter.map(o => createWord(o));
    this.determiners = w.determiners.map(o => createWord(o));
    this.prepositions = w.prepositions.map(o => createWord(o));
    this.nouns = w.nouns.map(o => createWord(o));
    return this
  },
  toString: function() {
    return this.getList().map(o => o.toString()).join(' ')
  },
  getList: function() {
    return this.getRest(this.word[this.mode])
  },
  getRest: function(noun) {
    return [...this.determiners,
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
      return past ? 'was' : 'is';
    }
  },
  is3s: function() {
    return this.number === 'singular' && ![1,2].includes(this.person)
  },
  getWh: function() {
    if (this.isWh) return (this, true);
    for (const attr of ['adjectives','adjectivesAfter','determiners','prepositions']) {
      for (let i = 0; i < this[attr].length; i++) {
        const [wh, isWh] = this[attr][i].getWh();
        if (isWh) {
          this[attr].splice(i, 1);
        }
        if (wh) return [wh, false];
      }
    }
    return [null, false];
  }
}

export default Noun;