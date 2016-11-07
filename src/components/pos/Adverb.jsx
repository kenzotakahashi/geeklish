import React from 'react';
import store from '../../store.js'
import pos_components from './pos_components';

const e = React.createElement;

const Adverb = React.createClass({
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

    const attributes = ['beginning','before','after'].map(o => (
      e('button', {
        className: `btn btn-sm btn-${word.position === o ? 'success' : 'default'}`,
        key: o,
        type: 'button',
        onClick: () => this.changeAttribute('position', this.props.id, o)
      }, o)
    ));

    const w = 'adverb'
    const adverb = !!word[w] ?
          e(pos_components[state.Words.find(o => o.id === word[w]).pos],
            {id: word[w],  key: w}) :
          state.activeWord === this.props.id ?
          e('div', {
            className: `list-group-item ${state.target === w ? 'active' : 'list-group-item-info'}`,
            key: w,
            onClick: () => this.showWordFacotory(w)
          }, w) : '';

    return (
      <div className="list-group-item">
        <div>
          <span className='word' onClick={this.showOptions}>{word.word}</span>
          {attributes}
          {e('button', {
            className: `btn btn-sm btn-${word.isWh ? 'success' : 'default'}`,
            type: 'button',
            onClick: () => this.changeAttribute('isWh', this.props.id, !word.isWh)
          }, 'WH question')}
        </div>
        {adverb}
      </div>
    );
  },
});

export default Adverb;