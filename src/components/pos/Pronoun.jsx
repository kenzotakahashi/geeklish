import React from 'react';
import store from '../../store.js'

const e = React.createElement;

const Pronoun = React.createClass({
  changeAttribute: function(attr, id, change_to) {
    store.dispatch({
      type: 'CHANGE_ATTRIBUTE',
      id,
      attr,
      change_to,
    });
  },
  render: function() {
    const state = store.getState();
    const pronoun = state.Words.find(o => o.id === this.props.id);
    
    return (
      <div className="list-group-item">
      	<div>
	        <span className='word'>{pronoun.word.n}</span>
	        {e('button', {
            className: `btn btn-sm btn-${pronoun.isWh ? 'success' : 'default'}`,
            type: 'button',
            onClick: () => this.changeAttribute('isWh', this.props.id, !pronoun.isWh)
       		}, 'WH question')}
	      </div>
      </div>
    );
  },
});

export default Pronoun;