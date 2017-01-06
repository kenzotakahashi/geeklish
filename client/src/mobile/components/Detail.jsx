import React from 'react'
import { store } from '../../index.js'
import { Link } from '../kenzo-router'

import Output from './Output.jsx'
import { pos_details } from './pos/pos_components.jsx'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const e = React.createElement

const Detail = React.createClass({
  render: function() {
    const {route, previoues, routeAction} = this.props
    let comp = <span></span>
    if (this.props.route) {
      const state = store.getState()
      const parent = state.Words.find(o => o._id === state.parent)

      const c = e(pos_details[state.Words.find(o => o._id === state.activeWord).pos],
             {parent: parent, _id: state.activeWord, role: state.role}
            )

      comp = (
        <div className='page page-detail' key='detail'>
          <nav className='m-nav'>
            <Link to={`/canvas/${state.example}`} back={true} className='m-back'>
              <span className='back-arrow'></span>
            </Link>
            <h3 className='title'>{store.getState().title}</h3>
          </nav>
          <section>
            <Output />
            {c}

            <p>Something</p>
            <p>Something</p>
            <p>Something</p>
          </section>
        </div>
      )
    }

    return (
      <ReactCSSTransitionGroup
        transitionName={routeAction}
        transitionEnterTimeout={3000}
        transitionLeaveTimeout={3000}>
        {comp}      
      </ReactCSSTransitionGroup>
    )
  }
})

export default Detail