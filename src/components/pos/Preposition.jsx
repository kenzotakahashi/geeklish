import React from 'react'
import store from '../../store.js'
import { Children, WH } from './Tree'
import { showOptions } from '../../actions'

const Preposition = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['complement']

    return (
      <ul>
        <li className='tree-top'>
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>{element.word}</span>
            <span className="label label-default">{this.props.role}</span>
            <WH id={element.id} isWh={element.isWh} />
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export default Preposition