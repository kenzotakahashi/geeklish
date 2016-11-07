import React from 'react';
import store from '../../store.js'
import pos_components from './pos_components';

const e = React.createElement;

const Noun = React.createClass({
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
  changeNumber: function(id) {
    store.dispatch({
      type: 'CHANGE_NUMBER',
      id,
    });
  },
  render: function() {
    const state = store.getState();
    const word = state.Words.find(o => o.id === this.props.id);

    const attrs = ['determiners','adjectives','nouns','prepositions'];
    const children = attrs.map((w, i) => (
      word[w].map((t, j) => (
        e(pos_components[state.Words.find(o => o.id === t).pos], {key: w+j, id: t})
      ))
    ));

    const options = state.activeWord === this.props.id ? attrs.map((o, i) => (
      e('div', {
        className: `list-group-item ${state.target === o ? 'active' : 'list-group-item-info'}`,
        key: i,
        onClick: () => this.showWordFacotory(o)
      }, o)
    )) : '';

    return (
      <div className="list-group-item">
        <div>
          <span className='word' onClick={this.showOptions}>{word.word.singular}</span>
          {e('button', {
            className: `btn btn-sm btn-${word.number === 'plural' ? 'success' : 'default'}`,
            type: 'button',
            onClick: () => this.changeNumber(this.props.id)
          }, word.number)}
          {e('button', {
            className: `btn btn-sm btn-${word.isWh ? 'success' : 'default'}`,
            type: 'button',
            onClick: () => this.changeAttribute('isWh', this.props.id, !word.isWh)
          }, 'WH question')}
        </div>
        {children}
        {options}
      </div>
    );
  },
});

export default Noun;