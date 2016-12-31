import React from 'react'
import createHistory from 'history/createBrowserHistory'
import { store } from '../index.js'
import { mobileInitialState } from './initialState'
import Client from '../Client'
import { routeExample } from '../shared/actions'

export const mobileHistory = createHistory()

function dispatchExamples(_id, examples) {
  if (!!_id) {
    Client.getProject(_id, (data) => {
      store.dispatch(routeExample(examples, data.result))
    })
  }
  else {
    store.dispatch(routeExample(examples, mobileInitialState().Words))
  }
}

export const mobileHandleNavigation = (location, action) => {
  // console.log(action, location.pathname, location.state)
  const pathList = location.pathname.split('/').filter(o => o !== '')
  const path = pathList[0] || 'examples'

  if (path === 'examples') {
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
}

const isLeftClickEvent = (e) => e.button === 0
const isModifiedEvent = (e) => !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)

export const Link = React.createClass({
  handleClick: function(event) {
    if (event.defaultPrevented || isModifiedEvent(event) || !isLeftClickEvent(event)) {
      return
    }
    event.preventDefault()
    mobileHistory.push(this.props.to)
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

mobileHistory.listen(mobileHandleNavigation)