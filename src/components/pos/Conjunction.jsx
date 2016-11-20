import React from 'react'
import store from '../../store.js'
import { DeleteButton } from './Tree'

const Conjunction = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)

    return (
      <ul>
        <li className='tree-top'>
          <div className='tree-box'>
            <span className='word'>{element.word}</span>
            <span className="label label-default">{this.props.role}</span>
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
        </li>
      </ul>
    )
  },
})

export default Conjunction