import React from 'react'
import { store } from '../../index.js'
import { changeAttribute, showDetail } from '../../shared/actions'

import Output from './Output'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const handleModal = (text) => text === 'No modal' ? '' : text

const Option = React.createClass({
  render: function() {
    const {route, routeAction} = this.props
    let comp = ''
    if (route) {
      const state = store.getState()
      const element = state.Words.find(o => o._id === state.activeWord)
      const option = state.option
      const choice = option.choice.map((o, i) => (
        <li key={i}>
          <hr className={`m-border${i === 0 ? '-edge' : ''}`} />
          <span className='m-list back-white pointer' onClick={() => store.dispatch(changeAttribute(
            state.activeWord, option.attr, handleModal(o)
          ))}>
            <span>{o}</span>
            {element[option.attr] === handleModal(o) &&
             (<span className='m-list-right m-check'></span>)}
          </span>
        </li>
      ))

      comp = (
        <div className='page page-option' key='option'>
          <nav className='m-nav'>
            <span className='m-nav-left' onClick={() => store.dispatch(
              showDetail(element._id,'backward')
            )}>
              <span className='back-arrow'></span>
            </span>
            <h4 className='title'>{option.label}</h4>
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
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}>
        {comp}     
      </ReactCSSTransitionGroup>
    )
  }
})

export default Option