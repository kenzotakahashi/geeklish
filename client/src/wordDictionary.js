import store from './store.js'
import Client from './Client'
import { showWordFactory } from './actions'

const nouns = ['Noun', 'Pronoun', 'NounClause', 'Gerund']
const verbs = ['Verb', 'Be']
const adjectives = ['Adjective', 'AdjectiveClause', 'Participle']
const adverbs = ['Adverb', 'AdverbClause']
const clauses = ['Clause']
const coordinating = [{pos: 'Conjunction', attr: (w) => w.type === 'coordinating' }]
const complements = [...nouns, 'Adjective', 'Adverb', 'Preposition', 'Infinitive']
const determiners = ['Determiner', 'Possessive']

const valid_pos = {
  Sentence: {
    clause: clauses
  },
  Clause: {
    subject: [...nouns, 'Infinitive'],
    verb: verbs,
  },
  ClauseContainer: {
    clauses: ['Clause'],
    conjunction: coordinating
  },
  Verb: {
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
    clause: clauses,
    nouns: ['Noun', 'NounClause'],
    determiners: determiners,
    adjectives: adjectives,
    prepositions: ['Preposition'],
  },
  Pronoun: {
    adjectives: ['Infinitive', 'Participle'], 
  },
  Adjective: {
    adverbs: ['Adverb'],
    prepositions: ['Preposition'] 
  },
  AdjectiveClause: {
    clause: clauses
  },
  Adverb: {
    adverb: ['Adverb']
  },
  AdverbClause: {
    conjunction: [{pos: 'Conjunction', attr: (w) => w.type === 'subordinating' }],
    clause: clauses
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
  	verb: ['Verb']
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

export const getWordDictionary = function(words, activeWord, id, target) {
  const pos = words.find(t => t.id === activeWord).pos
  const valid = valid_pos[pos][target]   
  if (sessionStorage.dictionary) {
    const data = JSON.parse(sessionStorage.dictionary)
    const dictionary = data.filter(t => valid_check(valid, t))
    store.dispatch(showWordFactory(id, target, dictionary))
  } else {
    Client.getDics(data => {
      const dictionary = data.filter(t => valid_check(valid, t))
      store.dispatch(showWordFactory(id, target, dictionary))
    })
  }
}