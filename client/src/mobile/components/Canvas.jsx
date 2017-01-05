import React from 'react'
import { store } from '../../index.js'
import { Link } from '../kenzo-router'
import { endTransition } from '../../shared/actions'

import Output from './Output.jsx'
import pos_components from './pos/pos_components.jsx'

const e = React.createElement

const TICK = 17

const Canvas = React.createClass({
  getInitialState() {
    return {
      className: 'forward-enter'
    }
  },
  componentWillReceiveProps(newProps) { 
    if (newProps.animation === 'out') {
      this.unMountStyle()
    }
    else if (newProps.animation === 'in') {
      setTimeout(this.mountStyle, 10)
    }
    else {
      this.setState({className: ''})
    }
  },
  unMountStyle() {
    console.log('unmount')
    this.setState({className: 'backward-leave'})
    // debugger
    setTimeout(() => this.setState({
      className: 'backward-leave backward-leave-active'
    }), TICK)

  },
  mountStyle() {
    console.log('mount')
    // this.setState({
    //   className: 'forward-enter'
    // })
    this.setState({className: 'forward-enter forward-enter-active'})
    // setTimeout(() => this.setState({
    //   className: 'forward-enter forward-enter-active'
    // }), TICK)
  },
  componentDidMount(){
    if (this.props.animation === 'in') {
      setTimeout(this.mountStyle, 10)    
    }
  },
  transitionEnd(){
    console.log('transitionEnd')
    if(this.props.animation === 'in') {
      store.dispatch(endTransition('canvas'))
      // this.setState({className: ''})
      // this.setState({className: 'backward-leave'})
    }
  },

  render: function() {
    return (
      <div className={`page page-canvas ${this.state.className}`}
           onTransitionEnd={this.transitionEnd}>
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
    )
  }
})

export default Canvas