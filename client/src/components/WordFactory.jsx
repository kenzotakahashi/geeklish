import React from 'react'
import store from '../store.js'
// import { getArgument } from '../wordDictionary'

const e = React.createElement

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

    // ref={input => input && input.focus()}
    return (
      <div>
        <input
          placeholder='search'
          type='text'
          value={state.search}
          onChange={this.onInputChange}
          autoFocus
        />
        <ul className='list-group fixed-box'>
          {
            this.state.dictionary.map(o => (
              e('li', {
                className: `list-group-item col-md-6 ${o.pos}`,
                key: o._id,
                onClick: () => this.createNewWord(o, state.activeWord, state.target)
              }, o.base)
            ))
          }
        </ul>
      </div>
    )
  }
})

export default WordFactory