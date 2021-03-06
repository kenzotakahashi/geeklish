import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { store } from '../index.js'
import { desktopInitialState } from './examples'
import Client from '../Client'
import { routeExample } from '../shared/actions'
import { removeMetaData } from '../shared/score'

export const desktopHistory = createHistory()

function dispatchExamples(_id, examples) {
  if (!!_id) {
    Client.getProject(_id, (data) => {
      store.dispatch(routeExample(
        examples, data.project.title, removeMetaData(data.words)))
    })
  }
  else {
    store.dispatch(routeExample(
      examples, '', desktopInitialState().Words))
  }
}

export const desktopHandleNavigation = (location, action) => {
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
      state = desktopInitialState()
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

const isLeftClickEvent = (e) => e.button === 0
const isModifiedEvent = (e) => !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)

export const Link = React.createClass({
  handleClick: function(event) {
    if (event.defaultPrevented || isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return
    }
    event.preventDefault()
    desktopHistory.push(this.props.to)
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
