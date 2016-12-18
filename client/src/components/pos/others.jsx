import React from 'react'
import store from '../../store.js'
import { Children, DeleteButton, ConjunctionButton } from './Tree'
import { showOptions, changeAttribute } from '../../actions'
import { getWordDictionary } from '../../wordDictionary'

const e = React.createElement

function shortCut() {
  const state = store.getState()
  const element = state.Words.find(o => o._id === this.props._id)
  if (!element.verb) {
    getWordDictionary(state.Words, state.activeWord, element._id, 'verb')
  }
}

export const Infinitive = React.createClass({
  componentDidMount: shortCut,
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['verb']

    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Infinitive</span>
            <span className="label label-default">{this.props.role}</span>
            {e('button', {
              className: `button is-small is-active ${element.omit && 'is-primary'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(element._id, 'omit', !element.omit))
            }, 'omit to')}
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
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
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['verb']

    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Gerund</span>
            <span className="label label-default">{this.props.role}</span>
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

export const Participle = React.createClass({
  componentDidMount: shortCut,
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['verb']

    const verb = !!element.verb && state.Words.find(o => o._id === element.verb)
    const list = !!verb && verb.pos === 'Be' ? ['present','perfect'] : ['present','past','perfect']
    const attr = list.map(o => (
      e('button', {
        className: `button is-small is-active ${element.form === o && 'is-primary'}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(element._id, 'form', o))
      }, o)
    ))

    return (
      <ul>
        <li className="tree-top">
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Participle</span>
            <span className="label label-default">{this.props.role}</span>
            {attr}
            {e('button', {
              className: `button is-small is-active ${element.beginning && 'is-primary'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(element._id, 'beginning', !element.beginning))
            }, 'beginning')}
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

