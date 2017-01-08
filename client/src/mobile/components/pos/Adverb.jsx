import React from 'react'
import { store } from '../../../index.js'
import { Children, WH, DeleteButton, Label, ChildrenDetail } from './Tree'
import { changeAttribute, showDetail, routeOption } from '../../../shared/actions'

export const Adverb = React.createClass({
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
            <span className='word' >{element.word.base}</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

const formOption = {
  attr: 'form',
  label: 'Form',
  choice: ['base','comparative','superlative']
}

const positionOption = {
  attr: 'position',
  label: 'Position',
  choice: ['before','middle','after']
}


export const AdverbDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['adverb']
    const modifyVerb = ['Verb','Be','VerbContainer'].includes(parent.pos) &&
                        role[0] === 'adverbs'

    const form = modifyVerb && (
      <li key='form'>
        <span className='m-list pointer' onClick={() => store.dispatch(routeOption(formOption))}>
          <span>Form</span>
          <span className='m-list-right'>
            <span>{element.form}</span>
            <span className='m-list-arrow'></span>
          </span>
        </span>
        <hr className='m-border' />
      </li>
    )

    const position = modifyVerb && !!element.word.comparative && (
      <li key='form'>
        <span className='m-list pointer' onClick={() => store.dispatch(routeOption(positionOption))}>
          <span>Position</span>
          <span className='m-list-right'>
            <span>{element.position}</span>
            <span className='m-list-arrow'></span>
          </span>
        </span>
        <hr className='m-border' />
      </li>
    )

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>
          <hr className='m-border-edge' />
          {form}
          {position}
          <WH id={element._id} isWh={element.isWh} />
          <hr className='m-border-edge' />
        </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        <DeleteButton id={element._id} role={role} parentId={parent._id} />
      </div>
    )
  }
})

export const AdverbClause = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['conjunction', 'clause']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`m-tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward',parent,role))}>
            <span className='word' >AdverbClause</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}/>
        </li>
      </ul>
    )
  }
})

export const AdverbClauseDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['conjunction', 'clause']

    return (
      <div>
        <Label parent={parent} role={role} />
        <ul className='m-list-group'>        
          <hr className='m-border-edge' />
          <li key='number'>
            <span className='m-list back-white'>
              <span>Before Subject</span>
              <label className="switch">
                <input type="checkbox" checked={element.before}
                    onChange={() => store.dispatch(changeAttribute(
                      element._id,'before',!element.before))} 
                />
                <div className="slider round"></div>
              </label>
            </span>
          </li>
          <hr className='m-border-edge' />
        </ul>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
        <DeleteButton id={element._id} role={role} parentId={parent._id} />        
      </div>
    )
  }
})
