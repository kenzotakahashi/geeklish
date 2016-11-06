import Dictionary from '../dictionary/dictionary.js'
import uuid from 'uuid';


const factory = {
  Pronoun: function(w, mode='n', is_wh=false) {
    const init = {
      id: uuid.v4(),
      pos: 'Pronoun',
      word: {
        n: w.n,
        a: w.a || w.n,
        p: w.p || null,
        r: w.r || null,
      },
      person: w.person || null,
      number: w.number || 'singular',
      mode: mode,
      is_wh: is_wh
    };
    init.word.pp = w.pp || init.word.p;
    return init;
  }
};

const takeWord = {
  Verb: {
    Pronoun: function(word_base, target) {
      const initialized = factory.Pronoun(word_base, 'a');
      const updated = target.concat(initialized.id);
      return [updated, initialized];
    }
  }
};

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_OPTIONS': {
      return {
        ...state,
        activeWord: action.id       
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
    default: {
      return state;
    }
  }
}

export default reducer;