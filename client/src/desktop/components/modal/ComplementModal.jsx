import React from 'react'
import { store } from '../../../index'
import { setComplement } from '../../../shared/actions'

import Modal from './Modal'


export const ComplementModal = React.createClass({
	getInitialState: function () {
		const element = store.getState().Words.find(o => o._id === this.props.rest)
	  return {choice: element.complementIndex}
	},
	onChange: function(e) {
		this.setState({choice: parseInt(e.currentTarget.value, 10)})
	},
	onFormSubmit: function(_id, verbType, e) {
	  e.preventDefault()
	  store.dispatch(setComplement(_id, verbType, this.state.choice))
	},
	render: function() {
		const state = store.getState()
		const element = state.Words.find(o => o._id === this.props.rest)

		const verbType = !!element.particle ? 
		                   state.Words.find(o => o._id === element.particle).word : 'base'
		const complements = element.valid_complements[verbType].map((o, i) => (
			<div className="radio" key={i}>
		    <input type="radio" value={i} checked={this.state.choice === i}
		           onChange={this.onChange} />
		    {o.length > 0 ?
		       o.map((t, j) => (<span key={j} className='comp-choice'>{t}</span>))
		       : <span className='comp-choice'>No complement</span>
		    }
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