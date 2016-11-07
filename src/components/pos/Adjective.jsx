import React from 'react';
import store from '../../store.js'
import pos_components from './pos_components';

const e = React.createElement;

const Adjective = React.createClass({
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
    const word = state.Words.find(o => o.id === this.props.id);

    const adverbs = word.adverbs.map(w => (
      e(pos_components[state.Words.find(o => o.id === w).pos], {key: w, id: w})
    ));
    const prepositions = word.prepositions.map(w => (
      e(pos_components[state.Words.find(o => o.id === w).pos], {key: w, id: w})
    ));

    const attributes = ['base','comparative','superlative'].map(o => (
      e('button', {
        className: `btn btn-sm btn-${word.mode === o ? 'success' : 'default'}`,
        key: o,
        type: 'button',
        onClick: () => this.changeAttribute('mode', this.props.id, o)
      }, o)
    ));

    const attrs = ['adverbs','prepositions'];
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
          <span className='word' onClick={this.showOptions}>{word.word.base}</span>
          {attributes}
          {e('button', {
            className: `btn btn-sm btn-${word.isWh ? 'success' : 'default'}`,
            type: 'button',
            onClick: () => this.changeAttribute('isWh', this.props.id, !word.isWh)
          }, 'WH question')}
        </div>
        {adverbs}
        {prepositions}
        {options}
      </div>
    );
  },
});

export default Adjective;