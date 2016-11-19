import React from 'react'
import store from '../../store.js'
import { changeAttribute } from '../../actions'

const e = React.createElement

const Pronoun = React.createClass({
  handleChange: function(e){
    store.dispatch(changeAttribute(this.props.id, 'form', e.target.value))
  },
  render: function() {
    const state = store.getState()
    const word = state.Words.find(o => o.id === this.props.id)
    
    const forms = ['nominative','accusative','possessive','possessive pronoun','reflexive'].map(o => (
      <option key={o} value={o}>{o}</option>
    ))

    const formSelect = word.word.possessive ? (
      <span className="select">
        <select value={word.form} onChange={this.handleChange}>{forms}</select>
      </span>
    ) : ''

    return (
      <div className="list-group-item">
      	<div>
	        <span className='word'>{word.word[word.form]}</span>
          {formSelect}
	        {e('button', {
            className: `button is-active ${word.isWh ? 'is-primary' : ''}`,
            type: 'button',
            onClick: () => store.dispatch(changeAttribute(this.props.id, 'isWh', !word.isWh))
       		}, 'WH')}
	      </div>
      </div>
    )
  },
})

export default Pronoun