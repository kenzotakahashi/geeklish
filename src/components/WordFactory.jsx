import React from 'react'
import store from '../store.js'
import Dictionary from '../dictionary/dictionary.js'

const e = React.createElement

const nouns = ['Noun', 'Pronoun', 'NounContainer', 'NounClause', 'Verb', 'Be'] //'Determiner'
const verbs = ['Verb', 'Be', 'VerbContainer']
const adjectives = ['Adjective', 'AdjectiveClause']
const clauses = ['Clause', 'ClauseContainer']

const valid_pos = {
  Sentence: {
    clause: clauses
  },
  Clause: {
    subject: nouns,
    verb: verbs,
    conjunction: ['Conjunction']
  },
  ClauseContainer: {
    clauses: ['Clause'],
    conjunction: ['Conjunction']
  },
  Verb: {
    complements: [...nouns, 'To'],
    predicate: [...nouns, ...adjectives, 'Adverb', 'Preposition'],
    adverbs: ['Adverb'],
    prepositions: ['Preposition']
  },
  Be: {
    complements: [...nouns, 'To'],
    predicate: [...nouns, 'Adjective', 'Adverb', 'Preposition'],
    adverbs: ['Adverb'],
    prepositions: ['Preposition']
  },
  VerbContainer: {
    complements: [...nouns, 'To'],
    predicate: [...nouns, ...adjectives, 'Adverb', 'Preposition'],
    adverbs: ['Adverb'],
    prepositions: ['Preposition'],
    verbs: ['Verb', 'Be'],
    conjunction: ['Conjunction']
  },
  Noun: {
    adjectives: adjectives,
    prepositions: ['Preposition'],
    determiners: ['Determiner'],
    nouns: nouns
  },
  NounContainer: {
    adjectives: adjectives,
    prepositions: ['Preposition'],
    determiners: ['Determiner'],
    nouns: nouns,
    conjunction: ['Conjunction']
  },
  NounClause: {
    clause: clauses,
    nouns: nouns,
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
    adverbs: ['Adverb']
  },
  Preposition: {
    complement: nouns
  },
  To: {
    verb: verbs
  }
}

const getArgument = function(activeWordPos, target, wordPos) {
  if (wordPos === 'Pronoun' && ['Verb','Be','VerbContainer'].includes(activeWordPos)) {
    return {mode: 'a'}
  } else if (['Verb','Be'].includes(wordPos) &&
             ['subject','complement','complements','nouns','predicate'].includes(target)) {
    return {mode: 'gerund'}
  }
}

const WordFactory = React.createClass({
  createNewWord: function (id, activeWord, target, arg) {
    store.dispatch({
      type: 'CREATE_WORD',
      id,
      activeWord,
      target,
      arg
    })
  },
  render: function() {
    const state = store.getState()
    const pos = state.Words.find(o => o.id === state.activeWord).pos
    const valid = valid_pos[pos][state.target]

    const words = Dictionary.filter(t => (
        valid.includes(t.pos)
      )).map(o => (
      e('li', {
        className: `list-group-item col-md-3 ${o.pos}`,
        key: o.id,
        onClick: () => this.createNewWord(
          o.id, state.activeWord, state.target,
          getArgument(pos, state.target, o.pos)
        )
      }, o.base)
    ))

    // const words = Dictionary.filter(t => (
    //     valid.includes(t.pos)
    //   )).map(o => (
    //   e('li', {
    //     className: `list-group-item col-md-3 ${o.pos}`,
    //     key: o.id,
    //     onClick: () => this.createNewWord(o.id, state.activeWord, state.target)
    //   }, o.base)
    // ))

    return (
      <ul className='list-group row'>
        {words}
      </ul>
    )
  }
})

export default WordFactory