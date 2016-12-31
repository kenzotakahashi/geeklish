import React from 'react'
import { store } from '../../index.js'
import Pos from '../../pos/Pos.js'

const Output = React.createClass({
  render: function() {
    const state = store.getState()
    const sentence = Object.create(Pos.Sentence)
                    .init(state.Words.find(o => o.pos === 'Sentence')).toString()

    return (
      <div>
        <div className="output">
          {sentence}
        </div>
        <hr />
      </div>
    )
  }
})

export default Output