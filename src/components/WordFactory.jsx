import React from 'react';
import store from '../store.js'
import Dictionary from '../dictionary/dictionary.js';

const WordFactory = React.createClass({
  createNewWord: function (id, activeWord, target) {
    store.dispatch({
      type: 'CREATE_WORD',
      id: id,
      activeWord: activeWord,
      target: target,
    });
  },
  render: function() {
    const state = store.getState();
    const words = Dictionary.map(o => (
      <li className='list-group-item' key={o.id} onClick={() => (
        this.createNewWord(o.id, state.activeWord, state.target)
      )}>
        {o.n}
      </li>
    ));
    return (
      <ul className='list-group'>
        {words}
      </ul>
    );
  }
});

export default WordFactory;