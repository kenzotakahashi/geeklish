import React from 'react'
import store from '../store.js'

import Canvas from './Canvas.jsx'

import { initialState } from '../examples'
import { history, Link } from './kenzo-router'

const Projects = React.createClass({
  // getInitialState: function () {
  //   return {
  //     field: 'Untitled',
  //   }
  // },
  onInputChange: function(e) {
    store.dispatch({
      type: 'UPDATE_TITLE',
      title: e.target.value
    })
    // this.setState({
    //   field: e.target.value,
    // })
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
  // componentDidMount: function () {
  //   this.checkRoute()
  // },
  // componentDidUpdate: function() {
  //   this.checkRoute()
  // },
  // changeExample: function(state) {
  //   store.dispatch({
  //     type: 'CHANGE_EXAMPLE',
  //     state
  //   })
  // },
  // checkRoute: function() {
  //   const state = store.getState()
  //   const id = this.props.id
  //   console.log(id)
  //   console.log(state.example)
  //   // Switch to different project
  //   if (id !== undefined && id !== state.example) {
  //     console.log('different')
  //     const data = JSON.parse(sessionStorage[`project_${id}`])
  //     this.setState({
  //       field: data.title,
  //     })
  //   }
  //   // Switch to 'new'
  //   // else if (id === undefined && state.example !== null) {
  //   //   this.setState({
  //   //     field: 'Untitled',
  //   //   })
  //   // }
  //   // Do nothing 
  // },
  deleteProject: function(id) {
    store.dispatch({
      type: 'DELETE_PROJECT',
      id
    })
    const projects = store.getState().projects
    if (projects.length > 0) {
      history.push(`/projects/${projects[0].id}`)
    } else {
      this.setState({
        field: 'Untitled'
      })
      history.push('/projects')
    }
  },
  render: function() {
    const state = store.getState()

    const projects = state.projects.map(o => (
      <li key={o.id} className='example'>
        <Link to={`/projects/${o.id}`}>{o.title}</Link>
      </li>
    ))

    const deleteButton = this.props.id !== undefined && (
      <button type="button" className="btn btn-default"
             onClick={() => this.deleteProject(state.example)}>
       <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
      </button>
    )

    return (
      <div className='container small-font'>

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
          {deleteButton}
        </form>

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