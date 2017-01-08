import React from 'react'
import { store } from '../../../index.js'
import { CompChildren, Children, DeleteButton, ConjunctionButton, UndoConjunctionButton,
         ModalSelect, Label } from './Tree'
import { showOptions, changeAttribute } from '../../../shared/actions'

const e = React.createElement

export const Verb = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props._id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = element.valid_particles.length > 0 ?
                  ['particle','adverbs','prepositions'] : ['adverbs','prepositions']

    const word = parent.pos === 'Gerund' ? element.word[element.form] : element.word.base

    const object = element.complements[0]
    const disablePassive = (object && object.category === 'noun' && !!object._id) ||
                           (object && object.category !== 'noun')

    const list = parent.pos === 'Infinitive' ? ['negative','continuous','passive'] :
                 ['past','negative','continuous','perfect','passive']

    const attributes = !['Gerund','Participle'].includes(parent.pos) && list.map(o => (
      e('button', {
        className: `tree-button ${element[o] && 'on'}`,
        disabled: o === 'passive' && disablePassive && "disabled",
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element._id, o, !element[o]))
      }, o)
    ))

    const modalSelect = !['Gerund','Participle','Infinitive'].includes(parent.pos) &&
                        <ModalSelect value={element.modal} onChange={this.handleChange} />

    const conjunctionButton = !['Gerund','Participle'].includes(parent.pos) &&
              parent.pos !== 'VerbContainer' &&
              <ConjunctionButton element={element} role={role} parentId={parent._id} />

    return (
      <ul className='desktop-ul'>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{word}</span>
            <Label parent={parent} role={role} />
            {modalSelect}
            {attributes}
            {conjunctionButton}
            <DeleteButton id={element._id} role={role} parentId={parent._id} />
          </div>
          <CompChildren element={element} words={state.Words}
                        target={state.target} activeWord={state.activeWord} openModal={this.openModal}/>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  }
})

export const Be = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props._id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['adverbs','prepositions']

    const list = parent.pos === 'Infinitive' ?
                 ['negative','continuous'] : ['past','negative','continuous','perfect']

    const attributes = !['Gerund','Participle'].includes(parent.pos) && list.map(o => (
      e('button', {
        className: `tree-button ${element[o] && 'on'}`,        
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element._id, o, !element[o]))
      }, o)
    ))

    const conjunctionButton = !['Gerund','Participle'].includes(parent.pos) &&
              parent.pos !== 'VerbContainer' &&
              <ConjunctionButton element={element} role={role} parentId={parent._id} />

    return (
      <ul className='desktop-ul'>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>
              {element.word.base}
            </span>
            <Label parent={parent} role={role} />
            {attributes}
            {conjunctionButton}
            <DeleteButton id={element._id} role={role} parentId={parent._id} />
          </div>
          <CompChildren element={element} words={state.Words}
                        target={state.target} activeWord={state.activeWord} openModal={this.openModal}/>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  }
})

export const VerbContainer = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props._id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['conjunction', 'verbs', 'complements','adverbs','prepositions']

    return (
      <ul className='desktop-ul'>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>VerbContainer</span>
            <Label parent={parent} role={role} />
            <ModalSelect value={element.modal} onChange={this.handleChange} />
            {element.verbs.length > 0 &&
            <UndoConjunctionButton element={element} thisRole={role}
                                   childRole='verbs' parentId={parent._id} />}
            <DeleteButton id={element._id} role={role} parentId={parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})
