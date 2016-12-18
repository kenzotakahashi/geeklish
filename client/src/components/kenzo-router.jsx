import React from 'react'
import createHistory from 'history/createBrowserHistory'
import store from '../store.js'
import { exampleWords, initialState } from '../examples'

export const history = createHistory()

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
      state = initialState
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
    store.dispatch({
      type: 'ROUTE_EXAMPLES',
      words: !!_id ? exampleWords[parseInt(_id, 10)] : initialState.Words
    }) 
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




function isLeftClickEvent(event) {
  return event.button === 0
}

function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey)
}

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
