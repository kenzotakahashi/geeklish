import React from 'react'
import { store } from '../../../index.js'
import { Children, WH, DeleteButton, Label } from './Tree'
import { showOptions, changeAttribute } from '../../../shared/actions'

const e = React.createElement

export const Adverb = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props._id, 'position', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['adverb']
    const modifyVerb = ['Verb','Be','VerbContainer'].includes(this.props.parent.pos) &&
                        this.props.role[0] === 'adverbs'

    const forms = ['before','middle','after'].map(o => (
      <option key={o} value={o}>{o}</option>
    ))

    const formSelect = modifyVerb &&(
      <span className="select is-small">
        <select value={element.position} onChange={this.handleChange}>{forms}</select>
      </span>
    )

    const comparison = modifyVerb && !!element.word.comparative &&
    (['base','comparative','superlative'].map(o => (
      e('button', {
        className: `tree-button ${element.form === o && 'on'}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(this.props._id, 'form', o))
      }, o)
    )))

    return (
      <ul className='desktop-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props._id))}>{element.word.base}</span>
            <Label parent={this.props.parent} role={this.props.role} />
            {formSelect}
            {comparison}
            <WH id={this.props._id} isWh={element.isWh} />
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const AdverbClause = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['conjunction', 'clause']

    return (
      <ul className='desktop-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props._id))}>Adverb Clause</span>            
            <Label parent={this.props.parent} role={this.props.role} />
            {e('button', {
              className: `tree-button ${element.before && 'on'}`,              
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(this.props._id, 'before', !element.before))
            }, element.before ? 'before' : 'after')}
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})