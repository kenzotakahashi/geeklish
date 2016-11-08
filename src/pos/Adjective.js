import { createWord } from './util.js';

const Adjective = function(p) {
  this.id = p.id;
  this.pos = p.pos;
  this.word = p.word;
  this.mode = p.mode;
  this.adverbs = p.adverbs.map(o => createWord(o));
  this.prepositions = p.prepositions.map(o => createWord(o));
  this.isWh = p.isWh;
  
  this.toString = () => [
    ...this.adverbs,
    this.word[this.mode],
    ...this.prepositions
  ].map(o => o.toString()).join(' ');

  this.getWh = () => {
    if (this.isWh) return (this, true);
    for (const attr of ['adverbs','prepositions']) {
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

export default Adjective;