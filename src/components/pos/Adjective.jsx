import React from 'react'
import store from '../../store.js'
import pos_components from './pos_components'
import { showOptions, showWordFactory, changeAttribute } from '../../actions'

const e = React.createElement

export const Adjective = React.createClass({
  render: function() {
    const state = store.getState()
    const word = state.Words.find(o => o.id === this.props.id)

    const adverbs = word.adverbs.map(w => (
      e(pos_components[state.Words.find(o => o.id === w).pos], {key: w, id: w})
    ))
    const prepositions = word.prepositions.map(w => (
      e(pos_components[state.Words.find(o => o.id === w).pos], {key: w, id: w})
    ))

    const attributes = ['base','comparative','superlative'].map(o => (
      e('button', {
        className: `button is-active ${word.mode === o? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(this.props.id, 'mode', o))
      }, o)
    ))

    const attrs = ['adverbs','prepositions']
    const options = state.activeWord === this.props.id ? attrs.map((o, i) => (
      e('div', {
        className: `list-group-item ${state.target === o ? 'active' : 'list-group-item-info'}`,
        key: i,
        onClick: () => store.dispatch(showWordFactory(this.props.id, o))
      }, o)
    )) : ''

    return (
      <div className="list-group-item">
        <div>
          <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>{word.word.base}</span>
          {attributes}
          {e('button', {
            className: `button is-active ${word.isWh ? 'is-primary' : ''}`,
            type: 'button',
            onClick: () => store.dispatch(changeAttribute(this.props.id, 'isWh', !word.isWh))
          }, 'WH')}
        </div>
        {adverbs}
        {prepositions}
        {options}
      </div>
    )
  },
})

export const AdjectiveClause = React.createClass({
  render: function() {
    const state = store.getState()
    const word = state.Words.find(o => o.id === this.props.id)

    const w = 'clause'
    const clauseChild = !!word[w] ?
          e(pos_components[state.Words.find(o => o.id === word[w]).pos],
            {id: word[w],  key: w}) : ''

    const clauseOption = !word[w] && state.activeWord === this.props.id ?
          e('div', {
            className: `list-group-item ${state.target === w ? 'active' : 'list-group-item-info'}`,
            key: w,
            onClick: () => store.dispatch(showWordFactory(this.props.id, w))
          }, w) : ''

    return (
      <div className="list-group-item">
        <div>
          <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>Adjective Clause</span>
        </div>
        {clauseChild}
        {clauseOption}
      </div>
    )
  },
})