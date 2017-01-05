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

    // console.log(route)
    // console.log(state.routeAction)

    console.log(animation)

    return (
      <div>
        {animation.examples && <Examples animation={animation.examples} />}
        {animation.canvas && <Canvas animation={animation.canvas} />}
      </div>
    )


    // if (routeAction === 'PUSH') {
    //   return (
    //     <ReactCSSTransitionGroup
    //       transitionName='forward'
    //       transitionEnterTimeout={timeout}
    //       transitionLeaveTimeout={timeout}>
    //       {children && React.cloneElement(children, {key: route})}
    //     </ReactCSSTransitionGroup>
    //   )
    // }
    // else if (routeAction === 'POP') {
    //   return (
    //     <ReactCSSTransitionGroup
    //       transitionName='backward'
    //       transitionEnterTimeout={timeout}
    //       transitionLeaveTimeout={timeout}>
    //       {children && React.cloneElement(children, {key: route})}
    //     </ReactCSSTransitionGroup>
    //   )
    // }
    // else {
    //   return (
    //     <ReactCSSTransitionGroup
    //       transitionName='initial'
    //       transitionEnter={false}
    //       transitionLeaveTimeout={timeout}>
    //       {children && React.cloneElement(children, {key: route})}
    //     </ReactCSSTransitionGroup>
    //   )
    // }
  }
})


export default App