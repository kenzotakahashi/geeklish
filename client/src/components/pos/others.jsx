import React from 'react'
import store from '../../store.js'
import { Children, DeleteButton, ConjunctionButton } from './Tree'
import { showOptions, changeAttribute } from '../../actions'
import { getWordDictionary } from '../../wordDictionary'

const e = React.createElement

function shortCut() {
  const state = store.getState()
  const element = state.Words.find(o => o.id === this.props.id)
  if (!element.verb) {
    getWordDictionary(state.Words, state.activeWord, element.id, 'verb')
  }
}

export const Infinitive = React.createClass({
  componentDidMount: shortCut,
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['verb']

    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>Infinitive</span>
            <span className="label label-default">{this.props.role}</span>
            {e('button', {
              className: `button is-small is-active ${element.omit && 'is-primary'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(element.id, 'omit', !element.omit))
            }, 'omit to')}
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export const Gerund = React.createClass({
  componentDidMount: shortCut,
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['verb']

    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>Gerund</span>
            <span className="label label-default">{this.props.role}</span>
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

export const Participle = React.createClass({
  componentDidMount: shortCut,
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['verb']

    const attr = ['present','past','perfect'].map(o => (
      e('button', {
        className: `button is-small is-active ${element.form === o && 'is-primary'}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element.id, 'form', o))
      }, o)
    ))

    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>Participle</span>
            <span className="label label-default">{this.props.role}</span>
            {attr}
            {e('button', {
              className: `button is-small is-active ${element.beginning && 'is-primary'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(element.id, 'beginning', !element.beginning))
            }, 'beginning')}
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

