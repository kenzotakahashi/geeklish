import React from 'react'
import ReactDOM from 'react-dom'
import { store } from '../../index.js'
import { endTransition } from '../../shared/actions'

import { Link } from '../kenzo-router'

// import {TransitionMotion, spring, presets} from 'react-motion'

// .forward-leave {
//   position: fixed;
//   -webkit-transform: translate3d(0, 0, 0);
//   transform: translate3d(0, 0, 0);
// }
// .forward-leave.forward-leave-active {
//   -webkit-transform: translate3d(-30%, 0, 0);
//   transform: translate3d(-30%, 0, 0);
//   transition: all 3000ms ease-out;
// }

const TICK = 17

const Examples = React.createClass({
  getInitialState() {
    return {
      className: ''
    }
  },
  componentWillReceiveProps(newProps) { //check for the mounted props
    if (newProps.animation === 'out') {
      this.unMountStyle() //call outro animation when mounted prop is false
    }
    else if (newProps.animation === 'in') {
      setTimeout(this.mountStyle, 10) //call the into animiation
    }
    else {
      this.setState({className: ''})
    }
  },
  unMountStyle() {
    console.log('unmount')
    this.setState({className: 'forward-leave forward-leave-active'})
    // this.setState({
    //   style: {
    //     position: 'fixed',
    //     WebkitTransform: 'translate3d(-30%, 0, 0)',
    //     transform: 'translate3d(-30%, 0, 0)',
    //     transition: 'all 3s ease',
    //   }
    // })
  },
  mountStyle() {
    console.log('mount')
    console.log(this.state)
    this.setState({className: 'backward-enter'})
    setTimeout(() => this.setState({
      className: 'backward-enter backward-enter-active'
    }), TICK)
    // this.setState({
    //   style: {
    //     position: 'fixed',
    //     WebkitTransform: 'translate3d(0, 0, 0)',
    //     transform: 'translate3d(0, 0, 0)',
    //     transition: 'all 3s ease',
    //   }
    // })
  },
  componentDidMount(){
    console.log('componentDidMount')
    console.log(this.state)
    if (this.props.animation === 'in') {
      setTimeout(this.mountStyle, 10)   
    }
  },
  transitionEnd(){
    console.log(this.props.animation)
    if(this.props.animation === 'in') {
      store.dispatch(endTransition('examples'))   
      // this.setState({className: ''})
    }
  },
  render: function() {
    const state = store.getState()
    const examples = state.examples.map(o => (
      <ul key={o.category} className='m-container'>
        <h4 className='m-category'>{o.category}</h4>
        {o.examples.map((t, i) => (
          <li key={t._id}>
            {i > 0 && <hr className='m-border' />}
            <Link className='m-example' to={`/canvas/${t._id}`} >
              {t.title}
            </Link>
          </li>
        ))}
      </ul>
    ))
    return (
      <div className={`page page-examples ${this.state.className}`} onTransitionEnd={this.transitionEnd}>
        <nav className='m-nav'>
          <h3 className='title'>Geeklish</h3>
        </nav>
        <section>
          {examples}
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

export default Examples