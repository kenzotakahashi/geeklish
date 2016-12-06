import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
// import { connect, Provider } from 'react-redux'

import App from './components/App'
import Examples from './components/Examples'
import Projects from './components/Projects'
import Guide from './components/Guide'
import Admin from './components/Admin'

import 'bulma/css/bulma.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap-theme.css'

import './css/index.css'
import './css/main.css'

ReactDOM.render((
	<Router history={browserHistory}>
	  <Route path="/" component={App}>
	  	<IndexRoute component={Examples}/>
  		<Route path="/examples" component={Examples}/>
  		<Route path="/examples/:id" component={Examples}/>
  		<Route path="/projects" component={Projects} />
  		<Route path="/projects/:id" component={Projects}/>
  		<Route path="/guide" component={Guide} />
			<Route path="/admin" component={Admin}/>
	  </Route>
	</Router>
), document.getElementById('root'))
