import React from 'react'

import Canvas from './Canvas.jsx'

import { exampleOutputs } from '../examples'
import { Link } from './kenzo-router'

const Examples = React.createClass({
  // TOTO activeClass <Link to={`/examples/${o.id}`} activeClassName="active-link">{o.title}</Link>

  render: function() {
    const examples = exampleOutputs.map(o => (
      <li key={o.id} className='example'>
        <Link to={`/examples/${o.id}`} >{o.title}</Link>
      </li>
    ))

    return (
      <div className='container small-font'>
        <div className='row'>
          <div className='col-xs-2'>
            <div className='main-box'>
              <ul className='list-group fixed-box'>
                {examples}
              </ul>
            </div>
          </div>
          <div className='col-xs-10'>
            <Canvas />
          </div>
        </div>
      </div>
    )
  }
})

export default Examples