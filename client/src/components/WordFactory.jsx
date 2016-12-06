import React from 'react'
import store from '../store.js'

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
  getInitialState: function () {
    return {
      field: '',
      dictionary: this.props.dictionary
    }
  },
  componentWillReceiveProps(update) {
    this.setState({dictionary: update.dictionary})
  },
  onInputChange: function(e) {
    this.setState({
      field: e.target.value,
      dictionary: this.props.dictionary.filter(o => o.base.toLowerCase().includes(e.target.value))
    })
  },
  render: function() {
    const state = store.getState()
    const pos = state.Words.find(o => o.id === state.activeWord).pos

    return (
      <div>
        <input
          placeholder='search'
          type='text'
          value={state.search}
          onChange={this.onInputChange}
          ref={input => input && input.focus()}
        />
        <ul className='list-group fixed-box'>
          {
            this.state.dictionary.map(o => (
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