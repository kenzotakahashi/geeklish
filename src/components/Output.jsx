import React from 'react'
import store from '../store.js'
import Pos from '../pos/Pos.js'

const Output = React.createClass({
  render: function() {
    const state = store.getState()
    const sentence = state.Words.find(o => o.pos === 'Sentence')
    const c = !!sentence.clause ? 
              Object.create(Pos.Clause).init(state.Words.find(o => o.id === sentence.clause)).print() : ''
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Output</h3>
        </div>
        <div className="panel-body">
          {c}
        </div>
      </div>
    )
  }
})

export default Output