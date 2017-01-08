import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group' 
import { store } from '../../../index.js'
import { pos_components } from './pos_components'
import { changeAttribute, deleteElement, useConjunction, undoConjunction,
         routeComplementOption, showDetail, routeOption} from '../../../shared/actions'
import { getWordDictionary } from '../../../shared/wordDictionary'
import { getLabel } from '../../../shared/others'

const e = React.createElement

const PosLink = React.createClass({
  render: function() {
    const {_id, parent, role} = this.props
    const element = store.getState().Words.find(o => o._id === _id)
    return (
      <li key={_id} className={`m-list pointer ${element.pos}`}
          onClick={() => store.dispatch(showDetail(element._id,'switch',parent,role))}>
        <span className='word' >{getLabel(element, parent)}</span>
      </li>
    )
  }
})

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
            return props.element[w].map((t, j) => (
              e(PosLink, {key: w+j, _id: t, parent: props.element, role: [w, null]})
            ))
          }
          if (props.element[w]) {
            return e(PosLink, {key: w, _id: props.element[w],
                               parent: props.element, role: [w, null]})
          }
          return ''
        })
      }
    </ul>
    <ul className='m-list-group'>
      {
        props.attrs.filter(t => t.slice(-1) === 's' || !props.element[t]).map((o, i) => (
          <li key={o}
              onClick={() => getWordDictionary(props.element, [o, null], true)}>
            <hr className={`m-border${i === 0 ? '-edge' : ''}`} />
            <span className='m-list pointer'>
              {o}
              <span className='m-list-right'>
                <span className='m-list-arrow'></span>
              </span>
            </span>
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

function getComplement(props) {
  const {element, words} = props
  let word, comp
  if (element.complementIndex === null) {
    word = 'Choose'
    comp = ''
  } else {
    word = 'Change'
    const verbType = !!element.particle ? 
                       words.find(o => o._id === element.particle).word : 'base'
    const compList = element.valid_complements[verbType][element.complementIndex]
    comp = compList.length > 0 ? compList.join(' ') : 'No complement'
  }

  return (
    <span className='m-list pointer' onClick={() => store.dispatch(routeComplementOption())}>
      <span>
        {word} a complement
      </span>
      <span className='m-list-right'>
        <span>{comp}</span>
        <span className='m-list-arrow'></span>
      </span>
    </span>
  )
}

export const CompChildrenDetail = (props) => (
  <div>
    <ul className='m-list-group'>
      <hr className='m-border-edge' />
      <li key='complement'>
        {getComplement(props)}
      </li>
      {
        props.element.complementIndex !== null && props.element.complements.map((w, i) => (
          w._id ?
            e(PosLink, {key: i, _id: w._id, parent: props.element, role: ['compLists', i]})
            :
            (
            <li key={i}
                onClick={() => getWordDictionary(props.element, ['complements', i], true)}
                disabled={props.element.passive && i === 0 && w.category === 'noun' && "disabled"}>
              <hr className={`m-border${i === 0 ? '-edge' : ''}`} />
              <span className='m-list'>
                {w.category}
                <span className='m-list-right'>
                  <span className='m-list-arrow'></span>
                </span>
              </span>
            </li>
            )
        ))
      }
      <hr className='m-border-edge' />
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
  <button type="button" className='m-list pointer'
          onClick={() => store.dispatch(useConjunction(props.element, props.role, props.parentId))}>
    Use a Container
  </button>
)

export const UndoConjunctionButton = (props) => (
  <button type="button" className='m-list pointer'
          onClick={() => store.dispatch(undoConjunction(
                          props.element, props.thisRole, props.childRole, props.parentId))}>
    Remove the Container
  </button>
)

const verbOption = {
  attr: 'modal',
  label: 'Modal',
  choice: ['No modal','can','could','should','may','might','must','will','would']
}

export const ModalSelect = (props) => (
  <li key='form'>
    <span className='m-list' onClick={() => store.dispatch(routeOption(verbOption))}>
      <span>Modal</span>
      <span className='m-list-right'>
        <span>{props.element.modal === '' ? 'No Modal' : props.element.modal}</span>
        <span className='m-list-arrow'></span>
      </span>
    </span>
  </li>
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