import React from 'react'
import { store } from '../../index.js'

import Examples from './Examples'
import Canvas from './Canvas'

import '../css/main.css'

function getChildren(state, route) {
  if (route === 'examples') {
    return <Examples />
  }
  if (route === 'canvas') {
    return <Canvas />
  }
}

const Controller = React.createClass({
	getInitialState() {
		return {
			show: true,
			style: {
				previous: {
					opacity: 0,
					transition: 'all 2s ease',
				},
				current: {
					opacity: 1,
					transition: 'all 2s ease',
				}
			}
		}
	},
	componentWillReceiveProps(newProps) { //check for the mounted props
		console.log(newProps)
	  if(newProps.route !== newProps.previous)
	  	setTimeout(this.animate, 20)
	    // return this.unMountStyle() //call outro animation when mounted prop is false
		  // this.setState({ //remount the node when the mounted prop is true
		  //   show: true
		  // })
	  // setTimeout(this.animate, 20) //call the into animiation
	},

	animate() {
		console.log('animating')
		// this.setState({
		// 	style: {
		// 		previous: {
		// 			opacity: 0,
		// 			transition: 'all 2s ease',
		// 		},
		// 		current: {
		// 			opacity: 1,
		// 			transition: 'all 2s ease',
		// 		}
		// 	}
		// })
	},
	// unMountStyle() { //css for unmount animation
	// 	console.log('unMountStyle')
	//   this.setState({
	//     style: {
	//       opacity: 0,
	//       transition: 'all 2s ease',
	//     }
	//   })
	// },
	// mountStyle() { // css for mount animation
	// 	console.log('mountStyle')
	//   this.setState({
	//     style: {
	//       opacity: 1,
	//       transition: 'all 2s ease',
	//     }
	//   })
	// },
	// componentDidMount(){
	//   setTimeout(this.mountStyle, 20) //call the into animiation
	// },
	transitionEnd(route){
		console.log('transitionEnd')
	  if(this.props.previous === route){ //remove the node on transition end when the mounted prop is false
	    this.setState({
	    	show: false,
	      // style: {
	      // 	previous: {
	      // 		opacity: 0,
	      // 		transition: 'all 2s ease',
	      // 	},
	      // 	current: {
	      // 		opacity: 1,
	      // 		transition: 'all 2s ease',
	      // 	}
	      // }
	    })
	  }
	},

	render() {
		const {show, style} = this.state
		const {route, previous} = this.props

		console.log(show)

	  // const examples = (route === 'examples' || (previous === 'examples' && show)) && 
	  // 								 <Examples style={style} onTransitionEnd={this.transitionEnd} />
	  const examples = route === 'examples' ?
	  								 <Examples style={style.current} onTransitionEnd={this.transitionEnd} />
	  								 : previous === 'examples' && show &&
	  								 <Examples style={style.previous} onTransitionEnd={this.transitionEnd} /> 

	 const canvas = route === 'canvas' ?
	 								 <Canvas style={style.current} onTransitionEnd={this.transitionEnd} />
	 								 : previous === 'canvas' && show &&
	 								 <Canvas style={style.previous} onTransitionEnd={this.transitionEnd} />

	 // const canvas = <Canvas style={style.previous} onTransitionEnd={this.transitionEnd} />

	  return (
	  	<div className='hello'>
	  		{examples}
	  		{canvas}
	  	</div>
	  )

	  
	}
})

export default Controller