import React from 'react'
import store from '../../store.js'
// import pos_components from './pos_components'
import { showOptions, changeAttribute } from '../../actions'

const e = React.createElement

const Determiner = React.createClass({
  render: function() {
    const state = store.getState()
    const word = state.Words.find(o => o.id === this.props.id)

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
      </div>
    )
  },
})

export default Determiner