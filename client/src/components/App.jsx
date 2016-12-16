import React from 'react'
import store from '../store.js'
import { Link } from './kenzo-router'

import Examples from './Examples'
import Projects from './Projects'
import Guide from './Guide'
import Admin from './Admin'

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
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to='/' className="navbar-brand">Geeklish</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to='/examples'>Examples</Link></li>
              </ul>
              <ul className="nav navbar-nav">
                <li><Link to='/projects'>My Projects</Link></li>
              </ul>
              <ul className="nav navbar-nav">
                <li><Link to='/guide'>Guide</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        {children}

        <footer>
          <p>© 2016 Geeklish. All Rights Reserved. 
          <a href="mailto:kenzotakahashi2@gmail.com" target="_top">kenzotakahashi2@gmail.com</a></p>
        </footer>
      </div>
    )
  }
})




export default App