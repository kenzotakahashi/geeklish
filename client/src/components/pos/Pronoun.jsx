import React from 'react'
import store from '../../store.js'
import { Children, WH, DeleteButton, ConjunctionButton } from './Tree'
import { showOptions, changeAttribute } from '../../actions'

const Pronoun = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props.id, 'form', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    const attrs = ['adjectives','prepositions']

    const forms = ['nominative','accusative','possessive pronoun','reflexive'].map(o => (
      <option key={o} value={o}>{o}</option>
    ))

    const formSelect = element.word.reflexive && this.props.parent.pos !== 'Possessive' && (
      <span className="select is-small">
        <select value={element.form} onChange={this.handleChange}>{forms}</select>
      </span>
    )

    return (
      <ul>
        <li className='tree-top'>
          <div className={`tree-box ${element.pos}`}>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>{element.word[element.form]}</span>
            <span className="label label-default">{this.props.role}</span>
            {formSelect}
            {this.props.parent.pos !== 'Possessive' && 
             <WH id={element.id} isWh={element.isWh} />}
            {this.props.parent.pos !== 'NounContainer' &&
             <ConjunctionButton element={element} role={this.props.role} parentId={this.props.parent.id} />}
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parent.id} />
          </div>
          <Children element={element} attrs={attrs} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />

        </li>
      </ul>
    )
  },
})

export default Pronoun