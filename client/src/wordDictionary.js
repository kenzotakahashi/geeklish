import store from './store.js'
import Client from './Client'
import { showWordFactory } from './actions'

const nouns = ['Noun', 'Pronoun', 'NounClause', 'Verb', 'Be']
const verbs = ['Verb', 'Be']
const adjectives = ['Adjective', 'AdjectiveClause']
const adverbs = ['Adverb', 'AdverbClause']
const clauses = ['Clause']
const coordinating = [{pos: 'Conjunction', attr: ['type', 'coordinating']}]

const valid_pos = {
  Sentence: {
    clause: clauses
  },
  Clause: {
    subject: nouns,
    verb: verbs,
  },
  ClauseContainer: {
    clauses: ['Clause'],
    conjunction: coordinating
  },
  Verb: {
    complements: [...nouns, ...adjectives, 'Adverb', 'Preposition', 'Infinitive'],
    adverbs: [...adverbs, 'Infinitive'],
    prepositions: ['Preposition']
  },
  Be: {
    complements: [...nouns, ...adjectives, 'Adverb', 'Preposition', 'Infinitive'],
    adverbs: [...adverbs, 'Infinitive'],
    prepositions: ['Preposition']
  },
  VerbContainer: {
    complements: [...nouns, ...adjectives, 'Adverb', 'Preposition', 'Infinitive'],
    adverbs: [...adverbs, 'Infinitive'],
    prepositions: ['Preposition'],
    verbs: ['Verb', 'Be'],
    conjunction: coordinating
  },
  Noun: {
    determiners: ['Determiner'],
    adjectives: [...adjectives, 'Infinitive'],
    nouns: ['Noun', 'NounClause', 'Verb', 'Be'],
    prepositions: ['Preposition'],
  },
  NounContainer: {
    nouns: nouns,
    adjectives: adjectives,
    prepositions: ['Preposition'],
    determiners: ['Determiner'],
    conjunction: coordinating
  },
  NounClause: {
    clause: clauses,
    nouns: ['Noun', 'NounClause', 'Verb', 'Be'],
    determiners: ['Determiner'],
    adjectives: adjectives,
    prepositions: ['Preposition'],
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
    conjunction: [{pos: 'Conjunction', attr: ['type', 'subordinating']}],
    clause: clauses
  },
  Preposition: {
    complement: nouns
  },
  Infinitive: {
    verb: verbs
  }
}

function valid_check(valid_list, word) {
  for (let valid of valid_list) {
    if (typeof(valid) === 'string') {
      if (valid === word.pos) {
        return true
      }
    } else {
      if (valid.pos === word.pos && word[valid.attr[0]] === valid.attr[1]) {
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