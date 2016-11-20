import reducer from './reducers/reducer.js'
import Immutable from 'immutable'
import { createStore } from 'redux'

// let initialState = {
//   activeWord: 1,
//   target: null,
//   Words: [
//     {
//       id: 1,
//       pos: 'Sentence',
//       clause: 2,
//     },
//     {
//       id: 2,
//       pos: 'Clause',
//       cType: 'statement',
//       subject: null,
//       verb: null,
//       adjectiveClause: null,
//       adverbs: [],
//       conjunction: null,
//     },
//   ],
// }

let initialState = Immutable.Map({
  activeWord: 1,
  target: null,
  Words: [
    {
      id: 1,
      pos: 'Sentence',
      clause: null,
    },
  ],
})

const store = createStore(reducer, initialState)

export default store