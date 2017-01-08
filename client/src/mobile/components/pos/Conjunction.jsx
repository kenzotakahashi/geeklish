import React from 'react'
import { store } from '../../../index.js'
import { DeleteButton, Label } from './Tree'
import { showDetail } from '../../../shared/actions'

export const Conjunction = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`m-tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >{element.word}</span>
          </div>
        </li>
      </ul>
    )
  }
})

export const ConjunctionLink = React.createClass({
  render: function() {
    const {_id, parent, role} = this.props
    const element = store.getState().Words.find(o => o._id === _id)
    return (
      <li key={_id} className={`m-list ${element.pos}`}
          onClick={() => store.dispatch(showDetail(element._id,'initial',parent,role))}>
        <span className='word' >{element.word}</span>
      </li>
    )
  }
})

export const ConjunctionDetail = React.createClass({
  render: function() {
    const {element, parent, role} = this.props
    return (
      <div>
        <Label parent={parent} role={role} />
        <DeleteButton id={element._id} role={role} parentId={parent._id} />                
      </div>
    )
  }
})

