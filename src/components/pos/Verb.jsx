import React from 'react';
import store from '../../store.js'
import pos_components from './pos_components';

const e = React.createElement;

const Verb = React.createClass({
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
    const verb = state.Words.find(o => o.id === this.props.id);
    const complements = verb.complements.map(comp => (
      e(pos_components[state.Words.find(o => o.id === comp).pos], {key: comp, id: comp})
    ));
    const options = state.activeWord === this.props.id ? (
        <div>
          <div onClick={() => this.showWordFacotory('complements')}>complements</div>
          <div onClick={() => this.showWordFacotory('predicate')}>predicate</div>
          <div onClick={() => this.showWordFacotory('adverbs')}>adverbs</div>
          <div onClick={() => this.showWordFacotory('prepositions')}>prepositions</div>
        </div>
      ) : '';
    const attributes = ['past','negative','continuous','perfect','passive'].map(o => (
      e('button', {
        className: `btn btn-sm btn-${verb[o] ? 'success' : 'default'}`,
        key: o,
        type: 'button',
        onClick: () => this.changeAttribute(o, this.props.id, !verb[o])
      }, o)
    ));      

    return (
      <div className="list-group-item">
        <span onClick={this.showOptions}>{verb.word.base}</span>
        {attributes}
        {complements}
        {options}
      </div>
    );
  },
});

export default Verb;