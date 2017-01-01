import React from 'react'
import { store } from '../../../index.js'
import { Children } from './Tree'
import { showOptions, changeAttribute } from '../../../shared/actions'

const Pronoun = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props._id, 'form', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o._id === this.props._id)
    const attrs = ['adjectives','prepositions']

    // const forms = ['nominative','accusative','possessive pronoun','reflexive'].map(o => (
    //   <option key={o} value={o}>{o}</option>
    // ))

    // const formSelect = element.word.reflexive && this.props.parent.pos !== 'Possessive' && (
    //   <span className="select is-small">
    //     <select value={element.form} onChange={this.handleChange}>{forms}</select>
    //   </span>
    // )

    return (
      <ul className='m-ul'>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element._id))}>{element.word[element.form]}</span>
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />

        </li>
      </ul>
    )
  },
})

export default Pronoun