import React from 'react'
import store from '../../store.js'

const Conjunction = React.createClass({
  render: function() {
    const state = store.getState()
    const word = state.Words.find(o => o.id === this.props.id)

    return (
      <div className="list-group-item">
        <div>
          <span className='word'>{word.word}</span>
        </div>
      </div>
    )
  },
})

export default Conjunction