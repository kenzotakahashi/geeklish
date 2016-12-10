import React from 'react'
import store from '../../store.js'
import { Children, WH, DeleteButton, ConjunctionButton } from './Tree'
import { showOptions, changeAttribute, changeNumber } from '../../actions'

const e = React.createElement

export const Noun = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['determiners','adjectives','nouns','prepositions']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>{element.word.singular}</span>
            <span className="label label-default">{this.props.role}</span>
            {e('button', {
              className: `button is-small is-active ${element.number === 'plural' && 'is-primary'}`,
              type: 'button',
              onClick: () => store.dispatch(changeNumber(element.id))
            }, element.number)}
            {e('button', {
              className: `button is-small is-active ${element.form === 'possessive' && 'is-primary'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(
                element.id, 'form', element.form === 'possessive' ? element.number : 'possessive'))
            }, 'possessive')}
            <WH id={element.id} isWh={element.isWh} />
            {state.Words.find(o => o.id === this.props.parentId).pos !== 'NounContainer' &&
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

export const NounContainer = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['conjunction','determiners','adjectives','nouns','prepositions']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>NounContainer</span>
            <span className="label label-default">{this.props.role}</span>
            <WH id={element.id} isWh={element.isWh} />
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const NounClause = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['clause', 'determiners','adjectives','nouns','prepositions']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>Noun Clause</span>
            <span className="label label-default">{this.props.role}</span>
            <WH id={element.id} isWh={element.isWh} />
            {state.Words.find(o => o.id === this.props.parentId).pos !== 'NounContainer' &&
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