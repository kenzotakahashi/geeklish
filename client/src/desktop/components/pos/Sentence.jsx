import React from 'react'
import { store } from '../../../index.js'
import { showOptions } from '../../actions'
import { Children } from './Tree'
// import { getWordDictionary } from '../../wordDictionary'

const Sentence = React.createClass({
  // componentDidMount: function() {
  //   const state = store.getState()
  //   const element = state.Words.find(o => o.pos === 'Sentence')
  //   if (!element.clause) {
  //     getWordDictionary(element, ['clause', null])
  //   }
  // },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.pos === 'Sentence')
    const attrs = ['clause']

    return (
      <ul>
        <li>
          <div className={`tree-box ${element.pos}`}>
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