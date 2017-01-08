import React from 'react'
import { store } from '../../index.js'

import { Link } from '../kenzo-router'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
// import {TransitionMotion, spring, presets} from 'react-motion'

const Examples = React.createClass({
  render: function() {
    const {route, routeAction} = this.props
    const state = store.getState()
    const examples = state.examples.map(o => (
      <ul key={o.category} className='m-container'>
        <h4 className='m-category'>{o.category}</h4>
        {o.examples.map((t, i) => (
          <li key={t._id}>
            {i > 0 && <hr className='m-border' />}
            <Link className='m-list' to={`/canvas/${t._id}`} >
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    ))
    return (
      <ReactCSSTransitionGroup
        transitionName={routeAction}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}>
        {route && (
          <div className='page page-examples'>
            <nav className='m-nav'>
              <h4 className='title'>Geeklish</h4>
            </nav>
            <section>
              {examples}
            </section>
          </div>
        )}
      </ReactCSSTransitionGroup>
    )

  }
})

export default Examples