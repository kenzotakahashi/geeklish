import React from 'react'
import store from '../../store.js'
import { Children, WH, DeleteButton } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

const Preposition = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['complement']

    if (this.props.role === 'particle') {
      return (
        <ul>
          <li className='tree-top'>
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>{element.word}</span>
              <span className="label label-default">{this.props.role}</span>
              {this.props.parent.complements.length > 0 &&
              e('button', {
                className: `button is-small is-active ${element.before && 'is-primary'}`,
                type: 'button',
                onClick: () => store.dispatch(changeAttribute(element.id, 'before', !element.before))
              }, element.before ? 'before': 'after')
              }
              <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parent.id} />
            </div>
          </li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li className='tree-top'>
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>{element.word}</span>
              <span className="label label-default">{this.props.role}</span>
              <WH id={element.id} isWh={element.isWh} />
              {['Verb','Be','VerbContainer'].includes(this.props.parent.pos) &&
                e('button', {
                className: `button is-small is-active ${element.before && 'is-primary'}`,
                type: 'button',
                onClick: () => store.dispatch(changeAttribute(element.id, 'before', !element.before))
              }, element.before ? 'before': 'after')}
              <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parent.id} />
            </div>
            <Children element={element} attrs={attrs} words={state.Words}
                      target={state.target} activeWord={state.activeWord} />
          </li>
        </ul>
      )
    }
  },
})

export default Preposition