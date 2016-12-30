import React from 'react'
import { store } from '../../../index.js'
import { Children, WH, DeleteButton, ConjunctionButton, UndoConjunctionButton, Label } from './Tree'
import { showOptions, changeAttribute } from '../../actions'
import { getWordDictionary } from '../../wordDictionary'

const e = React.createElement

export const Noun = React.createClass({
  changeNumber: function(element) {
    store.dispatch(changeAttribute(
      element._id, 'number', element.number === 'plural' ? 'singular' : 'plural'))
    const state = store.getState()
    const newElement = state.Words.find(o => o._id === element._id)
    if (state.activeWord === newElement._id && ['quantifier','determiner'].includes(state.target[0])) {
      getWordDictionary(newElement, state.target)
    }
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['quantifier','determiner','adjectives','nouns','prepositions']

    const quantifier = state.Words.find(o => o._id === element.quantifier)
    const determiner = state.Words.find(o => o._id === element.determiner)
    const disableNumber = (quantifier && quantifier.number !== 'both') ||
                          (determiner && determiner.number !== 'both')

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word.singular}</span>
            <Label parent={this.props.parent} role={this.props.role} />
            {element.type === 'countable' &&
              e('button', {
              className: `tree-button ${element.number === 'plural'  && 'on'}`,
              type: 'button',
              disabled: disableNumber && "disabled",
              onClick: () => this.changeNumber(element)
            }, element.number)}
            {this.props.parent.pos !== 'Possessive' && <WH id={element._id} isWh={element.isWh} />}
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

export const NounContainer = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['conjunction','quantifier','determiner','adjectives','nouns','prepositions']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>NounContainer</span>
            <Label parent={this.props.parent} role={this.props.role} />
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
    const attrs = ['clause','quantifier','adjectives','nouns','prepositions']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Noun Clause</span>
            <Label parent={this.props.parent} role={this.props.role} />
            {e('button', {
              className: `tree-button ${element.that  && 'on'}`,
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