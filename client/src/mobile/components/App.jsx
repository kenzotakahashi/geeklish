import React from 'react'
import { store } from '../../index.js'

import Examples from './Examples'
import Canvas from './Canvas'

import '../css/main.css'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 

function getChildren(state, route) {
  if (route === 'sentences') {
    return <Examples/>
  }
  if (route === 'canvas') {
    return <Canvas />
  }
}

const timeout = 300

const App = React.createClass({
  componentDidMount: function() {
    store.subscribe(() => this.forceUpdate())
  },
  render: function() {
    const state = store.getState()
    const route = state.route
    const children = getChildren(state, route)
    const routeAction = state.routeAction

    // console.log(route)
    // console.log(state.routeAction)

    if (routeAction === 'PUSH') {
      return (
        <ReactCSSTransitionGroup
          transitionName='forward'
          transitionEnterTimeout={timeout}
          transitionLeaveTimeout={timeout}>
          {children && React.cloneElement(children, {key: route})}
        </ReactCSSTransitionGroup>
      )
    }
    else if (routeAction === 'POP') {
      return (
        <ReactCSSTransitionGroup
          transitionName='backward'
          transitionEnterTimeout={timeout}
          transitionLeaveTimeout={timeout}>
          {children && React.cloneElement(children, {key: route})}
        </ReactCSSTransitionGroup>
      )
    }
    else {
      return (
        <ReactCSSTransitionGroup
          transitionName='initial'
          transitionEnter={false}
          transitionLeaveTimeout={timeout}>
          {children && React.cloneElement(children, {key: route})}
        </ReactCSSTransitionGroup>
      )
    }
  }
})


export default App