import React from 'react'
import '../css/Canvas.css'
import store from '../store.js'

import WordFactory from './WordFactory.jsx'
import Output from './Output.jsx'
import Examples from './Examples.jsx'
import pos_components from './pos/pos_components.jsx'

import { exampleStates, initialState } from '../examples'

const e = React.createElement

const Canvas = React.createClass({
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate())
    this.checkRoute()
  },
  componentDidUpdate: function() {
    this.checkRoute()
  },
  changeExample: function(state) {
    store.dispatch({
      type: 'CHANGE_EXAMPLE',
      state
    }) 
  },
  checkRoute: function() {
    const state = store.getState()
    if (this.props.params === undefined) return
    const index = this.props.params.index
    if (index !== undefined && parseInt(index, 10) !== state.example) {
      this.changeExample(exampleStates[parseInt(index, 10)])
    } else if (index === undefined && state.example !== null) {
      this.changeExample(initialState)
    }
  },
  render: function() {
    const state = store.getState()

    const wordFactory = !!state.target && <WordFactory />
    return (
      <div className='container small-font'>
        <div className='columns'>
          <div className='column is-2'>
            <div className='main-box'>
              <Examples />
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