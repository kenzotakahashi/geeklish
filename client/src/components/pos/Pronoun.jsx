import React from 'react'
import store from '../../store.js'
import { WH, DeleteButton } from './Tree'
import { changeAttribute } from '../../actions'

const Pronoun = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props.id, 'form', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const element = state.Words.find(o => o.id === this.props.id)
    
    const forms = ['nominative','accusative','possessive','possessive pronoun','reflexive'].map(o => (
      <option key={o} value={o}>{o}</option>
    ))

    const formSelect = element.word.possessive ? (
      <span className="select is-small">
        <select value={element.form} onChange={this.handleChange}>{forms}</select>
      </span>
    ) : ''

    return (
      <ul>
        <li className='tree-top'>
          <div className='tree-box'>
            <span className='word'>{element.word[element.form]}</span>
            <span className="label label-default">{this.props.role}</span>
            {formSelect}
            <WH id={element.id} isWh={element.isWh} />
            <DeleteButton id={element.id} role={this.props.role} parentId={this.props.parentId} />
          </div>
        </li>
      </ul>
    )
  },
})

export default Pronoun