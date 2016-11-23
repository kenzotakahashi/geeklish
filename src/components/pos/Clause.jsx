import React from 'react'
import store from '../../store.js'
import { Children, DeleteButton } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

export const Clause = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['subject', 'verb', 'conjunction']

    const attr = ['statement','question','command'].map(o => (
      e('button', {
        className: `button is-small is-active ${element.cType === o ? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element.id, 'cType', o))
      }, o)
    ))

    return (
      <ul>
        <li className='tree-top'>
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>Clause</span>
            <span className="label label-default">{this.props.role}</span>
            {attr}
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const ClauseContainer = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['clauses', 'conjunction']

    return (
      <ul>
        <li className='tree-top'>
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>ClauseContainer</span>
            <span className="label label-default">{this.props.role}</span>
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})
