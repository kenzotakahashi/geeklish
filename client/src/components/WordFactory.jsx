import React from 'react'
import store from '../store.js'
// import Dictionary from '../dictionary/dictionary.js'

const e = React.createElement

const getArgument = function(activeWordPos, target, wordPos) {
  if (wordPos === 'Pronoun') {
    if (['Verb','Be','VerbContainer','Preposition'].includes(activeWordPos)) {
      return {form: 'accusative'}
    } else if (activeWordPos === 'Noun') {
      return {form: 'possessive'}
    }
  } else if (['Verb','Be'].includes(wordPos) &&
             ['subject','complement','complements','nouns'].includes(target)) {
    return {form: 'gerund'}
  }
}

const WordFactory = React.createClass({
  createNewWord: function (wordBase, activeWord, target, arg) {
    store.dispatch({
      type: 'CREATE_WORD',
      wordBase,
      activeWord,
      target,
      arg
    })
  },
  render: function() {
    const state = store.getState()
    const pos = state.Words.find(o => o.id === state.activeWord).pos
    return (
      <div>
        <ul className='list-group'>
          {
            state.dictionary.map(o => (
              e('li', {
                className: `list-group-item col-md-6 ${o.pos}`,
                key: o._id,
                onClick: () => this.createNewWord(
                  o, state.activeWord, state.target,
                  getArgument(pos, state.target, o.pos)
                )
              }, o.base)
            ))
          }
        </ul>
      </div>
    )
  }
})

export default WordFactory