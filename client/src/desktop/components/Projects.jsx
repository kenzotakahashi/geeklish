import React from 'react'
import { store } from '../../index.js'
import Client from '../../Client'

import Canvas from './Canvas.jsx'

import { desktopInitialState } from '../examples'
import { history, Link } from '../kenzo-router'

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
    if (process.env.NODE_ENV === 'development') {
      const newState = store.getState()
      Client.postProject({
        project: {
          _id: newState.example,
          title: newState.title,
          category: '',          
        },
        words: newState.Words
      })
    }
    if (isNew) history.push(`/projects/${store.getState().projects[0]._id}`)
  },
  onFormSubmit: function(e) {
    e.preventDefault()
    this.saveSentence(store.getState())
  },
  deleteProject: function() {
    store.dispatch({
      type: 'DELETE_PROJECT'
    })
    const projects = store.getState().projects
    history.push(`/projects/${projects.length > 0 ? projects[0]._id : ''}`)
  },
  render: function() {
    const state = store.getState()

    const projects = state.projects.map(o => (
      <li key={o._id} className='example'>
        <Link to={`/projects/${o._id}`}>{o.title}</Link>
      </li>
    ))

    return (
      <div className='small-font'>

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
          <button type="submit" className="button-primary" disabled={state.saved && "disabled"}>
            Save
          </button>
          <button type="button" className="button-error" onClick={() => this.deleteProject()}>
            Delete
          </button>
        </form>}

        <div className='row'>
          <div className='col-xs-2'>
            <div className='main-box'>
              <ul className='fixed-box'>              
                <button type="button" className="btn btn-default btn-block"
                        onClick={() => this.saveSentence(desktopInitialState(), true)}>
                  New Project
                </button>
                {projects}
              </ul>
            </div>
          </div>
          <div className='col-xs-10'>
            {projects.length > 0 && <Canvas />}
          </div>
        </div>
      </div>
    )
  }
})

export default Projects