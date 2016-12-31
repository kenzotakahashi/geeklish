import React from 'react'
import { store } from '../../index.js'
// import { Link } from '../kenzo-router'

import Examples from './Examples'

import '../css/main.css'

function getChildren(state, route) {
  if (route === 'examples') {
    return <Examples/>
  }
  // if (route === 'guide') {
  //   return <Guide />
  // }
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
          <h3 className='title'>Geeklish</h3>
        </nav>
        {children}
        <div className='m-tab'></div>
      </div>
    )
  }
})


export default App