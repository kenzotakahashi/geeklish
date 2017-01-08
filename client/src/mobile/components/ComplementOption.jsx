import React from 'react'
import { store } from '../../index.js'
import { setComplement, showDetail } from '../../shared/actions'

import Output from './Output'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const ComplementOption = React.createClass({
  render: function() {
    const {route, routeAction} = this.props
    let comp = ''
    if (route) {
      const state = store.getState()
      const element = state.Words.find(o => o._id === state.activeWord)
      const compIndex = element.complementIndex

      const verbType = !!element.particle ? 
                         state.Words.find(o => o._id === element.particle).word : 'base'

      const option = {
        label: 'Complement',
        choice: element.valid_complements[verbType].map(o => (
          o.length > 0 ? o.join(' ') : 'No complement'
        ))
      }

      const choice = option.choice.map((o, i) => (
        <li key={i}>
          <hr className={`m-border${i === 0 ? '-edge' : ''}`} />
          <span className='m-list' onClick={() => store.dispatch(setComplement(
            element._id, verbType, i
          ))}>
            <span>{o}</span>
            {compIndex === i && (<span className='m-list-right m-check'></span>)}
          </span>
        </li>
      ))

      comp = (
        <div className='page page-option' key='option'>
          <nav className='m-nav'>
            <span className='m-back' onClick={() => store.dispatch(
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

export default ComplementOption