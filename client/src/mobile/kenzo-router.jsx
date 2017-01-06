import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { store } from '../index.js'
import Client from '../Client'
import { routeSentences, routeCanvas, routeDetail } from '../shared/actions'

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
  const previous = action === undefined ? null : location.state.previous

  if (path === 'examples') {
    if (sessionStorage.examples) {
      const data = JSON.parse(sessionStorage.examples)
      store.dispatch(routeSentences(data, previous, routeAction))
    } else {
      Client.getProjects(data => {
        store.dispatch(routeSentences(data, previous, routeAction))
      })
    }
  }
  else if (path === 'canvas') {
    const _id = pathList[1]
    if (sessionStorage.canvas) {
      const data = JSON.parse(sessionStorage.canvas)
      store.dispatch(routeCanvas(_id, data, previous, routeAction))
    } else {
      Client.getProject(_id, (data) => {
        store.dispatch(routeCanvas(_id, data, previous, routeAction))
      })
    }
  }
  // else if (path === 'detail') {
  //   const _id = pathList[1]
  //   // Assume words are cached in session.
  //   const words = JSON.parse(sessionStorage.canvas)
  //   store.dispatch(routeDetail(_id, words))
  // }
}

const isLeftClickEvent = (e) => e.button === 0
const isModifiedEvent = (e) => !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)

export const Link = React.createClass({
  handleClick: function(event) {
    if (event.defaultPrevented || isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return
    }
    event.preventDefault()
    
    const pathList = getPathList(mobileHistory.location, mobileHistory.action)
    const path = pathList[0] || rootPath
    console.log(path)
    const {back, parent, role} = this.props

    mobileHistory.push(this.props.to, {
      back: back,
      // parent: parent,
      // role: role,
      previous: path
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

// export const BackButton = React.createClass({
//   handleClick: function(event) {
//     mobileHistory.goBack()
//   },
//   render: function() {
//     let props = Object.assign({}, this.props)
//     props.onClick = this.handleClick

//     return (
//       <span {...props}>{this.props.children}</span>
//     )
//   }
// })
