import React from 'react';
import store from '../store.js'
import Pos from '../pos/Pos.js';

const Output = React.createClass({
  render: function() {
    const state = store.getState();
    const c = new Pos.Clause(state.Words.find(o => o.id === state.Sentence));
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">Output</h3>
        </div>
        <div className="panel-body">
          {c.print()}
        </div>
      </div>
    );
  }
});

export default Output;