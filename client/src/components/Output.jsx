import React from 'react'
import store from '../store.js'
import Pos from '../pos/Pos.js'

const Output = React.createClass({
  render: function() {
    const state = store.getState()
    // const sentence = state.Words.find(o => o.pos === 'Sentence')
    const sentence = Object.create(Pos.Sentence)
                    .init(state.Words.find(o => o.pos === 'Sentence')).toString()
    // const c = !!sentence.clause ? createWord(sentence.clause).toString() : ''

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          {sentence}
        </div>
      </div>
    )
  }
})

export default Output