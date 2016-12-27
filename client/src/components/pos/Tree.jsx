import React from 'react'
import store from '../../store.js'
import pos_components from './pos_components'
import { changeAttribute, deleteElement, useConjunction, undoConjunction,
         changeModal } from '../../actions'
import { getWordDictionary } from '../../wordDictionary'

const e = React.createElement

export const Children = (props) => (
	<ul>
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
    {props.activeWord === props.element._id &&
	    props.attrs.map(o => (
	    	(o.slice(-1) === 's' || !props.element[o]) &&
	      e(
	      	'li',
	      	{
	          className: `tree tree-${props.target[0] === o ? 'active' : 'info'}`,
	          key: o,
	          onClick: () => getWordDictionary(props.element, [o, null])
	        },
	        o
	      )
	    ))
    }    		
	</ul>
)

export const CompChildren = (props) => (
  <ul className='comp-children'>
    {
      props.activeWord === props.element._id &&
        <li className='tree tree-info'
            onClick={() => store.dispatch(changeModal({name: 'Complement', rest: props.element._id}))}>
            {`${props.element.isComplementChosen ? 'Change' : 'Choose'}`} a complement</li>
    }
    {
      props.element.isComplementChosen &&
        props.element.complements.map((w, i) => (
          w._id ?
            e(pos_components[props.words.find(o => o._id === w._id).pos],
              {key: i, parent: props.element, _id: w._id, role: ['complements', i]}
            ) : props.activeWord === props.element._id &&
            e(
              'li',
              {
                className: `tree tree-${props.target[1] === i ? 'active' : 'info'}`,
                key: i,
                disabled: props.element.passive && i === 0 && w.category === 'noun' && "disabled",
                onClick: () => getWordDictionary(
                  props.words, props.element, ['complements', i])
              },
              w.category
            )
        ))
    }
  </ul>
)

export const WH = (props) => (
	e(
		'button',
		{             
      className: `tree-button ${props.isWh && 'on'}`,
		  type: 'button',
		  onClick: () => store.dispatch(changeAttribute(props.id, 'isWh', !props.isWh))
		},
		'WH'
	)
)

export const DeleteButton = (props) => (
	<button type="button" className="btn btn-default btn-xs trash"
	        onClick={() => store.dispatch(deleteElement(props.id, props.role, props.parentId))}>
	  <span className="glyphicon glyphicon-trash" aria-hidden="true"></span>
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
  <span className="label label-default">
    {props.role[1] === null ? props.role[0] : props.parent.complements[props.role[1]].category}
  </span>
)