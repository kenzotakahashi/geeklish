import React from 'react'
import { store } from '../../../index.js'
import { Children, DeleteButton, Label, ChildrenDetail } from './Tree'
import { changeAttribute, showDetail } from '../../../shared/actions'
// import { getWordDictionary } from '../../../shared/wordDictionary'

export const Determiner = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['adverb']

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

export const DeterminerDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['adverb']

    return (
      <div>
        <Label parent={parent} role={role} />
        {element.type === 'quantifier' && (
          <ul className='m-list-group'>
            <hr className='m-border-edge' />
            <li key='of'>
              <span className='m-list'>
                <span>Of</span>
                <label className="switch">
                  <input type="checkbox" checked={element.isOf}
                      onChange={() => store.dispatch(changeAttribute(
                      element._id, 'isOf', !element.isOf))} 
                  />
                  <div className="slider round"></div>
                </label>
              </span>
            </li>
            <hr className='m-border-edge' />
          </ul>
        )}
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        <DeleteButton id={element._id} role={role} parentId={parent._id} />                
      </div>
    )
  }
})

export const Possessive = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['noun']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className='m-tree-box basic'
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >Possessive</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const PossessiveDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['noun']
    return (
      <div>
        <Label parent={parent} role={role} />
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        <DeleteButton id={element._id} role={role} parentId={parent._id} />                
      </div>
    )
  }
})
