import React from 'react'
import { store } from '../../index.js'

import Examples from './Examples'
import Canvas from './Canvas'
import Detail from './Detail'
import Option from './Option'
import ComplementOption from './ComplementOption'
import WordFactory from './WordFactory'

import 'normalize.css'
import '../css/main.css'

const App = React.createClass({
  componentDidMount: function() {
    store.subscribe(() => this.forceUpdate())
  },

  render: function() {
    const state = store.getState()
    const route = state.route
    const routeAction = state.routeAction

    // console.log(state.routeAction)

    return (
      <div>
        <Examples route={route === 'examples'} routeAction={routeAction} />
        <Canvas route={route === 'canvas'} routeAction={routeAction} />
        <Detail route={route === 'detail'} routeAction={routeAction} />
        <Option route={route === 'option'} routeAction={routeAction} />
        <ComplementOption route={route === 'complementOption'} routeAction={routeAction} />
        <WordFactory route={route === 'wordFactory'} routeAction={routeAction}
                     dictionary={state.dictionary} />
      </div>
    )

  }
})


export default App