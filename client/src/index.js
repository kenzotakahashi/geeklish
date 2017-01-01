import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
// import { Provider } from 'react-redux'
import 'whatwg-fetch'
// import { history } from './desktop/kenzo-router.jsx'

// ================ Desktop ===================
import DesktopApp from './desktop/components/App'
import { desktopInitialState } from './desktop/examples'
import { desktopHandleNavigation, desktopHistory } from './desktop/kenzo-router'
import desktopReducer from './desktop/reducers/reducer.js'

// =============== Mobile =====================

import MobileApp from './mobile/components/App'
import { mobileInitialState } from './mobile/initialState'
import { mobileHandleNavigation, mobileHistory } from './mobile/kenzo-router'
import mobileReducer from './mobile/reducers/reducer.js'

// ===========================================

const isDesktop = window.matchMedia("(min-width: 800px)").matches;

const [reducer, initialState] = isDesktop ?
																[desktopReducer, desktopInitialState()] : 
																[mobileReducer, mobileInitialState()]

export const store = createStore(reducer, initialState)
// console.log('store')

if (isDesktop) {
  ReactDOM.render((
  	<DesktopApp />
  ), document.getElementById('root'))
	desktopHandleNavigation(desktopHistory.location)
  desktopHistory.listen(desktopHandleNavigation)
}
else {
  ReactDOM.render((
  	<MobileApp />
  ), document.getElementById('root'))
	mobileHandleNavigation(mobileHistory.location)
  mobileHistory.listen(mobileHandleNavigation)
}
