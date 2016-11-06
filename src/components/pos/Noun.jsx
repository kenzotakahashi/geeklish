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
    const noun = state.Words.find(o => o.id === this.props.id);
    const determiners = noun.determiners.map(det => (
      e(pos_components[state.Words.find(o => o.id === det).pos], {key: det, id: det})
    ));

    const attrs = ['determiners','adjectives','nouns','prepositions'];
    const options = state.activeWord === this.props.id ? attrs.map((o, i) => (
        <div
          key={i}
          onClick={() => this.showWordFacotory(o)}
          className="list-group-item list-group-item-info"
        >
          {o}
        </div>
    )) : '';

    return (
      <div className="list-group-item">
        <div>
          <span className='word' onClick={this.showOptions}>{noun.word.singular}</span>
          {e('button', {
            className: `btn btn-sm btn-${noun.number === 'plural' ? 'success' : 'default'}`,
            type: 'button',
            onClick: () => this.changeNumber(this.props.id)
          }, noun.number)}
          {e('button', {
            className: `btn btn-sm btn-${noun.isWh ? 'success' : 'default'}`,
            type: 'button',
            onClick: () => this.changeAttribute('isWh', this.props.id, !noun.isWh)
          }, 'WH question')}
        </div>
        {determiners}
        {options}
      </div>
    );
  },
});

export default Noun;