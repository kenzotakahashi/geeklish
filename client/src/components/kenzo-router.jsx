import React from 'react'
import createHistory from 'history/createBrowserHistory'
import store from '../store.js'
import { initialState } from '../examples'
import Client from '../Client'
import { routeExample } from '../actions'

export const history = createHistory()

function dispatchExamples(_id, examples) {
  if (!!_id) {
    Client.getProject(_id, (data) => {
      store.dispatch(routeExample(examples, data.result))
    })
  }
  else {
    store.dispatch(routeExample(examples, initialState().Words))
  }
}

function handleNavigation(location, action) {
  // console.log(action, location.pathname, location.state)
  const pathList = location.pathname.split('/').filter(o => o !== '')
  const path = pathList[0] || 'examples'

  if (path === 'projects') {
    const _id = pathList[1]
    let state, title
    if (!!_id) {
      const data = JSON.parse(sessionStorage[`project_${_id}`])
      title = data.title
      state = data.state
    }
    else {
      title = ''
      state = initialState()
    }
    store.dispatch({
      type: 'ROUTE_PROJECTS',
      _id: _id,
      title: title,
      state: state,
      projects: sessionStorage.projects ? JSON.parse(sessionStorage.projects) : []
    })
  }
  else if (path === 'examples') {
    const _id = pathList[1]
    if (sessionStorage.examples) {
      const data = JSON.parse(sessionStorage.examples)
      dispatchExamples(_id, data)
    } else {
      Client.getProjects(data => {
        dispatchExamples(_id, data)
      })
    }
  }
  else if (path === 'guide') {
    store.dispatch({type: 'ROUTE_GUIDE'})
  }
  else if (path === 'admin') {
    store.dispatch({type: 'ROUTE_ADMIN'})
  }
}

// Handle the initial location
handleNavigation(history.location)
history.listen(handleNavigation)


const isLeftClickEvent = (e) => e.button === 0
const isModifiedEvent = (e) => !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)

export const Link = React.createClass({
  handleClick: function(event) {
    if (event.defaultPrevented || isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return
    }
    event.preventDefault()
    history.push(this.props.to)
  },

  render: function() {
    let props = Object.assign({}, this.props)
    props.onClick = this.handleClick
    props.href = this.props.to

    return (
      <a {...props}>{this.props.children}</a>
    )
  }
})