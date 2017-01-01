import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { store } from '../index.js'
import Client from '../Client'
import { routeSentences, routeCanvas } from '../shared/actions'

export const mobileHistory = createHistory()

const rootPath = 'examples'

export const mobileHandleNavigation = (location, action) => {
  // console.log(action, location.pathname, location.state)
  // If the app is launched from homescreen, naavigate to root.
  const pathList = action === undefined && window.navigator.standalone ?
                   [] : location.pathname.split('/').filter(o => o !== '')
  const path = pathList[0] || rootPath
  const routeAction = !action ? null :
                      location.state.back ? 'POP' : 'PUSH'

  if (path === 'examples') {
    const _id = pathList[1]
    if (!!_id) {
      Client.getProject(_id, (data) => {
        store.dispatch(routeCanvas(data.result, routeAction))
      })
    }
    else {
      if (sessionStorage.examples) {
        const data = JSON.parse(sessionStorage.examples)
        store.dispatch(routeSentences(data, routeAction))
      } else {
        Client.getProjects(data => {
          store.dispatch(routeSentences(data, routeAction))
        })
      }
    }
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
    
    mobileHistory.push(this.props.to, { back: this.props.back })
  },

  render: function() {
    let props = Object.assign({}, this.props)
    props.onClick = this.handleClick
    props.href = this.props.to
    props.className = `m-link ${props.className}`
    delete props.back

    console.log(mobileHistory.length)

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
