import React from 'react'
import { store } from '../../../index.js'
import { CompChildren, Children } from './Tree'
import { showOptions, changeAttribute, showDetail } from '../../../shared/actions'

// const e = React.createElement

export const Verb = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = element.valid_particles.length > 0 ?
                  ['particle','adverbs','prepositions'] : ['adverbs','prepositions']

    return (
      <ul className='m-ul'>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showDetail(
              element._id,'forward',parent,role
            ))}>
              {parent.pos === 'Gerund' ? element.word[element.form] : element.word.base}
            </span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words} />
        </li>
      </ul>
    )
  }
})

export const VerbLink = React.createClass({
  render: function() {
    const {_id, parent, role} = this.props
    const element = store.getState().Words.find(o => o._id === _id)
    return (
      <li key={_id} className={`m-list ${element.pos}`}
          onClick={() => store.dispatch(showDetail(element._id,'initial',parent,role))}>
        <span className='word' >
          {parent.pos === 'Gerund' ? element.word[element.form] : element.word.base}
        </span>
      </li>
    )
  }
})

export const VerbDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)

    if (this.props.parent.pos === 'Gerund') {
      return (
        <ul className='m-ul'>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>
                {element.word[element.form]}
              </span>
            </div>
          </li>
        </ul>
      )
    } else if (this.props.parent.pos === 'Participle') {
      return (
        <ul className='m-ul'>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
            </div>
          </li>
        </ul>
      ) 
    } else if (this.props.parent.pos === 'Infinitive') {
      return (
        <ul className='m-ul'>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
            </div>
          </li>
        </ul>
      ) 
    } else {
      return (
        <ul className='m-ul'>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
            </div>
          </li>
        </ul>
      )
    }
  },
})















export const Be = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props._id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)

    if (this.props.parent.pos === 'Gerund') {
      return (
        <ul className='m-ul'>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
            </div>
          </li>
        </ul>
      )
    } else if (this.props.parent.pos === 'Participle') {
      return (
        <ul className='m-ul'>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
            </div>
          </li>
        </ul>
      )
    } else if (this.props.parent.pos === 'Infinitive') {
      return (
        <ul className='m-ul'>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
            </div>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className='m-ul'>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
            </div>
          </li>
        </ul>
      )
    }
  },
})

export const VerbContainer = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props._id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)

    return (
      <ul className='m-ul'>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>VerbContainer</span>
          </div>
        </li>
      </ul>
    )
  },
})
