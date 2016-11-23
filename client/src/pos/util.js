import Pos from './Pos.js'
import store from '../store.js'

export const createWord = function(id) {
	if (!id) return null
  const state = store.getState()
  const word = state.Words.find(o => o.id === id)
  return Object.create(Pos[word.pos]).init(word)
}