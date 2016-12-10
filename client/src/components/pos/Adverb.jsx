import React from 'react'
import store from '../../store.js'
import { Children, WH, DeleteButton } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

export const Adverb = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['adverb']
    const parent = state.Words.find(o => o.id === this.props.parentId)
    const modifyVerb = ['Verb','Be','VerbContainer'].includes(parent.pos) && this.props.role === 'adverbs'

    const attributes = modifyVerb &&
    (['beginning','before','after'].map(o => (
      e('button', {
        className: `button is-small is-active ${element.position === o && 'is-primary'}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(this.props.id, 'position', o))
      }, o)
    )))

    const comparison = modifyVerb && !!element.comparative &&
    (['base','comparative','superlative'].map(o => (
      e('button', {
        className: `button is-small is-active ${element.form === o && 'is-primary'}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(this.props.id, 'form', o))
      }, o)
    )))

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>{element.word.base}</span>
            <span className="label label-default">{this.props.role}</span>
            {attributes}
            {comparison}
            <WH id={this.props.id} isWh={element.isWh} />
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={this.props.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const AdverbClause = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['conjunction', 'clause']

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>Adverb Clause</span>            
            <span className="label label-default">{this.props.role}</span>
            {e('button', {
              className: `button is-small is-active ${element.position === 'before' && 'is-primary'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(this.props.id, 'position',
                             element.position === 'before' ? 'after' : 'before'))
            }, element.position)}
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={this.props.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})