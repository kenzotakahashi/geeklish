import React from 'react'
import store from '../../store.js'
import pos_components from './pos_components'
import { showOptions, showWordFactory, changeAttribute } from '../../actions'

const e = React.createElement

export const Noun = React.createClass({
  changeNumber: function(id) {
    store.dispatch({
      type: 'CHANGE_NUMBER',
      id,
    })
  },
  render: function() {
    const state = store.getState()
    const word = state.Words.find(o => o.id === this.props.id)

    const attrs = ['determiners','adjectives','nouns','prepositions']
    const children = attrs.map((w, i) => (
      word[w].map((t, j) => (
        e(pos_components[state.Words.find(o => o.id === t).pos], {key: w+j, id: t})
      ))
    ))

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
          <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>{word.word.singular}</span>
          {e('button', {
            className: `button is-active ${word.number === 'plural' ? 'is-primary' : ''}`,
            type: 'button',
            onClick: () => this.changeNumber(this.props.id)
          }, word.number)}
          {e('button', {
            className: `button is-active ${word.isWh ? 'is-primary' : ''}`,
            type: 'button',
            onClick: () => store.dispatch(changeAttribute(this.props.id, 'isWh', !word.isWh))
          }, 'WH question')}
        </div>
        {children}
        {options}
      </div>
    )
  },
})

export const NounContainer = React.createClass({
  render: function() {
    const state = store.getState()
    const word = state.Words.find(o => o.id === this.props.id)

    const w = 'conjunction'
    const conjunctionChild = !!word[w] ?
          e(pos_components[state.Words.find(o => o.id === word[w]).pos],
            {id: word[w],  key: w}) : ''

    const conjunctionOption = !word[w] && state.activeWord === this.props.id ?
          e('div', {
            className: `list-group-item ${state.target === w ? 'active' : 'list-group-item-info'}`,
            key: w,
            onClick: () => store.dispatch(showWordFactory(this.props.id, w))
          }, w) : ''

    const attrs = ['determiners','adjectives','nouns','prepositions']
    const children = attrs.map((w, i) => (
      word[w].map((t, j) => (
        e(pos_components[state.Words.find(o => o.id === t).pos], {key: w+j, id: t})
      ))
    ))
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
          <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>NounContainer</span>
          {e('button', {
            className: `button is-active ${word.isWh ? 'is-primary' : ''}`,
            type: 'button',
            onClick: () => store.dispatch(changeAttribute(this.props.id, 'isWh', !word.isWh))
          }, 'WH question')}
        </div>
        {conjunctionChild}
        {children}
        {conjunctionOption}
        {options}
      </div>
    )
  },
})