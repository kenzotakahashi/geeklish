import React from 'react'
import store from '../../store.js'
import pos_components from './pos_components'
import { showWordFactory, changeAttribute } from '../../actions'

const e = React.createElement

export const Children = (props) => (
	<ul>
    {
      props.attrs.map((w, i) => (
      	w.slice(-1) === 's' ? (
      		// attribute is a list(ex. complements)
      		props.element[w].map((t, j) => (
      		  e(pos_components[props.words.find(o => o.id === t).pos],
      		  	{key: w+j, id: t, role: w.slice(-1) === 's' ? w.slice(0,-1) : w}
      		  )
      		))
      	) : (props.element[w] &&
	      	// attribute is a non-list(ex. subject)	      	
      		e(pos_components[props.words.find(o => o.id === props.element[w]).pos],
      			{key: w, id: props.element[w], role: w.slice(-1) === 's' ? w.slice(0,-1) : w}
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
	<span>
		{
			e(
				'button',
				{
				  className: `button is-active ${props.isWh ? 'is-primary' : ''}`,
				  type: 'button',
				  onClick: () => store.dispatch(changeAttribute(props.id, 'isWh', !props.isWh))
				},
				'WH'
			)
		}
	</span>
)

