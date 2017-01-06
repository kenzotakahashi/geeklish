import React from 'react'
import { store } from '../../index.js'
import { Link } from '../kenzo-router'

import Output from './Output.jsx'
import { pos_components } from './pos/pos_components.jsx'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'


const e = React.createElement


const Canvas = React.createClass({
  render: function() {
    const {route, previoues, routeAction} = this.props
    return (
      <ReactCSSTransitionGroup
        transitionName={routeAction}
        transitionEnterTimeout={3000}
        transitionLeaveTimeout={3000}>
        
        {route && (
          <div className='page page-canvas' key='examples'>
            <nav className='m-nav'>
              <Link to='/examples' back={true} className='m-back'>
                <span className='back-arrow'></span>
              </Link>
              <h3 className='title'>{store.getState().title}</h3>
            </nav>
            <section>
              <Output />
              {e(pos_components.Sentence)}
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
        )}        
      </ReactCSSTransitionGroup>
    )
  }
})

export default Canvas