import { createWord } from './util.js';

const Clause = function(c, state) {
  this.id = c.id;
  this.pos = c.pos;
  this.c_type = c.c_type;
  this.subject = createWord(c.subject);
  this.verb = createWord(c.verb);
  this.adjective_clause = c.adjective_clause;
  this.adverbs = c.adverbs;
  this.conjunction = c.conjunction;

  this.get_verb = function(v) {
    if (v.perfect || v.continuous || !!v.modal || v.negative || v.passive) {
      return // TODO
    }
    if (v.past) {
      return [v.word['past']];
    }
    return this.subject.is_3s() ? [v.word['3s']] : [v.word['base']];
  };

  this.get_clause = function() {
    let s = this.subject;
    let v = this.verb;

    if (this.c_type === 'command') {
      if (!v) return '(You need a verb)';
      const negative = v.negative ? ['do not '] : [];
      return negative.concat(v.get_list([v.word.base]));
    }
    if (!s || !v) return '(You need a subject and a verb)';
    
    let c = s.get_list();
    if (v.pos === "Be") {
      return // TODO
    }
    if (v.pos === "Verb") {
      if (this.c_type === 'question' && !s.is_wh) {
        const [head, rest] = this.get_verb_for_question(v);
        return [head, ...c, ...v.get_list(rest)];
      } else {
        return c.concat(v.get_list(this.get_verb(v)));
      }
    }
  }

  this.print = function() {
    let c = this.get_clause();
    if (typeof(c) === 'string') {
      return c;
    }
    c = c.map(o => o.toString()).join(' ')
    return c
  };
};

export default Clause;