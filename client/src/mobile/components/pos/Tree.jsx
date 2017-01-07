import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 
import { store } from '../../../index.js'
import { pos_components, posLinks } from './pos_components'
import { changeAttribute, deleteElement, useConjunction, undoConjunction,
         changeModal, showDetail } from '../../../shared/actions'
import { getWordDictionary } from '../../../shared/wordDictionary'

const e = React.createElement

export const Children = (props) => (
	<ul className='m-tree'>
    <ReactCSSTransitionGroup
      transitionName="tree"
      transitionEnterTimeout={300}
      transitionLeaveTimeout={300}>
      {
        props.attrs.map((w, i) => (
          w.slice(-1) === 's' ? (
            // attribute is a list(ex. complements)
            props.element[w].map((t, j) => (
              e(pos_components[props.words.find(o => o._id === t).pos],
                {key: w+j, parent: props.element, _id: t, role: [w, null]}
              )
            ))
          ) : (props.element[w] &&
            // attribute is a non-list(ex. subject)         
            e(pos_components[props.words.find(o => o._id === props.element[w]).pos],
              {key: w, parent: props.element, _id: props.element[w], role: [w, null]}
            )
          )
        ))
      }
    </ReactCSSTransitionGroup>  		
	</ul>
)

export const ChildrenDetail = (props) => (
  <div>
    <ul className='m-list-group'>
      {
        props.attrs.map((w, i) => {
          if (w.slice(-1) === 's') {
            return props.element[w].map((t, j) => {
              const element = props.words.find(o => o._id === t)
              e(posLinks[element.pos],
                {key: w+j, _id: t, parent: props.element, role: [w, null]}
              )
            })
          }
          else if (props.element[w]) {
            const element = props.words.find(o => o._id === props.element[w])
            return (
              e(posLinks[element.pos],
                {key: w, _id: element._id, parent: props.element, role: [w, null]}
              )
            )
          }
        })
      }
    </ul>
    <ul className='m-list-group'>
      {
        props.attrs.filter(t => t.slice(-1) === 's' || !props.element[t]).map((o, i) => (
          <li key={o}
              onClick={() => getWordDictionary(props.element, [o, null])}>
            <hr className={`m-border${i === 0 ? '-edge' : ''}`} />
            <span className='m-list'>{o}</span>
          </li>
        ))
      }
      <hr className='m-border-edge' />
    </ul>
  </div>
)

export const CompChildren = (props) => (
  <ul className='comp-children'>
    {
      props.activeWord === props.element._id &&
        <li className='word tree tree-info'
            onClick={() => store.dispatch(changeModal({name: 'Complement', rest: props.element._id}))}>
            {`${props.element.complementIndex !== null ? 'Change' : 'Choose'}`} a complement</li>
    }
    {
      props.element.complementIndex !== null &&
        props.element.complements.map((w, i) => (
          w._id ?
            e(pos_components[props.words.find(o => o._id === w._id).pos],
              {key: i, parent: props.element, _id: w._id, role: ['complements', i]}
            ) : props.activeWord === props.element._id &&
            e(
              'li',
              {
                className: `word tree tree-${props.target[1] === i ? 'active' : 'info'}`,
                key: i,
                disabled: props.element.passive && i === 0 && w.category === 'noun' && "disabled",
                onClick: () => getWordDictionary(props.element, ['complements', i])
              },
              w.category
            )
        ))
    }
  </ul>
)

export const WH = (props) => (
  <span className='m-list'>
    <span>WH</span>
    <label className="switch">
      <input type="checkbox" onChange={() => store.dispatch(changeAttribute(
        props.id, 'isWh', !props.isWh))} checked={props.isWh} />
      <div className="slider round"></div>
    </label>
  </span>
)


export const DeleteButton = (props) => (
	<button type="button" className="button-error trash"
	        onClick={() => store.dispatch(deleteElement(props.id, props.role, props.parentId))}>
    ×
	</button>
)

export const ConjunctionButton = (props) => (
  <button type="button" className='tree-button'
          onClick={() => store.dispatch(useConjunction(props.element, props.role, props.parentId))}>
    C
  </button>
)

export const UndoConjunctionButton = (props) => (
  <button type="button" className='tree-button on'
          onClick={() => store.dispatch(undoConjunction(
                          props.element, props.thisRole, props.childRole, props.parentId))}>
    C
  </button>
)

export const ModalSelect = (props) => (
  <span className='select'>
    <select value={props.value} onChange={props.onChange}>
      {['modal','can','could','should','may','might','must','will','would'].map(o => (
         <option key={o} value={o === 'modal' ? '' : o}>{o}</option>
        ))
      }
    </select>
  </span>
)

export const Label = (props) => (
  <span className="label">
    {props.role[1] === null ? props.role[0] : props.parent.complements[props.role[1]].category}
  </span>
)