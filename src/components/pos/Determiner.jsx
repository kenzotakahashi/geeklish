import React from 'react';
import store from '../../store.js'
// import pos_components from './pos_components';

const e = React.createElement;

const Determiner = React.createClass({
  showOptions: function () {
    store.dispatch({
      type: 'SHOW_OPTIONS',
      id: this.props.id,
    });
  },
  showWordFacotory: function(target) {
    store.dispatch({
      type: 'SHOW_WORD_FACTORY',
      id: this.props.id,
      target: target,
    });
  },
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
    const determiner = state.Words.find(o => o.id === this.props.id);

    return (
      <div className="list-group-item">
        <div>
          <span className='word' onClick={this.showOptions}>{determiner.word}</span>
          {e('button', {
            className: `btn btn-sm btn-${determiner.isWh ? 'success' : 'default'}`,
            type: 'button',
            onClick: () => this.changeAttribute('isWh', this.props.id, !determiner.isWh)
          }, 'WH question')}
        </div>
      </div>
    );
  },
});

export default Determiner;