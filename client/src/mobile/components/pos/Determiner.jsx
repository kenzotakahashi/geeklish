import React from 'react'
import { store } from '../../../index.js'
import { Children, DeleteButton, Label, ChildrenDetail } from './Tree'
import { showOptions, changeAttribute, showDetail } from '../../../shared/actions'
import { getWordDictionary } from '../../../shared/wordDictionary'

export const Determiner = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['adverb']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >{element.word}</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const DeterminerLink = React.createClass({
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
                        this.props._id, 'isOf', !element.isOf))} 
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
  componentDidMount: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    if (!element.noun) {
      getWordDictionary(element, ['noun', null])
    }
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['noun']

    return (
      <ul className='m-ul'>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Possessive</span>
            <Label parent={this.props.parent} role={this.props.role} />
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})