import React from 'react'
import store from '../store.js'
import { Link } from 'react-router'

const App = React.createClass({
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate())
  },
  render: function() {
    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <Link to='/' className="navbar-brand">Geeklish</Link>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li><Link to='/'>Home</Link></li>
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