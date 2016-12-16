import React from 'react'
import store from '../store.js'

import Canvas from './Canvas.jsx'

import { exampleStates, exampleOutputs, initialState } from '../examples'
import { Link } from 'react-router'

const Examples = React.createClass({
  componentDidMount: function () {
    // store.subscribe(() => this.forceUpdate())
    this.checkRoute()
  },
  componentDidUpdate: function() {
    this.checkRoute()
  },
  changeExample: function(state) {
    store.dispatch({
      type: 'CHANGE_EXAMPLE',
      state
    }) 
  },
  checkRoute: function() {
    const state = store.getState()
    
    // Just for admin
    const params = this.props.params
    if (!params) return

    const id = params.id
    if (id !== undefined && parseInt(id, 10) !== state.example) {
      this.changeExample(exampleStates[parseInt(id, 10)])
    } else if (id === undefined && state.example !== null) {
      this.changeExample(initialState)
    }
  },
  render: function() {
    const examples = exampleOutputs.map(o => (
      <li key={o.id} className='example'>
        <Link to={`/examples/${o.id}`} activeClassName="active-link">{o.title}</Link>
      </li>
    ))

    return (
      <div className='container small-font'>
        <div className='row'>
          <div className='col-md-2'>
            <div className='main-box'>
              <ul className='list-group fixed-box'>
                {examples}
              </ul>
            </div>
          </div>
          <div className='col-md-10'>
            <Canvas />
          </div>
        </div>
      </div>
    )
  }
})

export default Examples