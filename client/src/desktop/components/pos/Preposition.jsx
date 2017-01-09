import React from 'react'
import { store } from '../../../index.js'
import { Children, WH, DeleteButton, Label } from './Tree'
import { showOptions, changeAttribute } from '../../../shared/actions'

const e = React.createElement

const Preposition = React.createClass({
  render: function() {
    const state = store.getState()
    const {_id, parent, role} = this.props
    const element = state.Words.find(o => o._id === _id)
    const attrs = ['complement']

    if (role[0] === 'particle') {
      return (
        <ul className='desktop-ul'>
          <li className='tree-top'>
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(_id))}>{element.word}</span>
              <Label parent={parent} role={role} />
              {parent.complements.length > 0 &&
              e('button', {
                className: `tree-button ${element.before  && 'on'}`,
                type: 'button',
                onClick: () => store.dispatch(changeAttribute(element._id, 'before', !element.before))
              }, element.before ? 'before': 'after')
              }
              <DeleteButton id={element._id} role={role} parentId={parent._id} />
            </div>
          </li>
        </ul>
      )
    } else {
      return (
        <ul className='desktop-ul'>
          <li className='tree-top'>
            <div className={`tree-box ${element.pos}`}>
              <span className='word' onClick={() => store.dispatch(showOptions(_id))}>{element.word}</span>
              <Label parent={parent} role={role} />
              <WH id={element._id} isWh={element.isWh} />
              {['Verb','Be','VerbContainer'].includes(parent.pos) && role[0] === 'prepositions' &&
                e('button', {
                className: `tree-button ${element.before  && 'on'}`,
                type: 'button',
                onClick: () => store.dispatch(changeAttribute(element._id, 'before', !element.before))
              }, element.before ? 'before': 'after')}
              <DeleteButton id={element._id} role={role} parentId={parent._id} />
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