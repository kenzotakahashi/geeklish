import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { store } from '../index.js'
import Client from '../Client'
import { routeSentences, routeCanvas } from '../shared/actions'
import { removeMetaData } from '../shared/score'

export const mobileHistory = createHistory()

const rootPath = 'examples'
const standalone = window.navigator.standalone

const getPathList = (location, action) => (
  action === undefined && standalone ?
  [] : location.pathname.split('/').filter(o => o !== '')
)

export const mobileHandleNavigation = (location, action) => {
  // console.log(action, location.pathname, location.state)
  // If the app is launched from homescreen, naavigate to root.
  const pathList = getPathList(location, action)
  const path = pathList[0] || rootPath
  const routeAction = !action ? 'initial' :
                      location.state.back ? 'backward' : 'forward'
  // const previous = action === undefined ? null : location.state.previous

  if (path === 'examples') {
    if (sessionStorage.examples) {
      const data = JSON.parse(sessionStorage.examples)
      store.dispatch(routeSentences(data, routeAction))
    } else {
      Client.getProjects(data => {
        store.dispatch(routeSentences(data, routeAction))
      })
    }
  }
  else if (path === 'canvas') {
    const _id = pathList[1]
    Client.getProject(_id, (data) => {
      const words = removeMetaData(data.words)
      store.dispatch(routeCanvas(_id, data.project.title, words, routeAction))
    })
    // if (sessionStorage.canvas) {
    //   const data = JSON.parse(sessionStorage.canvas)
    //   store.dispatch(routeCanvas(_id, data, routeAction))
    // } else {
    //   Client.getProject(_id, (data) => {
    //     store.dispatch(routeCanvas(_id, data, routeAction))
    //   })
    // }
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
    
    // const pathList = getPathList(mobileHistory.location, mobileHistory.action)
    // const path = pathList[0] || rootPath
    const {back } = this.props

    mobileHistory.push(this.props.to, {
      back: back,
    })
  },

  render: function() {
    let props = Object.assign({}, this.props)
    props.onClick = this.handleClick
    props.href = this.props.to
    props.className = `m-link ${props.className}`
    delete props.back

    // console.log(mobileHistory.length)

    return (
      <a {...props}>{this.props.children}</a>
    )
  }
})
