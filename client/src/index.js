import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import App from './components/App'
import Canvas from './components/Canvas'

import 'bulma/css/bulma.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'
// import 'uikit/dist/css/uikit.css'

import './index.css'

ReactDOM.render((
	<Router history={browserHistory}>
	  <Route path="/" component={App}>
	  	<IndexRoute component={Canvas}/>
	  </Route>
	</Router>
), document.getElementById('root'))
