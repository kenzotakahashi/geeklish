import React from 'react'
import { store } from '../../index.js'

import Examples from './Examples'
import Canvas from './Canvas'
import Detail from './Detail'

import '../css/main.css'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
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
    const routeAction = state.routeAction

    console.log(route)
    // console.log(state.routeAction)

    return (
      <div>
        <Examples route={route === 'examples'} previous={previous === 'examples'}
                  routeAction={routeAction} />
        <Canvas route={route === 'canvas'} previous={previous === 'canvas'}
                  routeAction={routeAction} />
        <Detail route={route === 'detail'} previous={previous === 'detail'}
                  routeAction={routeAction} />
      </div>
    )

  }
})


export default App