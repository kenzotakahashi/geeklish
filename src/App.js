import React from 'react'
import './App.css'
// import { Navbar, Jumbotron, Button } from 'react-bootstrap'
import store from './store.js'

import WordFactory from './components/WordFactory.jsx'
import Output from './components/Output.jsx'
import pos_components from './components/pos/pos_components.jsx'

const e = React.createElement

const App = React.createClass({
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate())
  },
  render: function() {
    const state = store.getState()
    const wordFactory = !!state.target ? <WordFactory /> : ''
    return (
      <div className='container'>
        <h3>Geeklish</h3>
        <div className='columns'>
          <div className='column is-8'>
            <Output />
            {e(pos_components.Sentence)}
          </div>
          <div className='column is-4'>
            {wordFactory}
          </div>
        </div>
      </div>
    )
  }
})

export default App