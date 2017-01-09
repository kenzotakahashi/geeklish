import React from 'react'
import { store } from '../../../index.js'
import { Children, WH, DeleteButton, Label, ChildrenDetail } from './Tree'
import { changeAttribute, showDetail } from '../../../shared/actions'

export const Preposition = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['complement']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`m-tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >{element.word}</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

const needPosition = (parent, role) => (
  role[0] === 'particle'
  ? parent.complements.length > 0
  : ['Verb','Be','VerbContainer'].includes(parent.pos) && role[0] === 'prepositions'
)

export const PrepositionDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['complement']

    const position = needPosition(parent, role) && (
      <li key='number'>
        <span className='m-list back-white'>
          <span>{role[0] === 'particle' ? 'Before Complement' : 'Beginning of Clause'}</span>
          <label className="switch">
            <input type="checkbox" checked={element.before}
              onChange={() => store.dispatch(changeAttribute(element._id,'before',!element.before))} 
            />
            <div className="slider round"></div>
          </label>
        </span>
        <hr className='m-border' />
      </li>
    )

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>        
          <hr className='m-border-edge' />
          {position}
          {role[0] !== 'particle' && <WH id={element._id} isWh={element.isWh} />}
          <hr className='m-border-edge' />
        </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        {role[0] !== 'particle' &&
         <DeleteButton id={element._id} role={role} parentId={parent._id} />}        
      </div>
    )
  }
})
