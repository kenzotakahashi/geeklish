import Dictionary from '../dictionary/dictionary.js'
import factory from '../factory.js'

const takeWord = {
  Sentence: {
    Clause: function() {
      const initialized = factory.Clause()
      return [initialized.id, initialized]
    }
  },
  Clause: {
    Pronoun: function(word_base, target) {
      const initialized = factory.Pronoun(word_base)
      return [initialized.id, initialized]
    },
    Noun: function(word_base, target) {
      const initialized = factory.Noun(word_base)
      return [initialized.id, initialized]
    },
    Determiner: function(word_base, target) {
      const initialized = factory.Determiner(word_base)
      return [initialized.id, initialized]
    },
    NounContainer: function(word_base, target) {
      const initialized = factory.NounContainer()
      return [initialized.id, initialized]
    },
    Verb: function(word_base, target) {
      const initialized = factory.Verb(word_base)
      return [initialized.id, initialized]
    },
    Be: function(word_base, target) {
      const initialized = factory.Be()
      return [initialized.id, initialized]
    },
  },
  Verb: {
    Pronoun: function(word_base, target) {
      const initialized = factory.Pronoun(word_base, 'a')
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id
      return [updated, initialized]
    },
    Noun: function(word_base, target) {
      const initialized = factory.Noun(word_base)
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id
      return [updated, initialized]
    },
    NounContainer: function(word_base, target) {
      const initialized = factory.NounContainer()
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id
      return [updated, initialized]
    },
    Determiner: function(word_base, target) {
      const initialized = factory.Determiner(word_base)
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id
      return [updated, initialized]
    },
    Adverb: function(word_base, target) {
      const initialized = factory.Adverb(word_base)
      return [target.concat(initialized.id), initialized]      
    },
    Preposition: function(word_base, target) {
      const initialized = factory.Preposition(word_base)
      return [target.concat(initialized.id), initialized]      
    },
    To: function(word_base, target) {
      const initialized = factory.To()
      return [target.concat(initialized.id), initialized]      
    },
    Adjective: function(word_base, target) {
     const initialized = factory.Adjective(word_base)
     return [initialized.id, initialized]
    },
  },
  Be: {
    Pronoun: function(word_base, target) {
      const initialized = factory.Pronoun(word_base, 'a')
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id
      return [updated, initialized]
    },
    Noun: function(word_base, target) {
      const initialized = factory.Noun(word_base)
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id
      return [updated, initialized]
    },
    NounContainer: function(word_base, target) {
      const initialized = factory.NounContainer()
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id
      return [updated, initialized]
    },
    Determiner: function(word_base, target) {
      const initialized = factory.Determiner(word_base)
      const updated = Array.isArray(target) ?
                      target.concat(initialized.id): initialized.id
      return [updated, initialized]
    },
    Adverb: function(word_base, target) {
      const initialized = factory.Adverb(word_base)
      return [target.concat(initialized.id), initialized]      
    },
    Preposition: function(word_base, target) {
      const initialized = factory.Preposition(word_base)
      return [target.concat(initialized.id), initialized]      
    },
    To: function(word_base, target) {
      const initialized = factory.To()
      return [target.concat(initialized.id), initialized]      
    },
    Adjective: function(word_base, target) {
     const initialized = factory.Adjective(word_base)
     return [initialized.id, initialized]
    },
  },
  Noun: {
    Determiner: function(word_base, target) {
      const initialized = factory.Determiner(word_base)
      return [target.concat(initialized.id), initialized]
    },
    Adjective: function(word_base, target) {
      const initialized = factory.Adjective(word_base)
      return [target.concat(initialized.id), initialized]      
    },
    Preposition: function(word_base, target) {
      const initialized = factory.Preposition(word_base)
      return [target.concat(initialized.id), initialized]      
    },
  },
  NounContainer: {
    Pronoun: function(word_base, target) {
      const initialized = factory.Pronoun(word_base)
      return [target.concat(initialized.id), initialized]
    },
    Noun: function(word_base, target) {
      const initialized = factory.Noun(word_base)
      return [target.concat(initialized.id), initialized]
    },
    NounContainer: function(word_base, target) {
      const initialized = factory.NounContainer()
      return [target.concat(initialized.id), initialized]
    },
    Determiner: function(word_base, target) {
      const initialized = factory.Determiner(word_base)
      return [target.concat(initialized.id), initialized]
    },
    Adjective: function(word_base, target) {
      const initialized = factory.Adjective(word_base)
      return [target.concat(initialized.id), initialized]      
    },
    Preposition: function(word_base, target) {
      const initialized = factory.Preposition(word_base)
      return [target.concat(initialized.id), initialized]      
    },
  },
  Adjective: {
    Adverb: function(word_base, target) {
      const initialized = factory.Adverb(word_base)
      return [target.concat(initialized.id), initialized]      
    },
    Preposition: function(word_base, target) {
      const initialized = factory.Preposition(word_base)
      return [target.concat(initialized.id), initialized]      
    },
  },
  Adverb: {
    Adverb: function(word_base, target) {
      const initialized = factory.Adverb(word_base)
      return [target.concat(initialized.id), initialized]      
    },    
  },
  Preposition: {
    Pronoun: function(word_base, target) {
     const initialized = factory.Pronoun(word_base, 'a')
     return [initialized.id, initialized]
    },
    Noun: function(word_base, target) {
     const initialized = factory.Noun(word_base)
     return [initialized.id, initialized]
    },
    Determiner: function(word_base, target) {
     const initialized = factory.Determiner(word_base)
     return [initialized.id, initialized]
    }, 
    NounContainer: function(word_base, target) {
      const initialized = factory.NounContainer()
      return [initialized.id, initialized]
    },
  },
  To: {
    Verb: function(word_base, target) {
     const initialized = factory.Verb(word_base)
     return [initialized.id, initialized]
    },    
  }
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
      const word_base = Dictionary.find(o => o.id === action.id)
      const [updated, initialized] = takeWord[oldWord.pos][word_base.pos](word_base, oldWord[action.target])  
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