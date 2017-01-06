import React from 'react'
import { store } from '../../../index.js'
import { Children } from './Tree'
import { showOptions, showDetail } from '../../../shared/actions'
import { Link } from '../../kenzo-router'

// const e = React.createElement

export const Clause = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['subject','verb','adverbs','adjective']
    const {_id, parent, role} = this.props

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`tree-box basic ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,parent,role,'canvas','forward'))}>
            <span className='word'>Clause</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const ClauseDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['subject','verb','adverbs','adjective']

    return (
      <div>
        Clause
      </div>
    )
  },
})

export const ClauseContainer = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['conjunction', 'clauses']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>ClauseContainer</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})
