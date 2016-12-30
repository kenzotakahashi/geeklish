import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
// import { Provider } from 'react-redux'
import 'whatwg-fetch'
// import { history } from './desktop/kenzo-router.jsx'

// ================ Desktop ===================
import DesktopApp from './desktop/components/App'
import { desktopInitialState } from './desktop/examples'
import { desktopHandleNavigation, history } from './desktop/kenzo-router'
import desktopReducer from './desktop/reducers/reducer.js'

// =============== Mobile =====================

const isDesktop = window.matchMedia("(min-width: 500px)").matches;

const [reducer, initialState] = isDesktop ?
																[desktopReducer, desktopInitialState()] : 
																[desktopReducer, desktopInitialState()]

export const store = createStore(reducer, initialState)
// console.log('store')

if (isDesktop) {
  ReactDOM.render((
  	<DesktopApp />
  ), document.getElementById('root'))
	desktopHandleNavigation(history.location)
}
else {
}
