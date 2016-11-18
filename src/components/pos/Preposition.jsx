import React from 'react';
import store from '../../store.js'
import pos_components from './pos_components';
import { showOptions, showWordFactory, changeAttribute } from '../../actions'

const e = React.createElement;

const Preposition = React.createClass({
  render: function() {
    const state = store.getState();
    const word = state.Words.find(o => o.id === this.props.id);

    const w = 'complement'
    const complement =  !!word[w] ?
          e(pos_components[state.Words.find(o => o.id === word[w]).pos],
            {id: word[w],  key:w}) :
          state.activeWord === this.props.id ?
          e('div', {
            className: `list-group-item ${state.target === w ? 'active' : 'list-group-item-info'}`,
            key: w,
            onClick: () => store.dispatch(showWordFactory(this.props.id, w))
          }, w) : '';

    return (
      <div className="list-group-item">
        <div>
          <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>{word.word}</span>
          {e('button', {
            className: `button is-active ${word.isWh ? 'is-primary' : ''}`,
            type: 'button',
            onClick: () => store.dispatch(changeAttribute(this.props.id, 'isWh', !word.isWh))
          }, 'WH')}
        </div>
        {complement}
      </div>
    );
  },
});

export default Preposition;