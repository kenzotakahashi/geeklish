import React from 'react'
import { store } from '../../../index.js'
import { Children, ChildrenDetail, WH } from './Tree'
import { showOptions, changeAttribute, showDetail, routeOption } from '../../../shared/actions'

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
  },
})

export const PronounLink = React.createClass({
  render: function() {
    const {_id, parent} = this.props
    const element = store.getState().Words.find(o => o._id === _id)
    return (
      <li key={_id} className={`m-list ${element.pos}`}
          onClick={() => store.dispatch(showDetail(element._id,'switch',parent))}>
        <span className='word' >{element.word[element.form]}</span>
      </li>
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
    const element = this.props.element
    const attrs = ['adjectives','prepositions']

    return (
      <div>
        <ul className='m-list-group'>
          <li key='form'>
            <hr className='m-border-edge' />
            <span className='m-list' onClick={() => store.dispatch(routeOption(pronounOption))}>
              <span>Form</span><span className='m-list-right'>{element.form}</span>
            </span>
            <hr className='m-border' />
            <WH id={element._id} isWh={element.isWh} />
            <hr className='m-border-edge' />
          </li>
        </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
      </div>
    )
  }
})