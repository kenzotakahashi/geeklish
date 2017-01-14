import React from 'react'
import { store } from '../../index.js'
import { showDetail, createNewWord } from '../../shared/actions'

import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const WordFactory = React.createClass({
  getInitialState: function () {
    return {
      field: '',
      dictionary: this.props.dictionary
    }
  },
  componentWillReceiveProps(update) {
    this.setState({dictionary: update.dictionary})
  },
  onInputChange: function(e) {
    this.setState({
      field: e.target.value,
      dictionary: this.props.dictionary.filter(o => 
            o.base.toLowerCase().includes(e.target.value.toLowerCase()))
    })
  },
  render: function() {
    const {route, routeAction} = this.props
    let comp = ''
    if (route) {
      const state = store.getState()

      const wordList = this.state.dictionary.map(o => (
        <li key={o._id} className={`m-dictionary ${o.pos}`}
            onClick={() => store.dispatch(createNewWord(o, state.activeWord, state.target))}>
            {o.base}
        </li>
      ))

      comp = (
        <div className='page page-option' key='option'>
          <nav className='m-nav'>
            <input
              className='m-input'
              placeholder='search'
              type='search'
              value={state.search}
              onChange={this.onInputChange}
            />
            <span className='m-nav-right' onClick={() => store.dispatch(
              showDetail(state.activeWord,'slidedown')
            )}>
              <span>Cancel</span>
            </span>
          </nav>
          <section>
            {wordList}
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

export default WordFactory