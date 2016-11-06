import React from 'react';
import store from '../../store.js'

const Pronoun = React.createClass({
  render: function() {
    const state = store.getState();
    const pronoun = state.Words.find(o => o.id === this.props.id);
    return (
      <div className="list-group-item">
        {pronoun.word.n}
      </div>
    );
  },
});

export default Pronoun;