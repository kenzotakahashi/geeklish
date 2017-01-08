import React from 'react'
import { store } from '../../index.js'
import { Link } from '../kenzo-router'

import Output from './Output.jsx'
import { posDetails } from './pos/pos_components.jsx'
import { getLabel } from '../../shared/others'
import { wordColor } from '../../shared/style'

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

      const style = {
        position: 'fixed',
        top: '0',
        right: '10px',
        padding: '18px',
        color: wordColor(element),
        fontSize: '12px'
      }

      comp = (
        <div className='page page-detail' key='detail'>
          <nav className='m-nav'>
            <Link to={`/canvas/${state.example}`} back={true} className='m-nav-left'>
              <span className='back-arrow'></span>
            </Link>
            <h4 className='title'>{getLabel(element, parent)}</h4>
            <span style={style}>
              <span>{element.pos}</span>
            </span>
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
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}>
        {comp}      
      </ReactCSSTransitionGroup>
    )
  }
})

export default Detail