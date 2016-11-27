import React from 'react'
import '../css/Canvas.css'
import store from '../store.js'

import WordFactory from './WordFactory.jsx'
import Output from './Output.jsx'
import Examples from './Examples.jsx'
import pos_components from './pos/pos_components.jsx'

import { exampleStates } from '../examples'

const e = React.createElement

const Canvas = React.createClass({
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate())
    this.changeExample()
  },
  // componentDidUpdate: function() {
  //   this.changeExample()
  // },
  componentWillReceiveProps: function() {
    this.changeExample()
  },
  changeExample: function() {
    // const state = store.getState()
    const index = this.props.params.index
    if (index !== undefined) {
      store.dispatch({
        type: 'CHANGE_EXAMPLE',
        state: exampleStates[index]
      })
    }
  },
  // getInitialState: function() {
  //   const index = this.props.params.index
  //   return index !== undefined ? exampleStates[index] : store.getState()
  // },
  render: function() {
    const state = store.getState()

    // console.log(index)

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