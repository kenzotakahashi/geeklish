import React from 'react'
import store from '../../store.js'
import { Children, WH, DeleteButton } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

export const Adjective = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['adverbs', 'prepositions']

    const attributes = ['base','comparative','superlative'].map(o => (
      e('button', {
        className: `button is-small is-active ${element.form === o? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(this.props.id, 'form', o))
      }, o)
    ))

    return (
      <ul>
        <li className='tree-top'>
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>{element.word.base}</span>
            <span className="label label-default">{this.props.role}</span>
            {attributes}
            <WH id={this.props.id} isWh={element.isWh} />
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={this.props.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const AdjectiveClause = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['clause']

    return (
      <ul>
        <li className='tree-top'>
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>Adjective Clause</span>            
            <span className="label label-default">{this.props.role}</span>
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={this.props.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})