import React from 'react'
import store from '../../store.js'
import pos_components from './pos_components'
import { showOptions, showWordFactory, changeAttribute } from '../../actions'

const e = React.createElement

export const Clause = React.createClass({
  render: function() {
    const state = store.getState()
    const clause = state.Words.find(o => o.id === this.props.id)
    const options = ['subject', 'verb', 'conjunction'].map(w => (
      !!clause[w] ?
      e(pos_components[state.Words.find(o => o.id === clause[w]).pos], {id: clause[w],  key: w, role:w}) :
      state.activeWord === this.props.id ?
      e('li', {
        className: `tree ${state.target === w ? 'active' : 'list-group-item-info2'}`,
        key: w,
        onClick: () => store.dispatch(showWordFactory(this.props.id, w))
      }, w) : ''
    ))

    const attr = ['statement','question','command'].map(o => (
      e('button', {
        className: `button is-active ${clause.cType === o ? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(this.props.id, 'cType', o))
      }, o)
    ))

    return (
      <ul className='tree'>
        <li className='tree'>
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>Clause</span>
            {attr}
          </div>
          <ul>
            {options}
          </ul>
        </li>
      </ul>
    )
  },
})

export const ClauseContainer = React.createClass({
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

    const attrs = ['clauses']
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
      <div className='list-group-item'>
        <div>
          <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>ClauseContainer</span>
        </div>
        <div>
          {conjunctionChild}
          {options}
          {conjunctionOption}
          {children}
        </div>
      </div>
    )
  },
})
