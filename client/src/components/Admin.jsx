import React from 'react'
import store from '../store.js'
import Examples from './Examples'

const Admin = React.createClass({
  render: function() {
    const state = store.getState()
    return (
      <div>
        <div className='container'>
          <button type="button" className="btn btn-default"
                  onClick={() => console.log(JSON.stringify({
                    ...state,
                    activeWord: 1,
                    target: null,
                    dictionary: [],
                    projects: [],
                  }))}>
            Save
          </button>
        </div>
        <Examples />
      </div>
    )
  }
})

export default Admin