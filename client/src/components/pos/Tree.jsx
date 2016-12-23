import React from 'react'
import store from '../../store.js'
import pos_components from './pos_components'
import { changeAttribute, deleteElement, useConjunction, undoConjunction } from '../../actions'
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
      		  	{key: w+j, parent: props.element, _id: t, role: w}
      		  )
      		))
      	) : (props.element[w] &&
	      	// attribute is a non-list(ex. subject)	      	
      		e(pos_components[props.words.find(o => o._id === props.element[w]).pos],
      			{key: w, parent: props.element, _id: props.element[w], role: w}
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
	          className: `tree tree-${props.target === o ? 'active' : 'info'}`,
	          key: o,
	          onClick: () => getWordDictionary(props.words, props.activeWord, props.element._id, o)
	        },
	        o
	      )
	    ))
    }    		
	</ul>
)

export const WH = (props) => (
	e(
		'button',
		{
		  className: `button is-small is-active ${props.isWh && 'is-primary'}`,
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
  <button type="button" className="button is-small is-active"
          onClick={() => store.dispatch(useConjunction(props.element, props.role, props.parentId))}>
    C
  </button>
)

export const UndoConjunctionButton = (props) => (
  <button type="button" className="button is-small is-active is-primary"
          onClick={() => store.dispatch(undoConjunction(
                          props.element, props.thisRole, props.childRole, props.parentId))}>
    C
  </button>
)

export const ModalSelect = (props) => (
  <span className="select is-small">
    <select value={props.value} onChange={props.onChange}>
      {['modal','can','could','should','may','might','must','will','would'].map(o => (
         <option key={o} value={o === 'modal' ? '' : o}>{o}</option>
        ))
      }
    </select>
  </span>
)
