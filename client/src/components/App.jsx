import React from 'react'
import store from '../store.js'
import { Link } from 'react-router'

const App = React.createClass({
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate())
  },
  render: function() {
    // const state = store.getState()
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <Link to='/' className="navbar-brand">Geeklish</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to='/' className="navbar-brand">Home</Link></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><Link to='/' className="navbar-brand">Home</Link></li>
              </ul>
            </div>
          </div>
        </nav>

        {this.props.children}
      </div>
    )
  }
})

export default App