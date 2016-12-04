import React from 'react'
import store from '../store.js'

import Canvas from './Canvas.jsx'

import { initialState } from '../examples'
import { browserHistory, Link } from 'react-router'

const Projects = React.createClass({
  getInitialState: function () {
    return {
      field: 'Untitled',
    }
  },
  onInputChange: function(e) {
    this.setState({
      field: e.target.value,
    })
  },
  onFormSubmit(e) {
    e.preventDefault()
    const title = this.state.field
    const id = this.props.params.id
    store.dispatch({
      type: 'SAVE_SENTENCE',
      title: title,
      state: store.getState(),
      id: id
    })
    if (!id) browserHistory.push(`/projects/${store.getState().projects[0].id}`)
  },
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate())
    this.checkRoute()
  },
  componentDidUpdate: function() {
    this.checkRoute()
  },
  changeExample: function(state) {
    store.dispatch({
      type: 'CHANGE_EXAMPLE',
      state
    }) 
  },
  checkRoute: function() {
    const state = store.getState()
    const id = this.props.params.id
    // Switch to different project
    if (id !== undefined && id !== state.example) {
      const data = JSON.parse(localStorage[`project_${id}`])
      this.changeExample(data.state)
      this.setState({
        field: data.title,
      })
    // Switch to 'new'
    } else if (id === undefined && state.example !== null) {
      this.changeExample(initialState)
      this.setState({
        field: 'Untitled',
      })
    }
    // Do nothing 
  },
  deleteProject: function(id) {
    browserHistory.push('/projects')
    store.dispatch({
      type: 'DELETE_PROJECT',
      id
    }) 
  },

  render: function() {
    const state = store.getState()

    const projects = state.projects.map(o => (
      <li key={o.id} className='example'>
        <Link to={`/projects/${o.id}`} activeClassName="active-link">{o.title}</Link>
      </li>
    ))

    const deleteButton = this.props.params.id !== undefined && (
      <button type="button" className="btn btn-default"
             onClick={() => this.deleteProject(this.props.params.id)}>
       <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
      </button>
    )

    return (
      <div className='container small-font'>

        <form className="form-inline project-form" onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <input
              placeholder='name'
              className="form-control"
              type='text'
              value={this.state.field}
              onChange={this.onInputChange}
            />
          </div>
          <button type="submit" className="btn btn-default">
            Save
          </button>
          {deleteButton}
        </form>

        <div className='row'>
          <div className='col-md-2'>
            <div className='main-box'>
              <ul className='list-group'>
                <button type="button" className="btn btn-default btn-block">
                  <Link to='/projects'>New Project</Link>
                </button>
                {projects}
              </ul>
            </div>
          </div>
          <div className='col-md-10'>
            <Canvas />
          </div>
        </div>
      </div>
    )
  }
})

export default Projects