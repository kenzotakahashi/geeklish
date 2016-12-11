import React from 'react'
import store from '../../store.js'
import { Children, DeleteButton } from './Tree'
import { showOptions } from '../../actions'
import { getWordDictionary } from '../../wordDictionary'

export const Determiner = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>{element.word}</span>
            <span className="label label-default">{this.props.role}</span>
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parent.id} />
          </div>
        </li>
      </ul>
    )
  },
})

export const Possessive = React.createClass({
  componentDidMount: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    if (!element.noun) {
      getWordDictionary(state.Words, state.activeWord, element.id, 'noun')
    }
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['noun']

    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>Possessive</span>
            <span className="label label-default">{this.props.role}</span>
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parent.id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})