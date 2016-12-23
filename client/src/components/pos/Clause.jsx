import React from 'react'
import store from '../../store.js'
import { Children, DeleteButton, ConjunctionButton, UndoConjunctionButton } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

export const Clause = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['subject','verb','adverbs','adjective']

    const attr = ['statement','question','command'].map(o => (
      e('button', {
        className: `button is-small is-active ${element.cType === o && 'is-primary'}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element._id, 'cType', o))
      }, o)
    ))

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Clause</span>
            <span className="label label-default">{this.props.role}</span>
            {attr}
            {this.props.parent.pos !== 'ClauseContainer' &&
             <ConjunctionButton element={element} role={this.props.role} parentId={this.props.parent._id} />}
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const ClauseContainer = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['conjunction', 'clauses']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>ClauseContainer</span>
            <span className="label label-default">{this.props.role}</span>
            {element.clauses.length > 0 &&
            <UndoConjunctionButton element={element} thisRole={this.props.role}
                                   childRole='clauses' parentId={this.props.parent._id} />}
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})
