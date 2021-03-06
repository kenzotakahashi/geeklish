import React from 'react'
import { store } from '../../index.js'

import Canvas from './Canvas.jsx'

import { Link } from '../kenzo-router'

const Examples = React.createClass({
  // TOTO activeClass <Link to={`/examples/${o._id}`} activeClassName="active-link">{o.title}</Link>

  render: function() {
    const state = store.getState()
    const examples = state.examples.map(o => (
      <ul key={o.category} className='list-group'>
        <h5>{o.category}</h5>
        {o.examples.map(t => (
          <li key={t._id} className='example'>
            <Link to={`/examples/${t._id}`} >{t.title}</Link>
          </li>
        ))}
      </ul>
    ))

    return (
      <div className='row'>
        <div className='col-2'>
          <div className='main-box'>
            <div className='fixed-box'>
              {examples}
            </div>
          </div>
        </div>
        <div className='col-10'>
          {state.title && <Canvas />
          }
        </div>
      </div>
    )
  }
})

export default Examples