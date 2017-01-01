import React from 'react'
// import { store } from '../../index.js'
import { Link } from '../kenzo-router'

import Output from './Output.jsx'
// import pos_components from './pos/pos_components.jsx'

// const e = React.createElement

// {e(pos_components.Sentence)}

const Canvas = React.createClass({
  render: function() {
    return (
      <div className='page page-canvas'>
        <nav className='m-container m-nav'>
          <Link to='/' back={true} className='m-icon'>
            <span className='back-arrow'></span>
          </Link>
          <h3 className='title'>Geeklish</h3>
        </nav>
        <section>
          <Output />
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
          <p>Something</p>
        </section>
      </div>
    )
  }
})

export default Canvas