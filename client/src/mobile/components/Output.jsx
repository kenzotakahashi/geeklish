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
        <span className='m-answer'>{state.title}</span>
        <div className={`output ${state.isCorrect ? 'correct-output' : ''}`}>
          <span>{sentence}</span>
        </div>
        <hr />
      </div>
    )
  }
})

export default Output