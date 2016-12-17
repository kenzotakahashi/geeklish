import store from './store.js'
import Client from './Client'
import { showWordFactory, createNewWord } from './actions'

const nouns = ['Noun', 'Pronoun', 'NounClause', 'Gerund']
const verbs = ['Verb', 'Be']
const adjectives = ['Adjective', 'AdjectiveClause', 'Participle']
const adverbs = ['Adverb', 'AdverbClause']
const coordinating = [{pos: 'Conjunction', attr: (w) => w.type === 'coordinating' }]
const complements = [...nouns, 'Adjective', 'Adverb', 'Preposition', 'Infinitive']
const determiners = ['Determiner', 'Possessive']
// const verbAdverbs = [{pos: 'Adverb', attr: (w) =>}]

const valid_pos = {
  Sentence: {
    clause: ['Clause'],
  },
  Clause: {
    adverbs: ['Adverb'],
    subject: [...nouns, 'Infinitive'],
    verb: verbs,
    adjective: ['AdjectiveClause'],
  },
  ClauseContainer: {
    clauses: ['Clause'],
    conjunction: coordinating
  },
  Verb: {
    particle: ['Preposition'],
    complements: complements,
    adverbs: [...adverbs, 'Infinitive'],
    prepositions: ['Preposition']
  },
  Be: {
    complements: complements,
    adverbs: [...adverbs, 'Infinitive'],
    prepositions: ['Preposition']
  },
  VerbContainer: {
    complements: complements,
    adverbs: [...adverbs, 'Infinitive'],
    prepositions: ['Preposition'],
    verbs: verbs,
    conjunction: coordinating
  },
  Noun: {
    determiners: determiners,
    adjectives: [...adjectives, 'Infinitive'],
    nouns: ['Noun', 'NounClause'],
    prepositions: ['Preposition'],
  },
  NounContainer: {
    nouns: nouns,
    adjectives: adjectives,
    prepositions: ['Preposition'],
    determiners: determiners,
    conjunction: coordinating
  },
  NounClause: {
    clause: ['Clause'],
    nouns: ['Noun', 'NounClause'],
    determiners: determiners,
    adjectives: adjectives,
    prepositions: ['Preposition'],
  },
  Pronoun: {
    adjectives: ['Infinitive', 'Participle'], 
    prepositions: ['Preposition'],
  },
  Determiner: {
    adverb: ['Adverb'],
  },
  Adjective: {
    adverbs: ['Adverb'],
    prepositions: ['Preposition'] 
  },
  AdjectiveClause: {
    clause: ['Clause']
  },
  Adverb: {
    adverb: ['Adverb']
  },
  AdverbClause: {
    conjunction: [{pos: 'Conjunction', attr: (w) => w.type === 'subordinating' }],
    clause: ['Clause']
  },
  Preposition: {
    complement: nouns
  },
  Infinitive: {
    verb: verbs
  },
  Gerund: {
  	verb: verbs
  },
  Participle: {
  	verb: verbs
  },
  Possessive: {
    noun: [{pos: 'Pronoun', attr: (w) => !!w.p }, 'Noun'],
  },
}

function valid_check(valid_list, word) {
  for (let valid of valid_list) {
    if (typeof(valid) === 'string') {
      if (valid === word.pos) {
        return true
      }
    } else {
      if (valid.pos === word.pos && valid.attr(word)) {
        return true
      }
    }
  }
  return false
}

function dispatchTask(data, valid, id, target) {
  const dictionary = data.filter(t => valid_check(valid, t))
  store.dispatch(showWordFactory(id, target, dictionary))
  if (dictionary.length === 1 && ['Clause','AdjectiveClause'].includes(dictionary[0].pos)) {
    store.dispatch(createNewWord(dictionary[0], id, target))
  }
}

export const getWordDictionary = function(words, activeWord, id, target) {
  const pos = words.find(t => t.id === activeWord).pos
  const valid = valid_pos[pos][target]   
  if (sessionStorage.dictionary) {
    const data = JSON.parse(sessionStorage.dictionary)
    dispatchTask(data, valid, id, target)
  } else {
    Client.getDics(data => {
      dispatchTask(data, valid, id, target)
    })
  }
}