import { createWord } from './util.js';

export const To = function(p) {
  this.id = p.id;
  this.pos = p.pos;
  this.verb = createWord(p.verb);

  this.toString = () => {
    const phrase = !!this.verb ? this.verb.verbAfterTo() : [];
    return ['to', ...phrase.map(o => o.toString())].join(' ');
  };

};