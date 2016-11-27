const nouns = [
	{
		type: "countable",
		base: "dog",
		plural: "dogs"
	},
	{
		type: "both",
		base: "John"
	},
	{
		type: "countable",
		base: 'park',
		plural: 'parks'
	},
	{
		type: "countable",
		base: 'child',
		plural: 'children'
	},
	{
		type: "countable",
		base: 'student',
		plural: 'students'
	},
	{
		type: 'both',
		base: 'life',
		plural: 'lives'
	},
	{
		type: "countable",
		base: 'person',
		plural: 'people'
	},
	{
		type: 'both',
		base: 'lunch',
		plural: 'lunches'
	}
].map(o => ({
	...o,
	order: 1
}))

export default nouns