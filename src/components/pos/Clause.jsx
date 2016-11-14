import React from 'react'
import store from '../../store.js'
import pos_components from './pos_components'
import { showOptions, showWordFactory, changeAttribute } from '../../actions'

const e = React.createElement

const Clause = React.createClass({
  render: function() {
    const state = store.getState()
    const clause = state.Words.find(o => o.id === this.props.id)
    const options = ['subject', 'verb'].map(w => (
      !!clause[w] ?
      e(pos_components[state.Words.find(o => o.id === clause[w]).pos], {id: clause[w],  key: w}) :
      e('div', {
        className: `list-group-item ${state.target === w ? 'active' : 'list-group-item-info'}`,
        key: w,
        onClick: () => store.dispatch(showWordFactory(this.props.id, w))
      }, w)
    ))

    // const options = ['subject', 'verb'].map(w => (
    //   !!clause[w] ?
    //   {
    //     pos: pos_components[state.Words.find(o => o.id === clause[w]).pos],
    //     id: clause[w],
    //   } :
    //   {
    //     target: state.target
    //   }
    // ))

    const attr = ['statement','question','command'].map(o => (
      e('button', {
        className: `button is-active ${clause.c_type === o? 'is-primary' : ''}`,
        key: o,
        type: 'button',
        onClick: () => store.dispatch(changeAttribute(this.props.id, 'c_type', o))
      }, o)
    ))

    return (
      // <ClauseView
      //   clause={clause}
      //   options={options}
      //   attr=['statement','question','command']
      //   showWordFactory={this.showWordFactory}
      //   changeAttribute={this.changeAttribute}

      <div className='list-group-item'>
        <div>
          <span className='word' onClick={() => store.dispatch(showOptions(this.props.id))}>Clause</span>
          {attr}
        </div>
        <div>
          {options}
        </div>
      </div>
    )
  },
})

export default Clause