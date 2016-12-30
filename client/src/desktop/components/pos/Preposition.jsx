import React from 'react'
import { store } from '../../../index.js'
import { Children, WH, DeleteButton, Label } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

const Preposition = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['complement']

    if (this.props.role[0] === 'particle') {
      return (
        <ul>
          <li className='tree-top'>
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(this.props._id))}>{element.word}</span>
              <Label parent={this.props.parent} role={this.props.role} />
              {this.props.parent.complements.length > 0 &&
              e('button', {
                className: `tree-button ${element.before  && 'on'}`,
                type: 'button',
                onClick: () => store.dispatch(changeAttribute(element._id, 'before', !element.before))
              }, element.before ? 'before': 'after')
              }
              <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
            </div>
          </li>
        </ul>
      )
    } else {
      return (
        <ul>
          <li className='tree-top'>
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(this.props._id))}>{element.word}</span>
              <Label parent={this.props.parent} role={this.props.role} />
              <WH id={element._id} isWh={element.isWh} />
              {['Verb','Be','VerbContainer'].includes(this.props.parent.pos) &&
                e('button', {
                className: `tree-button ${element.before  && 'on'}`,
                type: 'button',
                onClick: () => store.dispatch(changeAttribute(element._id, 'before', !element.before))
              }, element.before ? 'before': 'after')}
              <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
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