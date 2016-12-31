import React from 'react'
import { store } from '../../index.js'

import { Link } from '../kenzo-router'

const Examples = React.createClass({
  render: function() {
    const state = store.getState()
    const examples = state.examples.map(o => (
      <ul key={o.category} className=''>
        <h5>{o.category}</h5>
        {o.examples.map(t => (
          <li key={t._id} className='m-example'>
            <Link to={`/examples/${t._id}`} >{t.title}</Link>
          </li>
        ))}
      </ul>
    ))

    return (
      <section>
        {examples}
      </section>
    )
  }
})

export default Examples