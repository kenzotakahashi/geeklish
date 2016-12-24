import React from 'react'
import store from '../../store.js'
import { Children, WH, DeleteButton, Label } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

export const Adjective = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['adverbs', 'prepositions']

    const attributes = ['base','comparative','superlative'].map(o => (
      e('button', {
        className: `button is-small is-active ${element.form === o && 'is-primary'}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(this.props._id, 'form', o))
      }, o)
    ))

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props._id))}>{element.word.base}</span>
            <Label parent={this.props.parent} role={this.props.role} />
            {attributes}
            <WH id={this.props._id} isWh={element.isWh} />
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const AdjectiveClause = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['clause']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props._id))}>Adjective Clause</span>            
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