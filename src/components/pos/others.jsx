import React from 'react';
import store from '../../store.js'
import { Children } from './Tree'
import { showOptions } from '../../actions'

export const Infinitive = React.createClass({
  render: function() {
    const state = store.getState();
    const element = state.Words.find(o => o.id === this.props.id);
    const attrs = ['verb']

    return (
      <ul>
        <li className="tree-top">
          <div className='tree-box'>
            <span className='word' onClick={() => store.dispatch(showOptions(element.id))}>{element.word}</span>
            <span className="label label-default">{this.props.role}</span>
          </div>
          <Children element={element} attrs={attrs} id={element.id} words={state.Words}
                    target={state.target} activeWord={state.activeWord} />
        </li>
      </ul>
    );
  },
});