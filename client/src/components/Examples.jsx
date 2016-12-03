import React from 'react'
// import store from '../store.js'
import { Link } from 'react-router'
import { exampleOutputs } from '../examples'

const Examples = React.createClass({
  render: function() {
    // const state = store.getState()
    const examples = exampleOutputs.map(o => (
      <li key={o.index} className='example'>
        <Link to={`/examples/${o.index}`} activeClassName="active-link">{o.output}</Link>
      </li>
    ))

    return (
      <ul className='list-group'>
        {examples}
      </ul>
    )
  }
})

export default Examples