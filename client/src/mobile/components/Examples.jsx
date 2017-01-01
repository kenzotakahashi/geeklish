import React from 'react'
import { store } from '../../index.js'

import { Link } from '../kenzo-router'

// import {Motion, spring} from 'react-motion'

const Examples = React.createClass({
  render: function() {
    const state = store.getState()
    const examples = state.examples.map(o => (
      <ul key={o.category} className='m-container'>
        <h4 className='m-category'>{o.category}</h4>
        {o.examples.map((t, i) => (
          <li key={t._id}>
            {i > 0 && <hr className='m-border' />}
            <Link className='m-example' to={`/examples/${t._id}`} >
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    ))

    return (
      <div className='page page-examples'>
        <nav className='m-nav'>
          <h3 className='title'>Geeklish</h3>
        </nav>
        <section>
          {examples}
        </section>
      </div>
    )
  }
})

export default Examples