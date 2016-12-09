import React from 'react'
import store from '../../store.js'
import { Children, DeleteButton, ConjunctionButton, ModalSelect } from './Tree'
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
        className: `button is-small is-active ${element[o] ? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element.id, o, !element[o]))
      }, o)
    ))

    return element.form === 'gerund' ? (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>
              {element.word[element.form]}
            </span>
            <span className="label label-default">{this.props.role}</span>
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    ) : (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>{element.word.base}</span>
            <span className="label label-default">{this.props.role}</span>
            <ModalSelect value={element.modal} onChange={this.handleChange} />
            {attributes}
            {state.Words.find(o => o.id === this.props.parentId).pos !== 'VerbContainer' &&
             <ConjunctionButton element={element} role={this.props.role} parentId={this.props.parentId} />}
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
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
        className: `button is-small is-active ${element[o] ? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element.id, o, !element[o]))
      }, o)
    ))
 
    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>{element.word.base}</span>
            <span className="label label-default">{this.props.role}</span>
            <ModalSelect value={element.modal} onChange={this.handleChange} />
            {attributes}
            {state.Words.find(o => o.id === this.props.parentId).pos !== 'VerbContainer' &&
             <ConjunctionButton element={element} role={this.props.role} parentId={this.props.parentId} />}
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
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

    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>VerbContainer</span>
            <span className="label label-default">{this.props.role}</span>
            <ModalSelect value={element.modal} onChange={this.handleChange} />
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})
