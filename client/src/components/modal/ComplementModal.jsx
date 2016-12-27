import React from 'react'
import store from '../../store'

import Modal from './Modal'


export const ComplementModal = React.createClass({
	getInitialState: function () {
	  return {choice: null}
	},
	onChange: function(e) {
		this.setState({choice: e.currentTarget.value})
	},
	onFormSubmit: function(_id, verbType, e) {
	  e.preventDefault()
	  store.dispatch({
	  	type: 'SET_COMPLEMENT',
	  	_id,
	  	verbType,
	  	index: this.state.choice
	  })
	},
	render: function() {
		const state = store.getState()
		const element = state.Words.find(o => o._id === this.props.rest)

		const verbType = !!element.particle ? 
		                   state.Words.find(o => o._id === element.particle).word : 'base'
		const complements = element.valid_complements[verbType].map((o, i) => (
			<div className="radio" key={i}>
			  <label>
			    <input type="radio" value={i} checked={parseInt(this.state.choice, 10) === i}
			           onChange={this.onChange} />
			    {o.length > 0 ?
			       o.map((t, j) => (<span key={j} className='comp-choice'>{t}</span>))
			       : <span className='comp-choice'>No complement</span>
			    }
			  </label>
			</div>
		))

		return (
			<Modal isOpen={true} onClose={() => this.props.closeModal()}>
			  <div className='modal-container'>
				  <h2>Choose a complement</h2>
				  
				  <form className="form" onSubmit={(e) => this.onFormSubmit(element._id, verbType, e)}>
			    	{complements}
			    	<div className='container container-left'>
					    <button type="submit" className="button-primary"
					            disabled={this.state.choice === null && "disabled"}>
					      Save
					    </button>
					    <button type='button' onClick={() => this.props.closeModal()}>Close</button>
				  	</div>
				  </form>
				</div>
			</Modal>
		)
	}
})

export default ComplementModal