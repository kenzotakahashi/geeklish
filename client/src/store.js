import reducer from './reducers/reducer.js'
import { createStore } from 'redux'
import { initialState } from './examples'

const store = createStore(reducer, initialState)

export default store