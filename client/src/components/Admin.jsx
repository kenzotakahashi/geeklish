import React from 'react'
import store from '../store.js'
import Examples from './Examples'

const Admin = React.createClass({
  componentDidMount: function () {
    store.subscribe(() => this.forceUpdate())
  },
  saveSentence: function (state) {
    store.dispatch({
      type: 'SAVE_SENTENCE',
      state
    })
  },
  render: function() {
    const state = store.getState()
    return (
      <div>
        <Examples />
        <div className='container'>
          <button type="button" className="btn btn-default"
                  // onClick={() => store.dispatch(this.saveSentence(state))}>
                  onClick={() => console.log(JSON.stringify(state))}>
            Save
          </button>
        </div>
      </div>
    )
  }
})

export default Admin