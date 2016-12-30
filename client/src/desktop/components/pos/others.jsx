import React from 'react'
import { store } from '../../../index.js'
import { Children, DeleteButton, ConjunctionButton, Label } from './Tree'
import { showOptions, changeAttribute } from '../../actions'
import { getWordDictionary } from '../../wordDictionary'

const e = React.createElement

function shortCut() {
  const state = store.getState()
  const element = state.Words.find(o => o._id === this.props._id)
  if (!element.verb) {
    getWordDictionary(element, ['verb', null])
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
            <Label parent={this.props.parent} role={this.props.role} />
            {this.props.parent.pos !== 'Clause' &&
              e('button', {
              className: `tree-button ${element.omit && 'on'}`,
              type: 'button',
              onClick: () => store.dispatch(changeAttribute(element._id, 'omit', !element.omit))
            }, 'omit to')}
            {this.props.parent.pos === 'Clause' &&
              e('button', {
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
            <Label parent={this.props.parent} role={this.props.role} />
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
        className: `tree-button ${element.form === o && 'on'}`,
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
            <Label parent={this.props.parent} role={this.props.role} />
            {attr}
            {e('button', {
              className: `tree-button ${element.beginning && 'on'}`,
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

