import React from 'react';
import store from '../store.js'
import Dictionary from '../dictionary/dictionary.js';

// const valid_pos = {
//   Clause: {
//     subject: ['noun', 'pronoun', 'determiner'],
//     verb: ['verb']
//   },
//   Verb: {
//     complements: 
//   }
// }

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
    // const pos = state.Words.find(o => o.id === state.activeWord).pos;

    const words = Dictionary.map(o => (
      <li className='list-group-item col-md-4' key={o.id} onClick={() => (
        this.createNewWord(o.id, state.activeWord, state.target)
      )}>
        {o.base}
      </li>
    ));
    return (
      <ul className='list-group row'>
        {words}
      </ul>
    );
  }
});

export default WordFactory;