import React from 'react'
import store from '../../store.js'
import { Children, DeleteButton } from './Tree'
import { showOptions } from '../../actions'
import { getWordDictionary } from '../../wordDictionary'

export const Determiner = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['adverb']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word}</span>
            <span className="label label-default">{this.props.role}</span>
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const Possessive = React.createClass({
  componentDidMount: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    if (!element.noun) {
      getWordDictionary(state.Words, state.activeWord, element._id, 'noun')
    }
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['noun']

    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Possessive</span>
            <span className="label label-default">{this.props.role}</span>
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})