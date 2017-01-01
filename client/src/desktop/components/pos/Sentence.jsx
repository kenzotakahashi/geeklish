import React from 'react'
import { store } from '../../../index.js'
import { showOptions } from '../../../shared/actions'
import { Children } from './Tree'

const Sentence = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.pos === 'Sentence')
    const attrs = ['clause']

    return (
      <ul className='desktop-ul'>
        <li>
          <div className={`tree-box basic ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Sentence</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    )
  },
})

export default Sentence