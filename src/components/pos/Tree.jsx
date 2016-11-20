import React from 'react'
import store from '../../store.js'
import pos_components from './pos_components'
import { showWordFactory, changeAttribute, deleteElement } from '../../actions'

const e = React.createElement

// w.slice(-1) === 's' ? w.slice(0,-1) : w

export const Children = (props) => (
	<ul>
    {
      props.attrs.map((w, i) => (
      	w.slice(-1) === 's' ? (
      		// attribute is a list(ex. complements)
      		props.element[w].map((t, j) => (
      		  e(pos_components[props.words.find(o => o.id === t).pos],
      		  	{key: w+j, parentId: props.id, id: t, role: w}
      		  )
      		))
      	) : (props.element[w] &&
	      	// attribute is a non-list(ex. subject)	      	
      		e(pos_components[props.words.find(o => o.id === props.element[w]).pos],
      			{key: w, parentId: props.id, id: props.element[w], role: w}
      		)
      	)
      ))
    }
    {props.activeWord === props.id &&
	    props.attrs.map(o => (
	    	(o.slice(-1) === 's' || !props.element[o]) &&
	      e(
	      	'li',
	      	{
	          className: `tree tree-${props.target === o ? 'active' : 'info'}`,
	          key: o,
	          onClick: () => store.dispatch(showWordFactory(props.id, o))
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
		  className: `button is-active ${props.isWh ? 'is-primary' : ''}`,
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
