import React from 'react'
import store from '../../store.js'
import Client from '../../Client'
import pos_components from './pos_components'
import { showWordFactory, changeAttribute, deleteElement } from '../../actions'

const e = React.createElement

const nouns = ['Noun', 'Pronoun', 'NounContainer', 'NounClause', 'Verb', 'Be'] //'Determiner'
const verbs = ['Verb', 'Be', 'VerbContainer']
const adjectives = ['Adjective', 'AdjectiveClause']
const clauses = ['Clause', 'ClauseContainer']

const valid_pos = {
  Sentence: {
    clause: clauses
  },
  Clause: {
    subject: nouns,
    verb: verbs,
    conjunction: ['Conjunction']
  },
  ClauseContainer: {
    clauses: ['Clause'],
    conjunction: ['Conjunction']
  },
  Verb: {
    complements: [...nouns, ...adjectives, 'Adverb', 'Preposition', 'Infinitive'],
    adverbs: ['Adverb', 'Infinitive'],
    prepositions: ['Preposition']
  },
  Be: {
    complements: [...nouns, ...adjectives, 'Adverb', 'Preposition', 'Infinitive'],
    adverbs: ['Adverb', 'Infinitive'],
    prepositions: ['Preposition']
  },
  VerbContainer: {
    complements: [...nouns, ...adjectives, 'Adverb', 'Preposition', 'Infinitive'],
    adverbs: ['Adverb', 'Infinitive'],
    prepositions: ['Preposition'],
    verbs: ['Verb', 'Be'],
    conjunction: ['Conjunction']
  },
  Noun: {
    adjectives: [...adjectives, 'Infinitive'],
    prepositions: ['Preposition'],
    determiners: ['Determiner'],
    nouns: nouns
  },
  NounContainer: {
    adjectives: adjectives,
    prepositions: ['Preposition'],
    determiners: ['Determiner'],
    nouns: nouns,
    conjunction: ['Conjunction']
  },
  NounClause: {
    clause: clauses,
    nouns: nouns,
    determiners: ['Determiner'],
    adjectives: adjectives,
    prepositions: ['Preposition'],
  },
  Adjective: {
    adverbs: ['Adverb'],
    prepositions: ['Preposition'] 
  },
  AdjectiveClause: {
    clause: clauses
  },
  Adverb: {
    adverb: ['Adverb']
  },
  Preposition: {
    complement: nouns
  },
  Infinitive: {
    verb: verbs
  }
}

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
	          // onClick: () => store.dispatch(showWordFactory(props.id, o))
	          onClick: function() {
	          	Client.getDics(json => {
	          	  const pos = props.words.find(o => o.id === props.activeWord).pos
	          	  const valid = valid_pos[pos][o]
	          	  const dictionary = json.result.filter(t => valid.includes(t.pos))
	          	  store.dispatch(showWordFactory(props.id, o, dictionary))
	          	})
	          }
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
		  className: `button is-small is-active ${props.isWh ? 'is-primary' : ''}`,
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
