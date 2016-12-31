import React from 'react'
import { store } from '../../index.js'
import { Link } from '../kenzo-router'

import Examples from './Examples'
import Canvas from './Canvas'

import '../css/main.css'

function getChildren(state, route) {
  if (route === 'sentences') {
    return <Examples/>
  }
  if (route === 'canvas') {
    return <Canvas />
  }
}

const App = React.createClass({
  componentDidMount: function() {
    store.subscribe(() => this.forceUpdate())
  },
  render: function() {
    const state = store.getState()
    const route = state.route
    const children = getChildren(state, route)

    return (
      <div>
        <nav className='m-container m-nav'>
          <Link to='/' className='m-icon'><span className='back-arrow'></span></Link>
          <h3 className='title'>Geeklish</h3>
        </nav>
        <section>

          {children}
        </section>
        <div className='m-tab'></div>
      </div>
    )
  }
})


export default App