import React from 'react'
import { store } from '../../index.js'
import { Link } from '../kenzo-router'
import { switchCanvas } from '../../shared/actions'

import Output from './Output.jsx'
import { pos_components } from './pos/pos_components.jsx'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const e = React.createElement

const cutTitle = (title) => {
  if (title.length <= 30) return title
  let newTitle = ''
  for (let word of title.split(' ')) {
    newTitle = `${newTitle} ${word}`
    if (newTitle.length > 25) {
      return `${newTitle}...`
    }
  }
}

const titleStyle = {
  paddingTop: '17px'
}

const Canvas = React.createClass({
  render: function() {
    const {route, routeAction} = this.props
    const state = store.getState()
    return (
      <ReactCSSTransitionGroup
        transitionName={routeAction}
        transitionEnterTimeout={250}
        transitionLeaveTimeout={250}>
        
        {route && (
          <div className='page page-canvas' key='examples'>
            <nav className='m-nav'>
              <Link to='/examples' back={true} className='m-nav-left'>
                <span className='back-arrow'></span>
              </Link>
              <h5 className='title' style={titleStyle}>
                {cutTitle(store.getState().title)}
              </h5>
              <span className='m-nav-right' onClick={() => store.dispatch(switchCanvas())}>
                {state.isAnswer ? 'Back' : 'Answer'}
              </span>
            </nav>
            <section>
              <Output />
              {e(pos_components.Sentence)}
            </section>
          </div>
        )}        
      </ReactCSSTransitionGroup>
    )
  }
})

export default Canvas