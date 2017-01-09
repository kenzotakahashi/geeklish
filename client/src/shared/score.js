import _ from 'lodash'
import { references, getDescendantIds } from './getDescendantIds'

// const answer = [
// 	{
// 		"_id":"6fa7dcf0-cd3d-11e6-89a0-d193d54c85ac",
// 		"pos":"Sentence",
// 		"clause":"71e6a960-cd3d-11e6-89a0-d193d54c85ac"
// 	},
//   {
// 		"_id":"71e6a960-cd3d-11e6-89a0-d193d54c85ac",
// 		"pos":"Clause",
// 		"cType":"statement",
// 		"subject":"7363fa90-cd3d-11e6-89a0-d193d54c85ac",
// 		"verb":"7541bb40-cd3d-11e6-89a0-d193d54c85ac",
// 		"adjective":null,
// 		"adverbs":[]
//   },
//   {
//   	"_id":"7363fa90-cd3d-11e6-89a0-d193d54c85ac",
//   	"pos":"Pronoun",
//   	"word":{
//   		"nominative":"she",
//   		"accusative":"her",
//   		"possessive":"her",
//   		"reflexive":"herself",
//   		"possessive pronoun":"hers"
//   	},
//   	"person":3,
//   	"number":"singular",
//   	"form":"nominative",
//   	"adjectives":[],
//   	"prepositions":[],
//   	"isWh":false
//   },
//   {
//   	"_id":"7541bb40-cd3d-11e6-89a0-d193d54c85ac",
// 		"pos":"Verb",
// 		"word":{
// 			"base":"like",
// 			"present":"likes",
// 			"past":"liked",
// 			"progressive":"liking",
// 			"passive":"liked"
// 		},
// 		"valid_complements":{
// 			"base":[["noun"],["clause"]]
// 		},
// 		"valid_particles":[],
// 		"complemenetIndex": 0,
// 		"form":"base",
// 		"negative":false,
// 		"past":false,
// 		"continuous":false,
// 		"perfect":false,
// 		"passive":false,
// 		"modal":"",
// 		"particle":null,
// 		"complements":[
// 			{"category":"noun","_id":"78aafdf0-cd3d-11e6-89a0-d193d54c85ac"}
// 		],
// 		"adverbs":[],
// 		"prepositions":[]
// 	},
//   {
//   	"_id":"78aafdf0-cd3d-11e6-89a0-d193d54c85ac",
//   	"pos":"Pronoun",
//   	"word":{
//   		"nominative":"you",
// 	  	"accusative":"you",
// 	  	"possessive":"your",
// 	  	"reflexive":"yourself",
// 	  	"possessive pronoun":"yours"
//   	},
//   	"person":2,
//   	"number":"plural",
//   	"form":"accusative",
//   	"adjectives":[],
//   	"prepositions":[],
//   	"isWh":false
//   }
// ]

// const users_answer = [
// 	{
// 		"_id":"f13d4650-cd3e-11e6-9404-ed500b5d75fe",
// 		"pos":"Sentence",
// 		"clause":"f2c0d910-cd3e-11e6-9404-ed500b5d75fe"
// 	},
// 	{
// 		"_id":"f2c0d910-cd3e-11e6-9404-ed500b5d75fe",
// 		"pos":"Clause",
// 		"cType":"statement",
// 		"subject":"f87ce560-cd3e-11e6-9404-ed500b5d75fe",
// 		"verb":"f5a9a120-cd3e-11e6-9404-ed500b5d75fe",
// 		"adjective":null,
// 		"adverbs":[]
// 	},
// 	{
// 		"_id":"f5a9a120-cd3e-11e6-9404-ed500b5d75fe",
// 		"pos":"Verb",
// 		"word":{
// 			"base":"like",
// 			"present":"likes",
// 			"past":"liked",
// 			"progressive":"liking",
// 			"passive":"liked"
// 		},
// 		"valid_complements":{
// 			"base":[["noun"],["clause"]]
// 		},
// 		"valid_particles":[],
// 		"complemenetIndex":0,
// 		"form":"base",
// 		"negative":false,
// 		"past":false,
// 		"continuous":false,
// 		"perfect":false,
// 		"passive":false,
// 		"modal":"",
// 		"particle":null,
// 		"complements":[{"category":"noun","_id":"01554ce0-cd3f-11e6-9404-ed500b5d75fe"}],
// 		"adverbs":[],
// 		"prepositions":[]
// 	},
// 	{
// 		"_id":"f87ce560-cd3e-11e6-9404-ed500b5d75fe",
// 		"pos":"Pronoun",
// 		"word":{
// 			"nominative":"she",
// 			"accusative":"her",
// 			"possessive":"her",
// 			"reflexive":"herself",
// 			"possessive pronoun":"hers"
// 		},
// 		"person":3,
// 		"number":"singular",
// 		"form":"nominative",
// 		"adjectives":[],
// 		"prepositions":[],
// 		"isWh":false
// 	},
// 	{
// 		"_id":"01554ce0-cd3f-11e6-9404-ed500b5d75fe",
// 		"pos":"Pronoun",
// 		"word":{
// 			"nominative":"you",
// 			"accusative":"you",
// 			"possessive":"your",
// 			"reflexive":"yourself",
// 			"possessive pronoun":"yours"
// 		},
// 		"person":2,
// 		"number":"plural",
// 		"form":"accusative",
// 		"adjectives":[],
// 		"prepositions":[],
// 		"isWh":false
// 	}
// ]

export const removeMetaData = (words) => {
	return words.map(element => {
		let newElement = {}
		for (let key of Object.keys(element)) {
			if (!['__v', 'createdAt', 'projectId'].includes(key)) {
				newElement[key] = element[key]				
			}
		}
		return newElement
	})
}

const convertReference = (e, ref, ids) => {
	if (['Verb','Be'].includes(e.pos) && ref === 'complements') {
		return e[ref].map(o => ({
			...o,
			_id: o._id !== null ? ids.indexOf(o._id) : null
		}))
	}
	if (ref.slice(-1) === 's') {
		return e[ref].map(o => ids.indexOf(o))
	} 
	return e[ref] !== null ? ids.indexOf(e[ref]) : null
}

const convertElement = (element, ids) => {
	let newElement = Object.assign({}, element)
	const refs = references[newElement.pos]
	newElement._id = ids.indexOf(newElement._id)	
	for (let ref of refs) {
		newElement[ref] = convertReference(element, ref, ids)
	}
	return newElement
}

const convert = (base) => {
	const ids = getDescendantIds(base.find(o => o.pos === 'Sentence')._id, base)
	let sorted = []
	for (let i of ids) {
		sorted.push(base.find(o => o._id === i))
	}
	let idChanged = []
	for (let element of sorted) {
		idChanged.push(convertElement(element, ids))
	}
	return idChanged
}

const diff = (a, b) => {
	const newA = convert(a)
	const newB = convert(b)

	if (newA.length === newB.length) {
		newA.map((o, i) => {
			console.log(_.isEqual(newA[i], newB[i]))
		})
		console.log(newA)
		console.log(newB)
	}

	return _.isEqual(newA, newB)
}

export const score = (state) => {
	if (state.isAnswer) return state
	if (state.route === 'projects') return state
	return {
		...state,
		isCorrect: diff(state.answer, state.Words)
	}
}




