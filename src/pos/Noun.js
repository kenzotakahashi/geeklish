import { createWord } from './util.js';

const Noun = function(p) {
  this.id = p.id;
  this.pos = p.pos;
  this.word = p.word;
  this.person = p.person;
  this.number = p.number;
  this.mode = p.mode;
  this.isWh = p.isWh;
  this.adjectives = p.adjectives.map(o => createWord(o));
  this.adjectivesAfter = p.adjectivesAfter.map(o => createWord(o));
  this.determiners = p.determiners.map(o => createWord(o));
  this.prepositions = p.prepositions.map(o => createWord(o));
  this.nouns = p.nouns.map(o => createWord(o));
  
  this.toString = () => this.getList().map(o => o.toString()).join(' ');

  this.getList = () => this.getRest(this.word[this.mode]);

  this.getRest = (noun) => [...this.determiners, ...this.adjectives, ...this.nouns, 
                            noun, ...this.adjectivesAfter, ...this.prepositions];

  this.getBe = (past) => {
    if (this.number === 'plural' || this.person === 2) {
      return past ? 'were' : 'are'
    } else {
      return past ? 'was' : 'is';
    }
  };

  this.is3s = () => this.number === 'singular' && ![1,2].includes(this.person);
  this.getWh = () => {
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
};

export default Noun;