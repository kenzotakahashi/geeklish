import React from 'react'
// import { store } from '../../index.js'

import Output from './Output.jsx'
// import pos_components from './pos/pos_components.jsx'

// const e = React.createElement

// {e(pos_components.Sentence)}

const Canvas = React.createClass({
  render: function() {
    return (
      <div className='main-box'>
        <Output />
        Hello!
      </div>
    )
  }
})

export default Canvas