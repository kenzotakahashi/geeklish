import React from 'react'
import { store } from '../../index.js'

import Examples from './Examples'
import Canvas from './Canvas'
// import Controller from './Controller'

import '../css/main.css'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import TransitionGroup from 'react-addons-transition-group' 
// import {TransitionMotion, spring, presets} from 'react-motion'


const timeout = 3000

const App = React.createClass({
  componentDidMount: function() {
    store.subscribe(() => this.forceUpdate())
  },

  render: function() {
    const state = store.getState()
    const route = state.route
    const previous = state.previous
    const animation = state.animation
    const routeAction = state.routeAction

    console.log(route)
    // console.log(state.routeAction)
    // console.log(animation)

    return (
      <div>
        <Examples route={route === 'examples'} />
        <Canvas route={route === 'canvas'} />
      </div>
    )

  }
})


export default App