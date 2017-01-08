import React from 'react'
import { store } from '../../../index.js'
import { showOptions } from '../../../shared/actions'
import { Children, Label, ChildrenDetail } from './Tree'

export const Sentence = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.pos === 'Sentence')
    const attrs = ['clause']

    return (
      <ul className='m-ul'>
        <li>
          <div className='m-tree-box basic'>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>Sentence</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words} />
        </li>
      </ul>
    )
  },
})

export const SentenceDetail = React.createClass({
  render: function() {
    const state = store.getState()
    const {element, parent, role} = this.props
    const attrs = ['clause']
    return (
      <div>
        <Label parent={parent} role={role} />
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
      </div>
    )
  },
})
