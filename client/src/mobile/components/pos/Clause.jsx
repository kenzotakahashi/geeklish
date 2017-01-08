import React from 'react'
import { store } from '../../../index.js'
import { Children, ChildrenDetail, DeleteButton, Label } from './Tree'
import { showOptions, showDetail, routeOption } from '../../../shared/actions'

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
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word'>Clause</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words} />
        </li>
      </ul>
    )
  },
})

const clauseOption = {
  attr: 'cType',
  label: 'Clause Type',
  choice: ['statement','question','command']
}

export const ClauseDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['subject','verb','adverbs','adjective']

    return (
      <div>
        <Label parent={parent} role={role} />        
        <ul className='m-list-group'>
          <li key='cType'>
            <hr className='m-border-edge' />
            <span className='m-list' onClick={() => store.dispatch(routeOption(clauseOption))}>
              <span>Clause Type</span><span className='m-list-right'>{element.cType}</span>
            </span>
            <hr className='m-border-edge' />
          </li>
        </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        <DeleteButton id={element._id} role={role} parentId={parent._id} />        
      </div>
    )
  },
})


// ======================

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
