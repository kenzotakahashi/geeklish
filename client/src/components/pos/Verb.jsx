import React from 'react'
import store from '../../store.js'
import { CompChildren, Children, DeleteButton, ConjunctionButton, UndoConjunctionButton,
         ModalSelect, Label } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

export const Verb = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props._id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    // const attrs = ['particle','complements','adverbs','prepositions']
    const attrs = ['particle','adverbs','prepositions']

    const list = this.props.parent.pos === 'Infinitive' ? ['negative','continuous','passive'] :
                 ['past','negative','continuous','perfect','passive']
    const attributes = list.map(o => (
      e('button', {
        className: `button is-small is-active ${element[o] && 'is-primary'}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element._id, o, !element[o]))
      }, o)
    ))

    const compChildren = <CompChildren element={element} attrs={element.complements}
                          words={state.Words} target={state.target} activeWord={state.activeWord} />

    const children = <Children element={element} attrs={attrs} words={state.Words}
                      target={state.target} activeWord={state.activeWord} />

    if (this.props.parent.pos === 'Gerund') {
      return (
        <ul>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>
                {element.word[element.form]}
              </span>
              <Label parent={this.props.parent} role={this.props.role} />
              <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
            </div>
            {children}
          </li>
        </ul>
      )
    } else if (this.props.parent.pos === 'Participle') {
      return (
        <ul>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
              <Label parent={this.props.parent} role={this.props.role} />
              <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
            </div>
            {children}
          </li>
        </ul>
      ) 
    } else if (this.props.parent.pos === 'Infinitive') {
      return (
        <ul>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
              <Label parent={this.props.parent} role={this.props.role} />
              {attributes}
              {this.props.parent.pos !== 'VerbContainer' &&
               <ConjunctionButton element={element} role={this.props.role} parentId={this.props.parent._id} />}
              <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
            </div>
            {children}
          </li>
        </ul>
      ) 
    } else {
      return (
        <ul>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
              <Label parent={this.props.parent} role={this.props.role} />
              <ModalSelect value={element.modal} onChange={this.handleChange} />
              {attributes}
              {this.props.parent.pos !== 'VerbContainer' &&
               <ConjunctionButton element={element} role={this.props.role} parentId={this.props.parent._id} />}
              <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
            </div>
            {compChildren}
            {children}
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
    const attrs = ['complements','adverbs','prepositions']

    const list = this.props.parent.pos === 'Infinitive' ? ['negative','continuous','passive'] :
                 ['past','negative','continuous','perfect','passive']
    const attributes = list.map(o => (
      e('button', {
        className: `button is-small is-active ${element[o] && 'is-primary'}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element._id, o, !element[o]))
      }, o)
    ))

    const children = <Children element={element} attrs={attrs} words={state.Words}
                      target={state.target} activeWord={state.activeWord} />

    if (this.props.parent.pos === 'Gerund') {
      return (
        <ul>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
              <Label parent={this.props.parent} role={this.props.role} />
              <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
            </div>
            {children}
          </li>
        </ul>
      )
    } else if (this.props.parent.pos === 'Participle') {
      return (
        <ul>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
              <Label parent={this.props.parent} role={this.props.role} />
              <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
            </div>
            {children}
          </li>
        </ul>
      )
    } else if (this.props.parent.pos === 'Infinitive') {
      return (
        <ul>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
              <Label parent={this.props.parent} role={this.props.role} />
              {attributes}
              {this.props.parent.pos !== 'VerbContainer' &&
               <ConjunctionButton element={element} role={this.props.role} parentId={this.props.parent._id} />}
              <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
            </div>
            {children}
          </li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li className="tree-top">
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.base}</span>
              <Label parent={this.props.parent} role={this.props.role} />
              <ModalSelect value={element.modal} onChange={this.handleChange} />
              {attributes}
              {this.props.parent.pos !== 'VerbContainer' &&
               <ConjunctionButton element={element} role={this.props.role} parentId={this.props.parent._id} />}
              <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
            </div>
            {children}
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
    const attrs = ['conjunction', 'verbs', 'complements','adverbs','prepositions']

    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>VerbContainer</span>
            <Label parent={this.props.parent} role={this.props.role} />
            <ModalSelect value={element.modal} onChange={this.handleChange} />
            {element.verbs.length > 0 &&
            <UndoConjunctionButton element={element} thisRole={this.props.role}
                                   childRole='verbs' parentId={this.props.parent._id} />}
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})
