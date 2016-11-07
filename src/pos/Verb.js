import { createWord } from './util.js';

const Verb = function(v) {
  this.id = v.id;
  this.pos = v.pos;
  this.word = v.word;
  this.valid_complements = v.valid_complements;
  this.mode = v.mode;
  this.past = v.past;
  this.negative = v.negative;
  this.continuous = v.continuous;
  this.perfect = v.perfect;
  this.passive = v.passive;
  this.modal = v.modal;
  this.complements = v.complements.map(o => createWord(o));
  this.predicate = createWord(v.predicate);
  this.adverbs = v.adverbs.map(o => createWord(o));;
  this.prepositions = v.prepositions.map(o => createWord(o));;

  this.toString = function() {
    const verb = this.getList([this.word[this.mode]]);
    return verb.join(' ');
  };

  this.str_adverbs = function(verb, adverbs) {
    if (!adverbs) {
      return verb;
    }
    const before = [];
    const after = [];
    for (const adv of adverbs) {
      if (adv.position === 'before') {
        before.push(adv);
      } else {
        after.push(adv);
      }
    }
    return [...before, ...verb, ...after];
  };
  this.getList = function(word) {
    let verb = word.concat(this.complements);
    verb = this.predicate ? verb.concat(this.predicate) : verb;
    verb = this.str_adverbs(verb, this.adverbs);
    verb = verb.concat(this.prepositions);
    return verb;
  };
};

export default Verb;