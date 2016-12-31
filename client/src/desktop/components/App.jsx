import React from 'react'
import { store } from '../../index.js'
import { Link } from '../kenzo-router'

import Examples from './Examples'
import Projects from './Projects'
import Guide from './Guide'
import Admin from './Admin'
import ModalConductor from './modal/ModalConductor'

import 'normalize.css'
import '../css/main.css'

function getChildren(state, route) {
  if (route === 'projects') {
    return <Projects/>
  }
  if (route === 'examples') {
    return <Examples/>
  }
  if (route === 'guide') {
    return <Guide />
  }
  if (route === 'admin') {
    return <Admin />
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
        <nav className="row">
          <span className="nav-item">
            <Link to='/' className="">Geeklish</Link>
          </span>
          <span className="nav-item">
            <Link to='/examples'>Examples</Link>
          </span>
          <span className="nav-item">
            <Link to='/projects'>My Projects</Link>
          </span>
          <span className="nav-item">
            <Link to='/guide'>Guide</Link>
          </span>
        </nav>

        {children}

        <footer>
          <p>© 2016 Geeklish. All Rights Reserved. 
          <a href="mailto:kenzotakahashi2@gmail.com" target="_top">kenzotakahashi2@gmail.com</a></p>
        </footer>

        <ModalConductor {...state} />
      </div>
    )
  }
})


export default App