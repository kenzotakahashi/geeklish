import React from 'react'
import { store } from '../../index.js'
import Pos from '../../pos/Pos.js'
import { switchCanvas } from '../../shared/actions'

const answerStyle = {
  color: '#007AFF',
  cursor: 'pointer',
  marginLeft: '10px'
}

const corrctStyle = {
  color: '#769c00',
}

const rightStyle = {
  float: 'right'
}

const titleStyle = {
  fontSize: '12px',
  color: '#aaa',
  marginBottom: '5px'
}

const Output = React.createClass({
  render: function() {
    const state = store.getState()
    const sentence = Object.create(Pos.Sentence)
                    .init(state.Words.find(o => o.pos === 'Sentence')).toString()

    return (
      <div>
        <div style={titleStyle}>
          {state.title}
        </div>
        <span className='output'>
          {sentence}
        </span>
        <span style={rightStyle}>
          {state.isCorrect && <span style={corrctStyle}>Correct!</span>}        
          <span style={answerStyle} onClick={() => store.dispatch(switchCanvas())}>
            {state.isAnswer ? 'Back' : 'Show Answer'}
          </span>
        </span>
        <hr />
      </div>
    )
  }
})

export default Output