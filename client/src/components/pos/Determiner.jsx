import React from 'react'
import store from '../../store.js'
import { Children, DeleteButton, Label } from './Tree'
import { showOptions, changeAttribute } from '../../actions'
import { getWordDictionary } from '../../wordDictionary'

const e = React.createElement

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
            <Label parent={this.props.parent} role={this.props.role} />
            {element.type === 'quantifier' &&
              e('button', {
              className: `tree-button ${element.isOf  && 'on'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(this.props._id, 'isOf', !element.isOf))
            }, 'of')}
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
      getWordDictionary(state.Words, element, ['noun', null])
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
            <Label parent={this.props.parent} role={this.props.role} />
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})