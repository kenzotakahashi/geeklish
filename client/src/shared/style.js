
export const wordColor = (element) => {
	switch (element.pos) {
		case 'Noun': {
			return '#88725D'
		}
		case 'Pronoun': {
			return '#845A31'
		}
		case 'Determiner': {
			return '#603F39'
		}
		case 'Verb': {
			return '#E80046'
		}
		case 'Be': {
			return '#FF4900'
		}
		case 'Adjective': {
			return '#890089'
		}
		case 'Adverb': {
			return '#7CADA8'
		}
		case 'Preposition': {
			return '#2C7EB4'
		}
		case 'Conjunction': {
			return '#0C980C'
		}
		default: {
			return '#aaa'
		}
	}
}
