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

const navStyle = {
  backgroundColor: '#fff',
  borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  top: '0',
  width: '100%',
  zIndex: '100'
}

const navItemStyle = {
  float: 'left',
  padding: '15px'
}

const textStyle = {
  color: '#292b2c',
  fontSize: '14px'
}

const sectionStyle = {
  marginTop: '70px'
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
        <nav className="row" style={navStyle}>
          <span style={navItemStyle}>
            <Link to='/' className='logo'></Link>
          </span>
          <span style={navItemStyle}>
            <Link to='/examples' style={textStyle}>Examples</Link>
          </span>
          <span style={navItemStyle}>
            <Link to='/projects' style={textStyle}>My Projects</Link>
          </span>
          <span style={navItemStyle}>
            <Link to='/guide' style={textStyle}>Guide</Link>
          </span>
        </nav>

        <div style={sectionStyle}>
          {children}
        </div>

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