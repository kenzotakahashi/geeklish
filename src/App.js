import React, { Component } from 'react';
import { createStore } from 'redux';
import './App.css';
// import { Navbar, Jumbotron, Button } from 'react-bootstrap';
import Dictionary from './dictionary/dictionary.js'
import reducer from './reducers/reducer.js'

const e = React.createElement;

const initialState = {
  activeWord: false,
  target: false,
  Sentence: 1,
  Words: [
    {
      id: 1,
      pos: 'Clause',
      c_type: 'statement',
      subject: 2,
      verb: 4,
      adjective_clause: null,
      adverbs: [],
      conjunction: null,
    },
    {
      id: 2,
      pos: 'Pronoun',
      word: {
        n: "I",
        a: "me",
        p: "my",
        pp: "mine",
        r: "myself",
      },
      person: 1,
      number: 'singular',
      mode: 'n',
      is_wh: false
    },
    {
      id: 3,
      pos: 'Pronoun',
      word: {
        n: "you",
        a: "you",
        p: "your",
        pp: "yours",
        r: "yourself",
      },
      person: 2,
      number: 'singular',
      mode: 'n',
      is_wh: false
    },
    {
      id: 4,
      pos: 'Verb',
      word: {
        base: 'love',
        '3s': 'loves',
        past: 'loved',
        gerund: 'loving',
      },
      valid_complements: [
        ['N']
      ],
      mode: 'base',
      negative: false,
      past: true,
      continuous: false,
      perfect: false,
      passive: false,
      modal: null,
      complements: [3],
      // complements: [],
      predicate: null,
      adverbs: [],
      prepositions: []
    },
  ],
};

const store = createStore(reducer, initialState);

const pos = {
  Verb: function(v) {
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
    this.predicate = v.predicate;
    this.adverbs = v.adverbs;
    this.prepositions = v.prepositions;

    this.toString = function() {
      const verb = this.get_list([this.word[this.mode]]);
      return verb.join(' ');
      // verb = verb.map(v => typeof(p) === 'string' ? p : p.str()
    };

    this.str_adverbs = function(verb, adverbs) {
      if (!adverbs) {
        return verb;
      }
      const before = [];
      const after = [];
      for (const adv of adverbs) {
        if (adv.position === 'before_verb') {
          before.push(adv);
        } else {
          after.push(adv);
        }
      }
      return [...before, ...verb, ...after];
    };
    this.get_list = function(word) {
      let verb = word.concat(this.complements);
      verb = this.predicate ? verb.concat(this.predicate) : verb;
      verb = this.str_adverbs(verb, this.adverbs);
      verb = verb.concat(this.prepositions);
      return verb;
    };
  },
  Pronoun: function(p, state) {
    this.id = p.id;
    this.pos = p.pos;
    this.word = p.word;
    this.person = p.person;
    this.number = p.number;
    this.mode = p.mode;
    this.is_wh = p.is_wh;
    
    this.toString = function() {
      return this.word[this.mode];
    };

    this.get_list = function() {
      return [this];
    };

    this.is_3s = function() {
      return this.number === 'singular' && ![1,2].includes(this.person);
    };
  },
  Clause: function(c, state) {
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
        const negative = v.negative ? ['do not '] : [];
        return negative.concat(v.get_list([v.word.base]));
      }
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
      // const beginnings 
      c = c.map(o => o.toString()).join(' ')
      return c
    };
  },
};

function createWord(id) {
  const state = store.getState();
  const word = state.Words.find(o => o.id === id);
  return new pos[word.pos](word);
}

const WordFactory = React.createClass({
  createNewWord: function (id, activeWord, target) {
    store.dispatch({
      type: 'CREATE_WORD',
      id: id,
      activeWord: activeWord,
      target: target,
    });
  },
  render: function() {
    const state = store.getState();
    const words = Dictionary.map(o => (
      <li className='list-group-item' key={o.id} onClick={() => (
        this.createNewWord(o.id, state.activeWord, state.target)
      )}>
        {o.n}
      </li>
    ));
    return (
      <div className='col-md-6'>
        <ul className='list-group'>
          {words}
        </ul>
      </div>
    );
  }
});

const Output = React.createClass({
  render: function() {
    const state = store.getState();
    const c = new pos.Clause(state.Words.find(o => o.id === state.Sentence));
    return (
      <div className='container'>
        {c.print()}
      </div>
    );
  }
});

const components = {
  Sentence: React.createClass({
    render: function() {
      const state = store.getState();
      const clause = state.Sentence;
      const SpecificClause = components[state.Words.find(o => o.id === clause).pos];
      return (
        <div className='col-md-6'>
          <div className='list-group'>
            <SpecificClause id={clause} />
          </div>
        </div>     
      );
    },
  }),
  Clause: React.createClass({
    render: function() {
      const state = store.getState();
      const clause = state.Words.find(o => o.id === this.props.id);
      const subject = clause.subject;
      const verb = clause.verb;
      return (
        <div>
          {e(components[state.Words.find(o => o.id === subject).pos], {id: subject})}
          {e(components[state.Words.find(o => o.id === verb).pos], {id: verb})}
        </div>
      );
    },
  }),
  Pronoun: React.createClass({
    render: function() {
      const state = store.getState();
      const pronoun = state.Words.find(o => o.id === this.props.id);
      return (
        <div className="list-group-item">
          {pronoun.word.n}
        </div>
      );
    },
  }),
  Verb: React.createClass({
    showOptions: function () {
      store.dispatch({
        type: 'SHOW_OPTIONS',
        id: this.props.id,
      });
    },
    showWordFacotory: function(target) {
      store.dispatch({
        type: 'SHOW_WORD_FACTORY',
        id: this.props.id,
        target: target,
      });
    },
    changeAttribute: function(attr, id, change_to) {
      store.dispatch({
        type: 'CHANGE_ATTRIBUTE',
        id,
        attr,
        change_to,
      });
    },
    render: function() {
      const state = store.getState();
      const verb = state.Words.find(o => o.id === this.props.id);
      const complements = verb.complements.map(comp => (
        e(components[state.Words.find(o => o.id === comp).pos], {key: comp, id: comp})
      ));
      const options = state.activeWord === this.props.id ? (
          <div>
            <div onClick={() => this.showWordFacotory('complements')}>complements</div>
            <div onClick={() => this.showWordFacotory('predicate')}>predicate</div>
            <div onClick={() => this.showWordFacotory('adverbs')}>adverbs</div>
            <div onClick={() => this.showWordFacotory('prepositions')}>prepositions</div>
          </div>
        ) : '';
      const attributes = ['past','negative','continuous','perfect','passive'].map(o => (
        e('button', {
          className: `btn btn-sm btn-${verb[o] ? 'success' : 'default'}`,
          key: o,
          type: 'button',
          onClick: () => this.changeAttribute(o, this.props.id, !verb[o])
        }, o)
      ));      

      return (
        <div className="list-group-item">
          <span onClick={this.showOptions}>{verb.word.base}</span>
          {attributes}
          {complements}
          {options}
        </div>
      );
    },
  }),
};

const App = React.createClass({
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate());
  },
  render: function() {
    const state = store.getState();
    const wordFactory = !!state.target ? <WordFactory /> : '';
    return (
      <div className=''>
        <Output />
        <div className='row'>
          {e(components.Sentence)}
          {wordFactory}
        </div>
      </div>
    );
  }
});

export default App;