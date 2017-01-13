import React from 'react'
import { store } from '../../../index.js'
import { Children, WH, DeleteButton, Label } from './Tree'
import { showOptions, changeAttribute } from '../../../shared/actions'
import { getWordDictionary } from '../../../shared/wordDictionary'

const e = React.createElement

export const Adjective = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['complement','adverbs','prepositions']

    const attributes = ['base','comparative','superlative'].map(o => (
      e('button', {
        className: `tree-button ${element.form === o && 'on'}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(_id, 'form', o))
      }, o)
    ))

    return (
      <ul className='desktop-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(_id))}>{element.word.base}</span>
            <Label parent={parent} role={role} />
            {attributes}
            {role[1] === null &&
            e('button', {
              className: `tree-button ${element.after  && 'on'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(element._id, 'after', !element.after))
            }, element.after ? 'after': 'before')
            }
            <WH id={_id} isWh={element.isWh} />
            <DeleteButton id={element._id} role={role} parentId={parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const AdjectiveClause = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['clause']

    return (
      <ul className='desktop-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props._id))}>Adjective Clause</span>            
            <Label parent={this.props.parent} role={this.props.role} />
            {e('button', {
              className: `tree-button ${element.essential && 'on'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(element._id, 'essential', !element.essential))
            }, 'essential')}
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})


export const Appositive = React.createClass({
  componentDidMount: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    if (!element.verb) {
      getWordDictionary(element, ['noun', null])
    }
  },
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['noun']

    return (
      <ul className='desktop-ul'>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Appositive</span>
            <Label parent={parent} role={role} />
            {e('button', {
              className: `tree-button ${element.essential && 'on'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(element._id, 'essential', !element.essential))
            }, 'essential')}
            <DeleteButton id={element._id} role={role} parentId={parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})