import reducer from './reducers/reducer.js';
import { createStore } from 'redux';

let initialState = {
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
      predicate: null,
      adverbs: [],
      prepositions: []
    },
  ],
};

initialState = {
  activeWord: 1,
  target: false,
  Sentence: 1,
  Words: [
    {
      id: 1,
      pos: 'Clause',
      c_type: 'statement',
      subject: null,
      verb: null,
      adjective_clause: null,
      adverbs: [],
      conjunction: null,
    },
  ],
};

const store = createStore(reducer, initialState);

export default store;