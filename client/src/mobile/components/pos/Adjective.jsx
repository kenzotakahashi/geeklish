import React from 'react'
import { store } from '../../../index.js'
import { Children, WH, DeleteButton, Label, ChildrenDetail } from './Tree'
import { showDetail, routeOption } from '../../../shared/actions'

export const Adjective = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['adverbs', 'prepositions']
    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >{element.word.base}</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

const adjectiveOption = {
  attr: 'form',
  label: 'Form',
  choice: ['base','comparative','superlative']
}

export const AdjectiveDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['adverbs', 'prepositions']    

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>
          <li key='form'>
            <hr className='m-border-edge' />
            <span className='m-list pointer' onClick={() => store.dispatch(routeOption(adjectiveOption))}>
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
        <DeleteButton id={element._id} role={role} parentId={parent._id} />
      </div>
    )
  }
})

export const AdjectiveClause = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['clause']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >AdjectiveClause</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const AdjectiveClauseDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['clause']

    return (
      <div>
        <Label parent={parent} role={role} />
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        <DeleteButton id={element._id} role={role} parentId={parent._id} />
      </div>
    )
  }
})
