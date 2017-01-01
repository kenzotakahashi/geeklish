import React from 'react'
import { store } from '../../index.js'
import { Link } from '../kenzo-router'

import Output from './Output.jsx'
import pos_components from './pos/pos_components.jsx'

const e = React.createElement

const Canvas = React.createClass({
  render: function() {
    return (
      <div className='page page-canvas'>
        <nav className='m-nav'>
          <Link to='/' back={true} className='m-back'>
            <span className='back-arrow'></span>
          </Link>
          <h3 className='title'>{store.getState().title}</h3>
        </nav>
        <section>
          <Output />
          {e(pos_components.Sentence)}
        </section>
      </div>
    )
  }
})

export default Canvas