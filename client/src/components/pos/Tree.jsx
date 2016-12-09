import React from 'react'
import store from '../../store.js'
import Client from '../../Client'
import pos_components from './pos_components'
import { showWordFactory, changeAttribute, deleteElement, useConjunction } from '../../actions'

const e = React.createElement

const nouns = ['Noun', 'Pronoun', 'NounClause', 'Verb', 'Be']
const verbs = ['Verb', 'Be']
const adjectives = ['Adjective', 'AdjectiveClause']
const adverbs = ['Adverb', 'AdverbClause']
const clauses = ['Clause']
const coordinating = [{pos: 'Conjunction', attr: ['type', 'coordinating']}]

const valid_pos = {
  Sentence: {
    clause: clauses
  },
  Clause: {
    subject: nouns,
    verb: verbs,
  },
  ClauseContainer: {
    clauses: ['Clause'],
    conjunction: coordinating
  },
  Verb: {
    complements: [...nouns, ...adjectives, 'Adverb', 'Preposition', 'Infinitive'],
    adverbs: [...adverbs, 'Infinitive'],
    prepositions: ['Preposition']
  },
  Be: {
    complements: [...nouns, ...adjectives, 'Adverb', 'Preposition', 'Infinitive'],
    adverbs: [...adverbs, 'Infinitive'],
    prepositions: ['Preposition']
  },
  VerbContainer: {
    complements: [...nouns, ...adjectives, 'Adverb', 'Preposition', 'Infinitive'],
    adverbs: [...adverbs, 'Infinitive'],
    prepositions: ['Preposition'],
    verbs: ['Verb', 'Be'],
    conjunction: coordinating
  },
  Noun: {
    determiners: ['Determiner'],
    adjectives: [...adjectives, 'Infinitive'],
    nouns: ['Noun', 'NounClause', 'Verb', 'Be'],
    prepositions: ['Preposition'],
  },
  NounContainer: {
    nouns: nouns,
    adjectives: adjectives,
    prepositions: ['Preposition'],
    determiners: ['Determiner'],
    conjunction: coordinating
  },
  NounClause: {
    clause: clauses,
    nouns: ['Noun', 'NounClause', 'Verb', 'Be'],
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
  AdverbClause: {
    conjunction: [{pos: 'Conjunction', attr: ['type', 'subordinating']}],
    clause: clauses
  },
  Preposition: {
    complement: nouns
  },
  Infinitive: {
    verb: verbs
  }
}

function valid_check(valid_list, word) {
  for (let valid of valid_list) {
    if (typeof(valid) === 'string') {
      if (valid === word.pos) {
        return true
      }
    } else {
      if (valid.pos === word.pos && word[valid.attr[0]] === valid.attr[1]) {
        return true
      }
    }
  }
  return false
}

function wordDictionary(props, o) {
  const pos = props.words.find(t => t.id === props.activeWord).pos
  const valid = valid_pos[pos][o]              
  if (sessionStorage.dictionary) {
    const data = JSON.parse(sessionStorage.dictionary)
    const dictionary = data.filter(t => valid_check(valid, t))
    store.dispatch(showWordFactory(props.id, o, dictionary))
  } else {
    Client.getDics(data => {
      const dictionary = data.filter(t => valid_check(valid, t))
      store.dispatch(showWordFactory(props.id, o, dictionary))
    })
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
	          onClick: () => wordDictionary(props, o)
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

export const ConjunctionButton = (props) => (
  <button type="button" className="button is-small is-active"
          onClick={() => store.dispatch(useConjunction(props.element, props.role, props.parentId))}>
    C
  </button>
)

export const ModalSelect = (props) => (
  <span className="select is-small" value={props.value} onChange={props.onChange}>
    <select>
      {['modal','can','could','should','may','might','must','will','would'].map(o => (
         <option key={o} value={o === 'modal' ? '' : o}>{o}</option>
        ))
      }
    </select>
  </span>
)
