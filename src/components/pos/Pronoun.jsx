import React from 'react';
import store from '../../store.js'
import { changeAttribute } from '../../actions'

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
    const word = state.Words.find(o => o.id === this.props.id);
    
    return (
      <div className="list-group-item">
      	<div>
	        <span className='word'>{word.word.n}</span>
	        {e('button', {
            className: `button is-active ${word.isWh ? 'is-primary' : ''}`,
            type: 'button',
            onClick: () => store.dispatch(changeAttribute(this.props.id, 'isWh', !word.isWh))
       		}, 'WH')}
	      </div>
      </div>
    );
  },
});

export default Pronoun;