import React from 'react'
import { store } from '../../../index.js'
// import { CompChildren, Children } from './Tree'
import { showOptions, changeAttribute } from '../../../shared/actions'

// const e = React.createElement

export const Verb = React.createClass({
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
