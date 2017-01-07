import React from 'react'
import { store } from '../../index.js'
import { Link } from '../kenzo-router'
import { changeAttribute, showDetail } from '../../shared/actions'

import { pos_components } from './pos/pos_components.jsx'

import Output from './Output'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const e = React.createElement

const Option = React.createClass({
  render: function() {
    const {route, routeAction} = this.props
    let comp = ''
    if (route) {
      const state = store.getState()
      const element = state.Words.find(o => o._id === state.activeWord)
      const option = state.option
      const choice = option.choice.map((o, i) => (
        <li key={o}>
          <hr className={`m-border${i === 0 ? '-edge' : ''}`} />
          <span className='m-list' onClick={() => store.dispatch(changeAttribute(
            state.activeWord, option.attr, o  
          ))}>
            <span>{o}</span>{element[option.attr] === o && (<span className='m-list-right'>!</span>)}
          </span>
        </li>
      ))

      comp = (
        <div className='page page-option' key='option'>
          <nav className='m-nav'>
            <Link to='/examples' back={true} className='m-back'>
              <span className='back-arrow'></span>
            </Link>
            <span className='m-back' onClick={() => store.dispatch(
              showDetail(element._id,'backward')
            )}>
              <span className='back-arrow'></span>
            </span>
            <h3 className='title'>{option.label}</h3>
          </nav>
          <section>
            <Output />

            <ul className='m-container'>
              {choice}
              <hr className='m-border-edge' />
            </ul>
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

export default Option