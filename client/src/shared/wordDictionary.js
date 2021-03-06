import { store } from '../index.js'
import Client from '../Client'
import { showWordFactory, createNewWord, routeWordFactory } from '../shared/actions'

function validDeterminer(dType, w, word) {
  if (w.type !== dType) return false
  if (word.type === 'uncountable') {
    return w.mass
  }
  return ['both',word.number].includes(w.number)
}

const adverb = p => ({pos: 'Adverb', attr: (w) => w.usage.includes(p)})

const nouns = ['Noun', 'Pronoun', 'NounClause', 'Gerund']
const verbs = ['Verb', 'Be']
const adjectives = ['Adjective', 'AdjectiveClause', 'Participle']
const coordinating = [{pos: 'Conjunction', attr: (w) => w.type === 'coordinating' }]
const complements = [...nouns, 'Adjective', adverb('comp'), 'Preposition', 'Infinitive']
const determiners = [{pos: 'Determiner', attr: (w, word) => validDeterminer('determiner', w, word)},
                      'Possessive']
const quantifier = [{pos: 'Determiner', attr: (w, word) => validDeterminer('quantifier', w, word)}]
const appositive = {pos: 'Appositive', attr: (w, word) => 
                    word.adjectives.filter(o => o.pos === 'Appositive').length === 0}

export const validPos = {
  Sentence: {
    clause: ['Clause'],
  },
  Clause: {
    adverbs: [adverb('clause'), 'AdverbClause', 'Infinitive'],
    subject: [...nouns, 'Infinitive'],
    verb: verbs,
    adjective: ['AdjectiveClause'],
  },
  ClauseContainer: {
    clauses: ['Clause'],
    conjunction: coordinating
  },
  Verb: {
    noun: nouns,
    gerund: ['Gerund'],
    clause: ['NounClause'],
    infinitive: ['Infinitive'],
    adverb: [adverb('comp')],
    adjective: ['Adjective'],
    preposition: ['Preposition'],

    particle: [{pos: 'Preposition', attr: (w, word) => word.valid_particles.includes(w.base)},
               {pos: 'Adverb', attr: (w, word) => word.valid_particles.includes(w.base)}],
    adverbs: [adverb('verb')],
    prepositions: ['Preposition']
  },
  Be: {
    noun: nouns,
    gerund: ['Gerund'],
    clause: ['NounClause'],
    infinitive: ['Infinitive'],
    adverb: [adverb('comp')],
    adjective: ['Adjective'],
    preposition: ['Preposition'],

    adverbs: [adverb('verb')],
    prepositions: ['Preposition']
  },
  VerbContainer: {
    complements: complements,
    adverbs: [adverb('verb')],
    prepositions: ['Preposition'],
    verbs: verbs,
    conjunction: coordinating
  },
  Noun: {
    quantifier: quantifier,
    determiner: determiners,
    adjectives: [...adjectives, 'Infinitive', appositive],
    nouns: ['Noun', 'NounClause'],
    prepositions: ['Preposition'],
  },
  NounContainer: {
    nouns: nouns,
    adjectives: [...adjectives, appositive],
    prepositions: ['Preposition'],
    quantifier: quantifier,
    determiner: determiners,
    conjunction: coordinating
  },
  NounClause: {
    clause: ['Clause'],
    nouns: ['Noun', 'NounClause'],
    quantifier: quantifier,
    adjectives: adjectives,
    prepositions: ['Preposition'],
  },
  Pronoun: {
    adjectives: [...adjectives, 'Infinitive'], 
    prepositions: ['Preposition'],
  },
  Determiner: {
    adverb: [adverb('det')],
  },
  Adjective: {
    complement: ['Preposition','NounClause','Infinitive','Gerund'],
    adverbs: [adverb('adj')],
    prepositions: ['Preposition']
  },
  AdjectiveClause: {
    clause: ['Clause']
  },
  Adverb: {
    adverb: [adverb('adv')]
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
  Appositive: {
    noun: ['Noun']
  }
}

function valid_check(valid_list, dicWord, word) {
  for (let valid of valid_list) {
    if (typeof(valid) === 'string') {
      if (valid === dicWord.pos) {
        return true
      }
    } else {
      if (valid.pos === dicWord.pos && valid.attr(dicWord, word)) {
        return true
      }
    }
  }
  return false
}

function dispatchTask(data, valid, word, target, mobile) {
  const dictionary = data.filter(t => valid_check(valid, t, word))
  if (mobile) {
    store.dispatch(routeWordFactory(target, dictionary))
  }
  else {
    store.dispatch(showWordFactory(word._id, target, dictionary))
    if (dictionary.length === 1 && ['Clause','AdjectiveClause'].includes(dictionary[0].pos)) {
      store.dispatch(createNewWord(dictionary[0], word._id, target))
    }
  }
}

export const getWordDictionary = function(word, target, mobile=false) {
  const valid = validPos[word.pos][target[1] === null ?
                                    target[0] : word.complements[target[1]].category]
  if (sessionStorage.dictionary) {
    const data = JSON.parse(sessionStorage.dictionary)
    dispatchTask(data, valid, word, target, mobile)
  } else {
    Client.getDics(data => {
      dispatchTask(data, valid, word, target, mobile)
    })
  }
}
