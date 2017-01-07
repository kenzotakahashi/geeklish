import React from 'react'
import { store } from '../../index.js'
import { Link } from '../kenzo-router'

import Output from './Output.jsx'
import { posDetails } from './pos/pos_components.jsx'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const e = React.createElement

const Detail = React.createClass({
  render: function() {
    const {route, routeAction} = this.props
    let comp = ''
    if (route) {
      const state = store.getState()
      const element = state.Words.find(o => o._id === state.activeWord)
      // const parent = state.Words.find(o => o._id === state.parent)

      comp = (
        <div className='page page-detail' key='detail'>
          <nav className='m-nav'>
            <Link to={`/canvas/${state.example}`} back={true} className='m-back'>
              <span className='back-arrow'></span>
            </Link>
            <h3 className='title'>{state.title}</h3>
          </nav>
          <section>
            <Output />
            {e(posDetails[element.pos],
             {parent: state.parent, element: element, role: state.role}
            )}
          </section>
        </div>
      )
    }

    return (
      <ReactCSSTransitionGroup
        transitionName={routeAction}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}>
        {comp}      
      </ReactCSSTransitionGroup>
    )
  }
})

export default Detail