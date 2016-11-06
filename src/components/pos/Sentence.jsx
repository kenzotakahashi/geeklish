import React from 'react';
import store from '../../store.js'
import pos_components from './pos_components';

const Sentence = React.createClass({
  render: function() {
    const state = store.getState();
    const clause = state.Sentence;
    const SpecificClause = pos_components[state.Words.find(o => o.id === clause).pos];
    return (
      <div className='list-group'>
        <SpecificClause id={clause} />
      </div>
    );
  },
});

export default Sentence;