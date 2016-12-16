import React from 'react'
import store from '../store.js'

import Canvas from './Canvas.jsx'

import { initialState } from '../examples'
import { history, Link } from './kenzo-router'

const Projects = React.createClass({
  onInputChange: function(e) {
    store.dispatch({
      type: 'UPDATE_TITLE',
      title: e.target.value
    })
  },
  saveSentence: function(state, isNew=false) {
    store.dispatch({
      type: 'SAVE_SENTENCE',
      state,
      isNew
    })
    if (isNew) history.push(`/projects/${store.getState().projects[0].id}`)
  },
  onFormSubmit(e) {
    e.preventDefault()
    this.saveSentence(store.getState())
  },
  deleteProject: function() {
    store.dispatch({
      type: 'DELETE_PROJECT'
    })
    const projects = store.getState().projects
    history.push(`/projects/${projects.length > 0 ? projects[0].id : ''}`)
  },
  render: function() {
    const state = store.getState()

    const projects = state.projects.map(o => (
      <li key={o.id} className='example'>
        <Link to={`/projects/${o.id}`}>{o.title}</Link>
      </li>
    ))

    return (
      <div className='container small-font'>

        {state.example !== undefined &&
        <form className="form-inline project-form" onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <input
              placeholder='title'
              className="form-control title-form"
              type='text'
              value={state.title}
              onChange={this.onInputChange}
            />
          </div>
          <button type="submit" className="btn btn-default">
            Save
          </button>
          <button type="button" className="btn btn-default"
                 onClick={() => this.deleteProject()}>
           <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
          </button>
        </form>}

        <div className='row'>
          <div className='col-md-2'>
            <div className='main-box'>
              <ul className='list-group'>              
                <button type="button" className="btn btn-default btn-block"
                        onClick={() => this.saveSentence(initialState, true)}>
                  New Project
                </button>
                {projects}
              </ul>
            </div>
          </div>
          <div className='col-md-10'>
            {projects.length > 0 && <Canvas />}
          </div>
        </div>
      </div>
    )
  }
})

export default Projects