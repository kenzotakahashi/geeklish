import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 
import { store } from '../../../index.js'
import { pos_components, posLinks } from './pos_components'
import { changeAttribute, deleteElement, useConjunction, undoConjunction,
         routeComplementOption} from '../../../shared/actions'
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
              return e(posLinks[element.pos],
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
          else {
            return ''
          }
        })
      }
    </ul>
    <ul className='m-list-group'>
      {
        props.attrs.filter(t => t.slice(-1) === 's' || !props.element[t]).map((o, i) => (
          <li key={o}
              onClick={() => getWordDictionary(props.element, [o, null], true)}>
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
  <ul className='m-tree'>
    {
      props.element.complementIndex !== null &&
        props.element.complements.map((w, i) => (
          w._id &&
            e(pos_components[props.words.find(o => o._id === w._id).pos],
              {key: i, parent: props.element, _id: w._id, role: ['complements', i]}
            )
        ))
    }
  </ul>
)

export const CompChildrenDetail = (props) => (
  <div>
    <ul className='m-list-group'>
      <li key='complement'>
        <hr className='m-border-edge' />
        <span className='m-list' onClick={() => store.dispatch(routeComplementOption())}>
          <span>
            {`${props.element.complementIndex !== null ? 'Change' : 'Choose'}`} a complement
          </span>
          <span className='m-list-right'>WIP</span>
        </span>
        <hr className='m-border' />
      </li>
    </ul>
    <ul className='m-list-group'>
      {
        props.element.complementIndex !== null &&
          props.element.complements.map((w, i) => (
            w._id ?
              e(posLinks[props.words.find(o => o._id === w._id).pos],
                {key: i, parent: props.element, _id: w._id, role: ['complements', i]}
              ) : (
              <li key={i}
                  onClick={() => getWordDictionary(props.element, ['complements', i], true)}
                  disabled={props.element.passive && i === 0 && w.category === 'noun' && "disabled"}>
                <hr className={`m-border${i === 0 ? '-edge' : ''}`} />
                <span className='m-list'>{w.category}</span>
              </li>
              )
          ))
      }
    </ul>
  </div>
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
	<button type="button" className="button-error m-list"
	        onClick={() => store.dispatch(deleteElement(props.id, props.role, props.parentId))}>
    Delete
	</button>
)

export const ConjunctionButton = (props) => (
  <button type="button" className='m-list'
          onClick={() => store.dispatch(useConjunction(props.element, props.role, props.parentId))}>
    Use a Conjunction
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
  <div className='m-label'>
    <span className="m-list">
      <span>Function</span>
      <span className='m-list-right'>
        {props.role[1] === null ? props.role[0] : props.parent.complements[props.role[1]].category}
      </span>
    </span>
  </div>
)