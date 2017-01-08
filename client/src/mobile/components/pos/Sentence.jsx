import React from 'react'
import { store } from '../../../index.js'
import { showOptions } from '../../../shared/actions'
import { Children, Label, ChildrenDetail } from './Tree'
import { showDetail } from '../../../shared/actions'

export const Sentence = React.createClass({
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.pos === 'Sentence')
    const attrs = ['clause']

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`m-tree-box ${element.pos}`}
               onClick={() => store.dispatch(showDetail(element._id,'forward'))}>
            <span className='word'>Sentence</span>
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
    const { element } = this.props
    const attrs = ['clause']
    return (
      <div>
        <ChildrenDetail element={element} attrs={attrs} words={state.Words} />
      </div>
    )
  },
})
