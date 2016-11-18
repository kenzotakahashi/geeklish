import Dictionary from '../dictionary/dictionary.js'
import factory from '../factory.js'

const words = {
  Sentence: {
    Clause: () => factory.Clause(),
    ClauseContainer: () => factory.ClauseContainer()
  },
  Clause: {
    Pronoun: (w) => factory.Pronoun(w),
    Noun: (w) => factory.Noun(w),
    Determiner: (w) => factory.Determiner(w),
    NounContainer: (w) => factory.NounContainer(),
    NounClause: (w) => factory.NounClause(),
    Verb: (w) => factory.Verb(w),
    Be: (w) => factory.Be(),
    VerbContainer: (w) => factory.VerbContainer(),
    Conjunction: (w) => factory.Conjunction(w),
  },
  ClauseContainer: {
    Clause: () => factory.Clause(),
    Conjunction: (w) => factory.Conjunction(w),
  },
  Verb: {
    Pronoun: (w) => factory.Pronoun(w, 'a'),
    Noun: (w) => factory.Noun(w),
    NounContainer: (w) => factory.NounContainer(),
    NounClause: (w) => factory.NounClause(),
    Determiner: (w) => factory.Determiner(w),
    Adverb: (w) => factory.Adverb(w),
    Preposition: (w) => factory.Preposition(w),
    To: (w) => factory.To(),
    Adjective: (w) => factory.Adjective(w),
    AdjectiveClause: (w) => factory.AdjectiveClause(w),
  },
  Be: {
    Pronoun: (w) => factory.Pronoun(w, 'a'),
    Noun: (w) => factory.Noun(w),
    NounContainer: (w) => factory.NounContainer(),
    NounClause: (w) => factory.NounClause(),
    Determiner: (w) => factory.Determiner(w),
    Adverb: (w) => factory.Adverb(w),
    Preposition: (w) => factory.Preposition(w),
    To: (w) => factory.To(),
    Adjective: (w) => factory.Adjective(w),
  },
  VerbContainer: {
    Pronoun: (w) => factory.Pronoun(w, 'a'),
    Noun: (w) => factory.Noun(w),
    NounContainer: (w) => factory.NounContainer(),
    NounClause: (w) => factory.NounClause(),
    Determiner: (w) => factory.Determiner(w),
    Adverb: (w) => factory.Adverb(w),
    Preposition: (w) => factory.Preposition(w),
    To: (w) => factory.To(),
    Adjective: (w) => factory.Adjective(w),
    AdjectiveClause: (w) => factory.AdjectiveClause(w),
    Verb: (w) => factory.Verb(w),
    Be: (w) => factory.Be(),
    Conjunction: (w) => factory.Conjunction(w),
  },
  Noun: {
    Noun: (w) => factory.Noun(w),
    NounContainer: (w) => factory.NounContainer(),
    Determiner: (w) => factory.Determiner(w),
    Adjective: (w) => factory.Adjective(w),
    AdjectiveClause: (w) => factory.AdjectiveClause(w),
    Preposition: (w) => factory.Preposition(w),
  },
  NounContainer: {
    Pronoun: (w) => factory.Pronoun(w),
    Noun: (w) => factory.Noun(w),
    NounContainer: (w) => factory.NounContainer(),
    NounClause: (w) => factory.NounClause(),
    Determiner: (w) => factory.Determiner(w),
    Adjective: (w) => factory.Adjective(w),
    AdjectiveClause: (w) => factory.AdjectiveClause(w),
    Preposition: (w) => factory.Preposition(w),
    Conjunction: (w) => factory.Conjunction(w),
  },
  NounClause: {
    Clause: () => factory.Clause(),
    ClauseContainer: () => factory.ClauseContainer(),
    Noun: (w) => factory.Noun(w),
    Determiner: (w) => factory.Determiner(w),
    Adjective: (w) => factory.Adjective(w),
    AdjectiveClause: (w) => factory.AdjectiveClause(w),
    Preposition: (w) => factory.Preposition(w),
  },
  Adjective: {
    Adverb: (w) => factory.Adverb(w),
    Preposition: (w) => factory.Preposition(w),
  },
  AdjectiveClause: {
    Clause: () => factory.Clause(),
    ClauseContainer: () => factory.ClauseContainer(),
  },
  Adverb: {
    Adverb: (w) => factory.Adverb(w),
  },
  Preposition: {
    Pronoun: (w) => factory.Pronoun(w),
    Noun: (w) => factory.Noun(w),
    NounContainer: (w) => factory.NounContainer(),
    NounClause: (w) => factory.NounClause(),
    Determiner: (w) => factory.Determiner(w),
  },
  To: {
    Verb: (w) => factory.Verb(w),
    Be: (w) => factory.Be(),
    VerbContainer: (w) => factory.VerbContainer(),
  }
}

const takeWord = function(oldWord, wordBase, action_target) {
  const target = oldWord[action_target]
  const init = words[oldWord.pos][wordBase.pos](wordBase)
  const updated = Array.isArray(target) ? target.concat(init.id) : init.id
  return [updated, init]
}

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW_OPTIONS': {
      return {
        ...state,
        activeWord: state.activeWord === action.id ? 1 : action.id,
        target: null
      }
    }
    case 'SHOW_WORD_FACTORY': {
      return {
        ...state,
        activeWord: action.id,        
        target: action.target
      }
    }
    case 'CREATE_WORD': {
      const wordIndex = state.Words.findIndex(t => t.id === action.activeWord)
      const oldWord = state.Words[wordIndex]
      const wordBase = Dictionary.find(o => o.id === action.id)
      const [updated, initialized] = takeWord(oldWord, wordBase, action.target)  
      const newWord = {
        ...oldWord,
        [action.target]: updated,
      }

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
      const wordIndex = state.Words.findIndex(t => t.id === action.id)
      const oldWord = state.Words[wordIndex]
      const newWord = {
        ...oldWord,
        [action.attr]: action.change_to,
      }
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
      const wordIndex = state.Words.findIndex(t => t.id === action.id)
      const oldWord = state.Words[wordIndex]

      const number = oldWord.number === 'singular' ? 'plural' : 'singular'
      const p = number === 'singular' ? `${oldWord.word.singular}'s` :
                `${oldWord.word.plural}${oldWord.word.plural[-1] === 's' ? "'" : "'s"}`

      const newWord = {
        ...oldWord,
        number: number,
        word: {
          ...oldWord.word,
          p: p,
        },
        mode: oldWord.mode === 'p' ? 'p' : number
      }
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
      return state
    }
  }
}

export default reducer