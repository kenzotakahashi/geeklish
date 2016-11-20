import React from 'react'
import store from '../../store.js'
import { Children } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

export const Verb = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props.id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['complements','adverbs','prepositions']

    const attributes = ['past','negative','continuous','perfect','passive'].map(o => (
      e('button', {
        className: `button is-active ${element[o] ? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element.id, o, !element[o]))
      }, o)
    ))

    const modals = ['modal','can','could','should','may','might','must','will','would'].map(o => (
      <option key={o} value={o === 'modal' ? '' : o}>{o}</option>
    ))

    return element.form === 'gerund' ? (
      <ul>
        <li className="tree-top">
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>
              {element.word[element.form]}
            </span>
            <span className="label label-default">{this.props.role}</span>
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    ) : (
      <ul>
        <li className="tree-top">
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>{element.word.base}</span>
            <span className="label label-default">{this.props.role}</span>
            <span className="select" value={element.modal} onChange={this.handleChange}><select>{modals}</select></span>
            {attributes}
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const Be = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props.id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['complements','adverbs','prepositions']

    const attributes = ['past','negative','continuous','perfect'].map(o => (
      e('button', {
        className: `button is-active ${element.isWh ? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element.id, o, !element[o]))
      }, o)
    ))

    const modals = ['modal','can','could','should','may','might','must','will','would'].map(o => (
      <option key={o} value={o === 'modal' ?  '' : o}>{o}</option>
    ))
 
    return (
      <ul>
        <li className="tree-top">
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>{element.word.base}</span>
            <span className="label label-default">{this.props.role}</span>
            <span className="select" value={element.modal} onChange={this.handleChange}><select>{modals}</select></span>
            {attributes}
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const VerbContainer = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props.id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['conjunction', 'verbs', 'complements','adverbs','prepositions']
  
    const modals = ['modal','can','could','should','may','might','must','will','would'].map(o => (
      <option key={o} value={o === 'modal' ?  '' : o}>{o}</option>
    ))

    return (
      <ul>
        <li className="tree-top">
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>VerbContainer</span>
            <span className="label label-default">{this.props.role}</span>
            <span className="select" value={element.modal} onChange={this.handleChange}><select>{modals}</select></span>
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})
