import Dictionary from '../dictionary/dictionary.js'
import uuid from 'uuid';

const factory = {
  Pronoun: function(w, mode='n', isWh=false) {
    const init = {
      id: uuid.v4(),
      pos: 'Pronoun',
      word: {
        n: w.base,
        a: w.a || w.base,
        p: w.p || null,
        r: w.r || null,
      },
      person: w.person || null,
      number: w.number || 'singular',
      mode: mode,
      isWh: isWh
    };
    init.word.pp = w.pp || init.word.p;
    return init;
  },
  Noun: function(w, number='singular', mode=null, isWh=false) {
    const init = {
      id: uuid.v4(),
      pos: 'Noun',
      type: w.type,
      word: {
        singular: w.base,
        plural: w.plural || w.base, 
      },
      person: null,
      number: number,
      mode: mode === 'p' ? 'p' : number,
      isWh: isWh,
      adjectives: [],
      adjectivesAfter: [],
      determiners: [],
      prepositions: [],
      nouns: []
    };
    init.word.p = init.number === 'singular' ? `${init.word.singular}'s` :
                  `${init.word.plural}${init.word.plural[-1] === 's' ? "'" : "'s"}`;
    return init;
  },
  Determiner: function(w, isWh=false) {
    return {
      id: uuid.v4(),
      pos: 'Determiner',
      word: w.base,
      number: w.number,
      independent: w.independent,
      isWh: isWh
    };
  },
  Verb: function(w, mode='base') {
    const init = {
      id: uuid.v4(),
      pos: 'Verb',
      word: {
        base: w.base,
        '3s': w['3s'],
        past: w.past,
        gerund: w.gerund 
      },
      valid_complements: w.complements,
      mode: mode,
      negative: false,
      past: false,
      continuous: false,
      perfect: false,
      passive: false,
      modal: null,
      complements: [],
      predicate: null,
      adverbs: [],
      prepositions: [],
    };
    init.word.passive = w.passive || init.word.past;
    return init;
  }
};

const takeWord = {
  Clause: {
    Pronoun: function(word_base, target) {
      const initialized = factory.Pronoun(word_base);
      return [initialized.id, initialized];
    },
    Noun: function(word_base, target) {
      const initialized = factory.Noun(word_base);
      return [initialized.id, initialized];
    },
    Determiner: function(word_base, target) {
      const initialized = factory.Determiner(word_base);
      return [initialized.id, initialized];
    },
    Verb: function(word_base, target) {
      const initialized = factory.Verb(word_base);
      return [initialized.id, initialized];
    },
  },
  Verb: {
    Pronoun: function(word_base, target) {
      const initialized = factory.Pronoun(word_base, 'a');
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id;
      return [updated, initialized];
    },
    Noun: function(word_base, target) {
      const initialized = factory.Noun(word_base);
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id;
      return [updated, initialized];
    },
    Determiner: function(word_base, target) {
      const initialized = factory.Determiner(word_base);
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id;
      return [updated, initialized];
    },
  },
  Noun: {
    Determiner: function(word_base, target) {
      const initialized = factory.Determiner(word_base);
      return [target.concat(initialized.id), initialized];
    },
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_OPTIONS': {
      return {
        ...state,
        activeWord: state.activeWord === action.id ? 1 : action.id
      }
    }
    case 'SHOW_WORD_FACTORY': {
      return {
        ...state,
        target: action.target
      }
    }
    case 'CREATE_WORD': {
      const wordIndex = state.Words.findIndex(t => t.id === action.activeWord);
      const oldWord = state.Words[wordIndex];
      const word_base = Dictionary.find(o => o.id === action.id);
      const [updated, initialized] = takeWord[oldWord.pos][word_base.pos](word_base, oldWord[action.target]);  
      const newWord = {
        ...oldWord,
        [action.target]: updated,
      };

      return {
        ...state,
        activeWord: state.Sentence,
        target: false,
        Words: [
          ...state.Words.slice(0, wordIndex),
          newWord,
          ...state.Words.slice(wordIndex + 1, state.Words.length),
          initialized,
        ],
      }
    }
    case 'CHANGE_ATTRIBUTE': {
      const wordIndex = state.Words.findIndex(t => t.id === action.id);
      const oldWord = state.Words[wordIndex];
      const newWord = {
        ...oldWord,
        [action.attr]: action.change_to,
      };
      return {
        ...state,
        Words: [
          ...state.Words.slice(0, wordIndex),
          newWord,
          ...state.Words.slice(wordIndex + 1, state.Words.length),
        ],
      }
    }
    case 'CHANGE_NUMBER': {
      const wordIndex = state.Words.findIndex(t => t.id === action.id);
      const oldWord = state.Words[wordIndex];

      const number = oldWord.number === 'singular' ? 'plural' : 'singular';
      const p = number === 'singular' ? `${oldWord.word.singular}'s` :
                `${oldWord.word.plural}${oldWord.word.plural[-1] === 's' ? "'" : "'s"}`;


      const newWord = {
        ...oldWord,
        number: number,
        word: {
          ...oldWord.word,
          p: p,
        },
        mode: oldWord.mode === 'p' ? 'p' : number
      };
      return {
        ...state,
        Words: [
          ...state.Words.slice(0, wordIndex),
          newWord,
          ...state.Words.slice(wordIndex + 1, state.Words.length),
        ],
      }
    }
    default: {
      return state;
    }
  }
}

export default reducer;