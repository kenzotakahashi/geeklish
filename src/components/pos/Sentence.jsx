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
      e('div', {
        className: `list-group-item ${state.target === w ? 'active' : 'list-group-item-info'}`,
        key: w,
        onClick: () => store.dispatch(showWordFactory(word.id, w))
      }, w)

    return (
      <div className='list-group'>
        <div>
          <span className='word'>Sentence</span>
        </div>
        <div>
          {option}
        </div>
      </div>
    )
  },
})

export default Sentence