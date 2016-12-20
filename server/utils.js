
export function excludeId(obj) {
	const newObj = {}
	const nonIds = Object.keys(obj).filter(o => o !== '_id')
	for (let k in nonIds) {
		newObj[nonIds[k]] = obj[nonIds[k]]
	}
	return newObj
}

export const categories = [
  'Basics',
  'Complement',
  'Preposition',
  'Adjective',
  "Gerund",
	'Adverb',
	"Particle",
	'Possessive',
	'Question',
	"Noun Container",
	"Noun Clause",
	"Adverb Clause",
	'Adjective Clause'
]

