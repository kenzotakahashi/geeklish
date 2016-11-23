import React from 'react'
import '../css/Canvas.css'
import store from '../store.js'

import WordFactory from './WordFactory.jsx'
import Output from './Output.jsx'
import pos_components from './pos/pos_components.jsx'

const e = React.createElement

const Canvas = React.createClass({
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate())
  },
  render: function() {
    const state = store.getState()
    const wordFactory = !!state.target ? <WordFactory /> : ''
    return (
      <div className='container small-font'>
        <div className='columns'>
          <div className='column is-2'>
            <div className='main-box'>

            </div>
          </div>          
          <div className='column is-8'>
            <div className='main-box'>
              <Output />
              {e(pos_components.Sentence)}
            </div>
          </div>
          <div className='column is-2'>
            {wordFactory}
          </div>
        </div>
      </div>
    )
  }
})

export default Canvas