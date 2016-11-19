import React from 'react'
import store from '../../store.js'
import pos_components from './pos_components'
import { showWordFactory } from '../../actions'

const e = React.createElement

const Sentence = React.createClass({
  render: function() {
    const state = store.getState()
    const word = state.Words.find(o => o.pos === 'Sentence')

    const w ='clause'
    const option = !!word[w] ?
      e(pos_components[state.Words.find(o => o.id === word[w]).pos], {id: word[w]}) :
      e('li', {
        className: `tree ${state.target === w ? 'active' : 'list-group-item-info2'}`,
        key: w,
        onClick: () => store.dispatch(showWordFactory(word.id, w))
      }, w)

    return (
      <ul className='list-group2'>
        <li>
          <div className='tree-box'>
            <span className='word'>Sentence</span>
          </div>
          <ul>
            {option}
          </ul>
        </li>
      </ul>
    )
  },
})

export default Sentence