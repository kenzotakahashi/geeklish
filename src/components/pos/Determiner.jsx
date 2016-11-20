import React from 'react'
import store from '../../store.js'
import { WH } from './Tree'
import { showOptions } from '../../actions'

const Determiner = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)

    return (
      <ul>
        <li className='tree-top'>
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>{element.word}</span>
            <span className="label label-default">{this.props.role}</span>
            <WH id={element.id} isWh={element.isWh} />
          </div>
        </li>
      </ul>
    )
  },
})

export default Determiner