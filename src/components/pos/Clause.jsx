import React from 'react';
import store from '../../store.js'
import pos_components from './pos_components';

const e = React.createElement;

const Clause = React.createClass({
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
    const clause = state.Words.find(o => o.id === this.props.id);
    const list = ['subject', 'verb'].map(w => (
      !!clause[w] ?
      e(pos_components[state.Words.find(o => o.id === clause[w]).pos], {id: clause[w],  key: w}) :
      e('div', {
        className: `list-group-item ${state.target === w ? 'active' : 'list-group-item-info'}`,
        key: w,
        onClick: () => this.showWordFacotory(w)
      }, w)
    ));

    const attributes = ['statement','question','command'].map(o => (
      e('button', {
        className: `btn btn-sm btn-${clause.c_type === o ? 'success' : 'default'}`,
        key: o,
        type: 'button',
        onClick: () => this.changeAttribute('c_type', this.props.id, o)
      }, o)
    ));   

    return (
      <div className='list-group-item'>
        <div>
          <span className='word' onClick={this.showOptions}>Clause</span>
          {attributes}
        </div>
        <div>
          {list}
        </div>
      </div>
    );
  },
});

export default Clause;