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

  this.getVerb = function(v) {
    if (v.perfect || v.continuous || !!v.modal || v.negative || v.passive) {
      return // TODO
    }
    if (v.past) {
      return [v.word['past']];
    }
    return this.subject.is3s() ? [v.word['3s']] : [v.word['base']];
  };

  this.getClause = function() {
    let s = this.subject;
    let v = this.verb;

    if (this.c_type === 'command') {
      if (!v) return '(You need a verb)';
      const negative = v.negative ? ['do not '] : [];
      return negative.concat(v.getList([v.word.base]));
    }
    if (!s || !v) return '(You need a subject and a verb)';
    
    let c = s.getList();
    if (v.pos === "Be") {
      return // TODO
    }
    if (v.pos === "Verb") {
      if (this.c_type === 'question' && !s.is_wh) {
        const [head, rest] = this.getVerb_for_question(v);
        return [head, ...c, ...v.getList(rest)];
      } else {
        return c.concat(v.getList(this.getVerb(v)));
      }
    }
  }

  this.print = function() {
    let c = this.getClause();
    if (typeof(c) === 'string') {
      return c;
    }
    c = c.map(o => o.toString()).join(' ')
    return c
  };
};

export default Clause;