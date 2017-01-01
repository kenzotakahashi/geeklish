import React from 'react'
import { store } from '../../../index.js'
import { DeleteButton, Label } from './Tree'

const Conjunction = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)

    return (
      <ul className='desktop-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word'>{element.word}</span>
            <Label parent={this.props.parent} role={this.props.role} />
            <DeleteButton id={element._id} role={this.props.role} parentId={this.props.parent._id} />
          </div>
        </li>
      </ul>
    )
  },
})

export default Conjunction