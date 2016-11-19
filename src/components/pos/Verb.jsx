import React from 'react'
import store from '../../store.js'
import pos_components from './pos_components'
import { showOptions, showWordFactory, changeAttribute } from '../../actions'

const e = React.createElement

export const Verb = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props.id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const word = state.Words.find(o => o.id === this.props.id)

    const attrs = ['complements','adverbs','prepositions']
    const children = attrs.map((w, i) => (
      word[w].map((t, j) => (
        e(pos_components[state.Words.find(o => o.id === t).pos], {key: w+j, id: t})
      ))
    ))

    const options = state.activeWord === this.props.id ? attrs.map((o, i) => (
      e('li', {
        className: `tree ${state.target === o ? 'active' : 'tree-info'}`,
        key: i,
        onClick: () => store.dispatch(showWordFactory(this.props.id, o))
      }, o)
    )) : ''

    const w = 'predicate'
    const predicateChild = !!word[w] ?
          e(pos_components[state.Words.find(o => o.id === word[w]).pos],
            {id: word[w],  key:w}) : ''

    const predicateOption = !word[w] && state.activeWord === this.props.id ?
          e('li', {
            className: `tree ${state.target === w ? 'active' : 'tree-info'}`,
            key: w,
            onClick: () => store.dispatch(showWordFactory(this.props.id, w))
          }, w) : ''

    const attributes = ['past','negative','continuous','perfect','passive'].map(o => (
      e('button', {
        className: `button is-active ${word[o] ? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(this.props.id, o, !word[o]))
      }, o)
    ))

    const modals = ['modal','can','could','should','may','might','must','will','would'].map(o => (
      <option key={o} value={o === 'modal' ?  '' : o}>{o}</option>
    ))

    return word.form === 'gerund' ? (
      <div className="tree">
        <div>
          <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>
            {word.word[word.form]}
          </span>
        </div>
        {children}
        {predicateChild}
        {options}
        {predicateOption}
      </div>
    ) : (
      <ul>
        <li className="tree">
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>{word.word.base}</span>
            <span className="select" value={word.modal} onChange={this.handleChange}><select>{modals}</select></span>
            {attributes}
          </div>
          <ul>
            {children}
            {predicateChild}
            {options}
            {predicateOption}
          </ul>
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
    const word = state.Words.find(o => o.id === this.props.id)

    const attrs = ['complements','adverbs','prepositions']
    const children = attrs.map((w, i) => (
      word[w].map((t, j) => (
        e(pos_components[state.Words.find(o => o.id === t).pos], {key: w+j, id: t})
      ))
    ))

    const options = state.activeWord === this.props.id ? attrs.map((o, i) => (
      e('div', {
        className: `tree ${state.target === o ? 'active' : 'tree-info'}`,
        key: i,
        onClick: () => store.dispatch(showWordFactory(this.props.id, o))
      }, o)
    )) : ''

    const w = 'predicate'
    const predicateChild =  !!word[w] ?
          e(pos_components[state.Words.find(o => o.id === word[w]).pos],
            {id: word[w],  key:w}) : ''

    const predicateOption = !word[w] && state.activeWord === this.props.id ?
          e('div', {
            className: `tree ${state.target === w ? 'active' : 'tree-info'}`,
            key: w,
            onClick: () => store.dispatch(showWordFactory(this.props.id, w))
          }, w) : ''

    const attributes = ['past','negative','continuous','perfect'].map(o => (
      e('button', {
        className: `button is-active ${word.isWh ? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(this.props.id, o, !word[o]))
      }, o)
    ))

    const modals = ['modal','can','could','should','may','might','must','will','would'].map(o => (
      <option key={o} value={o === 'modal' ?  '' : o}>{o}</option>
    ))
 
    return (
      <div className="tree">
        <div>
          <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>{word.word.base}</span>
          <span className="select"><select value={word.modal} onChange={this.handleChange}>{modals}</select></span>
          {attributes}
        </div>
        {children}
        {predicateChild}
        {options}
        {predicateOption}
      </div>
    )
  },
})

export const VerbContainer = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props.id, 'modal', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const word = state.Words.find(o => o.id === this.props.id)

    const attrs = ['verbs', 'complements','adverbs','prepositions']
    const children = attrs.map((w, i) => (
      word[w].map((t, j) => (
        e(pos_components[state.Words.find(o => o.id === t).pos], {key: w+j, id: t})
      ))
    ))

    const options = state.activeWord === this.props.id ? attrs.map((o, i) => (
      e('div', {
        className: `tree ${state.target === o ? 'active' : 'tree-info'}`,
        key: i,
        onClick: () => store.dispatch(showWordFactory(this.props.id, o))
      }, o)
    )) : ''

    const attrs2 = ['conjunction', 'predicate']
    const children2 = attrs2.map(w => (
      !!word[w] ?
      e(pos_components[state.Words.find(o => o.id === word[w]).pos], {id: word[w],  key:w}) : ''
    ))
    const options2 = attrs2.map(w => (
      !word[w] && state.activeWord === this.props.id ?
      e('div', {
        className: `tree ${state.target === w ? 'active' : 'tree-info'}`,
        key: w,
        onClick: () => store.dispatch(showWordFactory(this.props.id, w))
      }, w) : ''
    ))

    const modals = ['modal','can','could','should','may','might','must','will','would'].map(o => (
      <option key={o} value={o === 'modal' ?  '' : o}>{o}</option>
    ))

    return (
      <div className="tree">
        <div>
          <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>VerbContainer</span>
          <span className="select"><select value={word.modal} onChange={this.handleChange}>{modals}</select></span>
        </div>
        {children}
        {children2}
        {options}
        {options2}
      </div>
    )
  },
})
