import React from 'react'
import store from '../store.js'
import Dictionary from '../dictionary/dictionary.js'

const e = React.createElement

const nouns = ['Noun', 'Pronoun'] //'Determiner'
const valid_pos = {
  Clause: {
    subject: nouns,
    verb: ['Verb', 'Be']
  },
  Verb: {
    complements: [...nouns, 'To'],
    predicate: [...nouns, 'Adjective', 'Adverb', 'Preposition'],
    adverbs: ['Adverb'],
    prepositions: ['Preposition']
  },
  Be: {
    complements: [...nouns, 'To'],
    predicate: [...nouns, 'Adjective', 'Adverb', 'Preposition'],
    adverbs: ['Adverb'],
    prepositions: ['Preposition']
  },
  Noun: {
    adjectives: ['Adjective'],
    prepositions: ['Preposition'],
    determiners: ['Determiner'],
    nouns: nouns
  },
  Adjective: {
    adverbs: ['Adverb'],
    prepositions: ['Preposition'] 
  },
  Adverb: {
    adverbs: ['Adverb']
  },
  Preposition: {
    complement: nouns
  },
  To: {
    verb: ['Verb', 'Be']
  }
}

const WordFactory = React.createClass({
  createNewWord: function (id, activeWord, target) {
    store.dispatch({
      type: 'CREATE_WORD',
      id: id,
      activeWord: activeWord,
      target: target,
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
        onClick: () => this.createNewWord(o.id, state.activeWord, state.target)
      }, o.base)
    ))
    return (
      <ul className='list-group row'>
        {words}
      </ul>
    )
  }
})

export default WordFactory