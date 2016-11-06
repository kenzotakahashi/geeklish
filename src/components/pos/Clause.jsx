import React from 'react';
import store from '../../store.js'
import pos_components from './pos_components';

const e = React.createElement;

const Clause = React.createClass({
  // showOptions: function () {
  //   store.dispatch({
  //     type: 'SHOW_OPTIONS',
  //     id: this.props.id,
  //   });
  // },
  showWordFacotory: function(target) {
    store.dispatch({
      type: 'SHOW_WORD_FACTORY',
      id: this.props.id,
      target: target,
    });
  },
  render: function() {
    const state = store.getState();
    const clause = state.Words.find(o => o.id === this.props.id);

    const list = ['subject', 'verb'].map(w => (
      !!clause[w] ? e(pos_components[state.Words.find(o => o.id === clause[w]).pos], {id: clause[w],  key: w}) :
                    <div key={w} className="list-group-item" onClick={() => this.showWordFacotory(w)}>{w}</div>
    ));

    return (
      <div>
        {list}
      </div>
    );
  },
});

export default Clause;