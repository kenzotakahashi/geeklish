import React from 'react'
import { store } from '../../../index.js'
import { Children, ChildrenDetail, WH, DeleteButton, Label,
         ConjunctionButton } from './Tree'
import { showDetail, routeOption } from '../../../shared/actions'

export const Pronoun = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['adjectives','prepositions']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >{element.word[element.form]}</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

const pronounOption = {
  attr: 'form',
  label: 'Form',
  choice: ['nominative','accusative','possessive pronoun','reflexive']
}

export const PronounDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['adjectives','prepositions']

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>
          <li key='form'>
            <hr className='m-border-edge' />
            <span className='m-list pointer' onClick={() => store.dispatch(routeOption(pronounOption))}>
              <span>Form</span>
              <span className='m-list-right'>
                <span>{element.form}</span>
                <span className='m-list-arrow'></span>
              </span>
            </span>
            <hr className='m-border' />
          </li>
          <WH id={element._id} isWh={element.isWh} />
          <hr className='m-border-edge' />
        </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        {parent.pos !== 'NounContainer' &&
         <ConjunctionButton element={element} role={role} parentId={parent._id} />}
        <DeleteButton id={element._id} role={role} parentId={parent._id} />
      </div>
    )
  }
})