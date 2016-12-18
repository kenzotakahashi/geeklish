import React from 'react'
import store from '../../store.js'
import { Children, WH, DeleteButton, ConjunctionButton, UndoConjunctionButton } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

export const Noun = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['determiners','adjectives','nouns','prepositions']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.singular}</span>
            <span className="label label-default">{this.props.role}</span>
            {e('button', {
              className: `button is-small is-active ${element.number === 'plural' && 'is-primary'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(
                             element._id, 'number', element.number === 'plural' ? 'singular' : 'plural'))
            }, element.number)}
            {parent.pos !== 'Possessive' && <WH id={element._id} isWh={element.isWh} />}
            {parent.pos !== 'NounContainer' &&
             <ConjunctionButton element={element} role={this.props.role} parentId={this.props.parent._id} />}
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const NounContainer = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['conjunction','determiners','adjectives','nouns','prepositions']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>NounContainer</span>
            <span className="label label-default">{this.props.role}</span>
            <WH id={element._id} isWh={element.isWh} />
            {element.nouns.length > 0 &&
            <UndoConjunctionButton element={element} thisRole={this.props.role}
                                   childRole='nouns' parentId={this.props.parent._id} />}
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const NounClause = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['clause', 'determiners','adjectives','nouns','prepositions']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Noun Clause</span>
            <span className="label label-default">{this.props.role}</span>
            {e('button', {
              className: `button is-small is-active ${element.that && 'is-primary'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(element._id, 'that', !element.that))
            }, 'that')}
            <WH id={element._id} isWh={element.isWh} />
            {this.props.parent.pos !== 'NounContainer' &&
             <ConjunctionButton element={element} role={this.props.role} parentId={this.props.parent._id} />}
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})