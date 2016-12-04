import React from 'react'
import store from '../store.js'

import WordFactory from './WordFactory.jsx'
import Output from './Output.jsx'
import pos_components from './pos/pos_components.jsx'

const e = React.createElement

const Canvas = React.createClass({

  render: function() {
    const state = store.getState()

    const wordFactory = !!state.target && <WordFactory dictionary={state.dictionary} />
    return (
      <div className='row'>
        <div className='col-md-9'>
          <div className='main-box'>
            <Output />
            {e(pos_components.Sentence)}
          </div>
        </div>
        <div className='col-md-3'>
          {wordFactory}
        </div>
      </div>
    )
  }
})

export default Canvas